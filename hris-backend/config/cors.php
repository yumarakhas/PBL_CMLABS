<?php

return [

    'paths' => ['api/*', 'profile', 'logout', 'companies*', '*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000','http://127.0.0.1:3000', 'http://localhost:3005', 'http://127.0.0.1:3005', "*"],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
