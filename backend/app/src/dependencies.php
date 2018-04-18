<?php
// DIC configuration

$container = $app->getContainer();

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['db'] = function ($config) {
    $db_config = $config->get('settings')['db-config'];
    $conn = new mysqli($db_config['host'], $db_config['user'], $db_config['password'], $db_config['schema']);
    return new Database($conn);
};

$container['errorHandler'] = function ($c) use ($container) {
    return new \errors\SlimServerErrorHandler($container->get('logger'));
};
