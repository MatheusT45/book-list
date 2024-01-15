<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;

class AuthController extends Controller
{
  public function behaviors()
  {
    $behaviors = parent::behaviors();

    $behaviors['authenticator'] = [
      'class' => \matheust45\jwt\JwtHttpBearerAuth::class,
      'except' => [
        'signup',
        'login',
        'refresh-token',
        'options',
      ],
    ];

    // add CORS filter
    $behaviors['corsFilter'] = [
        'class' => \yii\filters\Cors::class,
    ];

    // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
    $behaviors['authenticator']['except'] = ['options'];

    return $behaviors;
  }

  private function generateJwt(\app\models\User $user) {

    $jwt = Yii::$app->jwt;
    $signer = new $jwt->supportedAlgs['HS256']();
    $key = $jwt->key;
    $time = time();

    $jwtParams = Yii::$app->params['jwt'];

    return $jwt->getBuilder()
        ->setIssuer($jwtParams['issuer'])
        ->setAudience($jwtParams['audience'])
        ->setId($jwtParams['id'], true)
        ->setIssuedAt($time)
        ->setExpiration($time + $jwtParams['expire'])
        ->set('uid', $user->id)
        ->sign($signer, $key)
        ->getToken();
  }

  /**
   * @throws yii\base\Exception
   */
  private function generateRefreshToken(\app\models\User $user, \app\models\User $impersonator = null): \app\models\UserRefreshToken {
    $refreshToken = Yii::$app->security->generateRandomString(200);

    // TODO: Don't always regenerate - you could reuse existing one if user already has one with same IP and user agent
    $userRefreshToken = new \app\models\UserRefreshToken([
      'urf_userID' => $user->id,
      'urf_token' => $refreshToken,
      'urf_ip' => Yii::$app->request->userIP,
      'urf_user_agent' => Yii::$app->request->userAgent,
      'urf_created' => gmdate('Y-m-d H:i:s'),
    ]);
    if (!$userRefreshToken->save()) {
      throw new \yii\web\ServerErrorHttpException('Failed to save the refresh token: '. $userRefreshToken->getErrorSummary(true));
    }

    // Send the refresh-token to the user in a HttpOnly cookie that Javascript can never read and that's limited by path
    Yii::$app->response->cookies->add(new \yii\web\Cookie([
      'name' => 'refresh-token',
      'value' => $refreshToken,
      'httpOnly' => true,
      'sameSite' => 'none',
      'secure' => true,
      'path' => '/v1/auth/refresh-token',  //endpoint URI for renewing the JWT token using this refresh-token, or deleting refresh-token
    ]));

    return $userRefreshToken;
  }


  public function actionSignup() {
    $model = new \app\models\SignupForm();

    if ($model->load(Yii::$app->request->getBodyParams(), '') && $model->signup()) {
      $user = Yii::$app->user->identity;

      $token = $this->generateJwt($user);

      $this->generateRefreshToken($user);

      return $this->asJson([
        'user' => $user,
        'token' => (string) $token,
      ]);
    } else {
      Yii::$app->response->statusCode = 400;
      return $this->asJson($model->getFirstErrors());
    }
  }


  public function actionLogin() {
    $model = new \app\models\LoginForm();

    if ($model->load(Yii::$app->request->getBodyParams(), '') && $model->login()) {
      $user = Yii::$app->user->identity;

      $token = $this->generateJwt($user);

      $this->generateRefreshToken($user);

      return $this->asJson([
        'user' => $user,
        'token' => (string) $token,
      ]);
    } else {
      Yii::$app->response->statusCode = 400;
      return $this->asJson($model->getFirstErrors());
    }
  }

  public function actionRefreshToken() {
    $refreshToken = Yii::$app->request->cookies->getValue('refresh-token', false);
    if (!$refreshToken) {
      return new \yii\web\UnauthorizedHttpException('No refresh token found.');
    }

    $userRefreshToken = \app\models\UserRefreshToken::findOne(['urf_token' => $refreshToken]);

    if (Yii::$app->request->getMethod() == 'POST') {
      // Getting new JWT after it has expired
      if (!$userRefreshToken) {
        return new \yii\web\UnauthorizedHttpException('The refresh token no longer exists.');
      }

      $user = \app\models\User::find()  //adapt this to your needs
        ->where(['id' => $userRefreshToken->urf_userID])
        ->andWhere(['not', ['usr_status' => 'inactive']])
        ->one();
      if (!$user) {
        $userRefreshToken->delete();
        return new \yii\web\UnauthorizedHttpException('The user is inactive.');
      }

      $token = $this->generateJwt($user);

      return [
        'status' => 'ok',
        'token' => (string) $token,
      ];

    } elseif (Yii::$app->request->getMethod() == 'DELETE') {
      // Logging out
      if ($userRefreshToken && !$userRefreshToken->delete()) {
        return new \yii\web\ServerErrorHttpException('Failed to delete the refresh token.');
      }

      return ['status' => 'ok'];
    } else {
      return new \yii\web\UnauthorizedHttpException('The user is inactive.');
    }
  }
}
