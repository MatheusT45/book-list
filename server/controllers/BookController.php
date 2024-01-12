<?php

namespace app\controllers;

use app\models\Book;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class BookController extends ActiveController
{
   public $modelClass = Book::class;

   public function behaviors()
   {
      $behaviors = parent::behaviors();

      $behaviors['authenticator'] = [
         'class' => HttpBearerAuth::className(),
      ];

      return $behaviors;
   }
}