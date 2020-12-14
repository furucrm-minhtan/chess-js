<?php

namespace Utils;

require(realpath(dirname(__FILE__) . '/../config/Config.php'));

use PDO;

use \Config;

use const Config\HOST;
use const Config\DATABASE;
use const Config\PORT;
use const Config\USER;
use const Config\PASSWORD;
use const Config\DRIVER;

class Utils
{

    public static function DB()
    {
        return new PDO(DRIVER . ':host=' . HOST . ';dbname=' . DATABASE . ';port=' . PORT, USER, PASSWORD, null);
    }

    public static function renderView(array $views, $params)
    {
        foreach ($views as $view) {
            include(realpath(dirname(__FILE__) . '/../view/' . $view . '.php'));
        }
    }

    public static function getValuesArray($array, $col)
    {
        return isset($array[$col]) ? $array[$col] : '';
    }

    public static function renderImageBase64($base64, $type)
    {
        return 'data:' . $type . ';base64,' . $base64;
    }

    public static function getFullSite()
    {
        $protocol = $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = explode('/', $_SERVER['REQUEST_URI']);
        array_pop($url);
        return $protocol . $_SERVER['HTTP_HOST'] . join('/', $url);
    }

    public static function getPostData() {
        $jsonString = stripslashes(file_get_contents("php://input"));
        $jsonEncode = json_encode($jsonString);
        return json_decode(json_decode($jsonEncode, true), true);
    }
}
