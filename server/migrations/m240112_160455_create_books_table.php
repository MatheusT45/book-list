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
            'id' => $this->primaryKey(),
            'title' => $this->string()->notNull(),
            'description' => $this->text(),
            'author' => $this->string(),
            'total_pages' => $this->integer(),
            'created_at' => $this->integer()->notNull(),
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
