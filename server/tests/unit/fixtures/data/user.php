<?php

use app\models\User;

$user = new User();
$user->setPassword('admin');

return [
  'user1' => [
        'id' => 1,
        'username' => 'admin',
        'password_hash' => $user->password_hash,
        'auth_key' => 'test100key',
        'email' => 'admin@bookshelf.com',
        'created_at' => 0,
        'updated_at' => 0,
    ],
];