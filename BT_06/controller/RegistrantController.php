<?php

namespace Controller;

use Model\Students;
use PDO;
use Utils\Utils;

class RegistrantController
{
    private $students;

    function __construct(Students $students)
    {
        $this->students = $students;
    }

    public function index()
    {
        $students = $this->getListHocSinh();
        Utils::renderView(['header', 'register'], compact('students'));
    }

    public function initData()
    {
    }

    public function getListHocSinh()
    {
        return $this->students->getAll(['name', 'email'], PDO::FETCH_ASSOC, []);
    }

    public function createStudent($request)
    {
        $data = json_decode($request, true);
        if ($this->students->insert(array_keys($data), $data)) {
            $student = $this->getListHocSinh();
            return json_encode(['message' => 'create complete', 'students' => $student]);
        }
    }
}
