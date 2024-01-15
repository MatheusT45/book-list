<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user_refresh_tokens}}`.
 */
class m240114_200000_create_user_refresh_tokens_table extends Migration
{
     /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user_refresh_tokens', [
            'user_refresh_tokenID' => $this->primaryKey()->unsigned(),
            'urf_userID' => $this->integer(10)->unsigned()->notNull(),
            'urf_token' => $this->string(1000)->notNull(),
            'urf_ip' => $this->string(50)->notNull(),
            'urf_user_agent' => $this->string(1000)->notNull(),
            'urf_created' => $this->dateTime()->notNull()->comment('UTC'),
        ]);

        // Additional indexes or foreign key constraints can be added here if needed
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user_refresh_tokens');
    }
}
