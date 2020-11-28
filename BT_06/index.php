<?php

spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

use Model\Students;
use Controller\RegistrantController;

$controller = new RegistrantController(new Students());

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!empty($_GET['action']) && $_GET['action'] == 'getStudents') {
        echo json_encode($controller->getListHocSinh(), true);
    } else $controller->index();
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    var_dump($_REQUEST);
    $controller->createStudent($_REQUEST);
}
