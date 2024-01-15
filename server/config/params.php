<?php

return [
    'adminEmail' => 'admin@bookshelf.com',
    'senderEmail' => 'noreply@bookshelf.com',
    'senderName' => 'bookshelf.com mailer',
    'supportEmail' => 'support@bookshelf.com',
    'jwt' => [
        'issuer' => 'https://api.bookshelf.com',
        'audience' => 'https://frontend.bookshelf.com',
        'id' => 'M5Qi3DSjpV6Hc6HG9IxMqWrr',
        'expire' => 300,  //the short-lived JWT token is here set to expire after 5 min.
    ],
];
