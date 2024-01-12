<?php

use yii\db\Schema;
use yii\db\Migration;

/**
 * Handles the creation of table books.
 */
class m240112_160455_create_books_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('books', [
            'id' => Schema::TYPE_PK,
            'title' => Schema::TYPE_STRING,
            'description' => Schema::TYPE_TEXT,
            'author' => Schema::TYPE_STRING,
            'total_pages' => Schema::TYPE_INTEGER,
            'created_at' => Schema::TYPE_INTEGER,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('books');
    }
}
