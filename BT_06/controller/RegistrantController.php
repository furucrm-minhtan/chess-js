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
        Utils::renderView(['header', 'register'], []);
    }

    public function initData()
    {
    }

    public function getListHocSinh(array $subjects)
    {
        return $this->students->getAll(['code', 'name', 'gender', "TO_CHAR(birthdate, 'DD/MM/YYYY') AS birth"], PDO::FETCH_ASSOC, ['WHERE Subject', 'IN', '('+join(',', $subjects)+')']);
    }

    public function createStudent(array $data, array $subjects)
    {
        $insertData = array();

        foreach($subjects as $subject) {
            $dataClone = $data;
            $dataClone['subject'] = $subject;
            $insertData[] = $dataClone;
        }

        if ($this->students->insert(array_keys($data), $insertData)) {
            echo json_encode(['message' => 'create complete']);
        }
    }

    private function validation(array $values)
    {
        foreach ($values as $key => $value) {
        }
    }
}
