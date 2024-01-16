<?php

namespace app\tests\unit\fixtures;

use app\models\Book;
use yii\test\ActiveFixture;

class BookFixture extends ActiveFixture
{
   public $modelClass = Book::class;
}