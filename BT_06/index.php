<?php

spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

use Utils\Utils;
use Model\Students;
use Controller\RegistrantController;

$controller = new RegistrantController(new Students());

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!empty($_GET['action']) && $_GET['action'] == 'getStudents') {
        var_dump($_GET);
        //echo json_encode($controller->getListHocSinh(), true);
    } else $controller->index();
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = Utils::getPostData();
    $controller->createStudent($data['form'], $data['subjects']);
}
