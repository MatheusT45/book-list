<?php

namespace app\controllers;

use app\models\Book;
use yii\rest\ActiveController;

class BookController extends ActiveController
{
   public $enableCsrfValidation = false;

   public $modelClass = Book::class;

   public function behaviors()
   {
      $behaviors = parent::behaviors();

      $behaviors['authenticator'] = [
         'class' => \matheust45\jwt\JwtHttpBearerAuth::class,
      ];

      return $behaviors;
   }
}