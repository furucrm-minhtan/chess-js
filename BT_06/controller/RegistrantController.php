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
        return $this->students->getAll(['code', 'name', 'gender', "TO_CHAR(birthdate, 'DD/MM/YYYY') AS birth"], PDO::FETCH_ASSOC, []);
    }

    public function createStudent($request)
    {
        if ($this->students->insert(array_keys($request), $request)) {
            return json_encode(['message' => 'create complete']);
        }
    }
}
