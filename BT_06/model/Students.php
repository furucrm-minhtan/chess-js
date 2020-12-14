<?php

namespace Model;

class Students extends Database
{
    protected $table = 'student';

    function __construct()
    {
        parent::__construct();
    }
}
