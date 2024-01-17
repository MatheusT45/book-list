<?php

namespace app\models;

use Yii;
use yii\base\Model;
use app\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required', 'message' => 'O campo Nome de usuário é obrigatório.'],
            ['username', 'unique', 'targetClass' => '\app\models\User', 'message' => 'Esse nome já está em uso.'],
            ['username', 'string', 'min' => 2, 'tooShort' => 'O campo Nome de usuário deve conter no mínimo 2 caracteres.'],

            ['email', 'trim'],
            ['email', 'required', 'message' => 'O campo E-mail é obrigatório.'],
            ['email', 'email', 'message' => 'E-mail inválido.'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\app\models\User', 'message' => 'Esse E-mail já está em uso.'],

            ['password', 'required', 'message' => 'O campo Senha é obrigatório.'],
            ['password', 'string', 'min' => 2, 'tooShort' => 'O campo Senha deve conter no mínimo 2 caracteres.'],
        ];
    }

    /**
     * Signs user up.
     *
     * @return bool whether the creating new account was successful and email was sent
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }
        
        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->setPassword($this->password);
        $user->generateAuthKey();
        $user->generateEmailVerificationToken();

        return $user->save();
    }

    /**
     * Sends confirmation email to user
     * @param User $user user model to with email should be send
     * @return bool whether the email was sent
     */
    protected function sendEmail($user)
    {
        return Yii::$app
            ->mailer
            ->compose(
                ['html' => 'emailVerify-html', 'text' => 'emailVerify-text'],
                ['user' => $user]
            )
            ->setFrom([Yii::$app->params['supportEmail'] => Yii::$app->name . ' robot'])
            ->setTo($this->email)
            ->setSubject('Account registration at ' . Yii::$app->name)
            ->send();
    }
}
