<?php

namespace Model;

spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

use Exception;
use PDO;
use Utils\Utils;

abstract class Database
{

    protected $schema = 'public';
    protected $table;
    protected $DB;

    function __construct()
    {
        $this->DB = Utils::DB();
    }

    public function getIntanceDB()
    {
        return $this->DB;
    }

    public function insert(array $fields, array $values)
    {
        try {
            $stmt = $this->DB->prepare('INSERT INTO ' . $this->formatTableWithSchema() . '(' . join(',', $fields) . ') VALUES ( ' . join(',', array_map(array($this, 'formatfields'), $fields)) . ' );');
            $stmt->execute($values);
        } catch (Exception $ex) {
            return false;
        }
        return true;
    }

    public function update(array $fields, $id, array $values)
    {
        try {
            $stmt = $this->DB->prepare('UPDATE ' . $this->formatTableWithSchema() . ' SET ' . join(',', array_map(array($this, 'formatFieldsUpdate'), $fields)) . ' WHERE id=:id');
            $values[':id'] = $id;
            $stmt->execute($values);
        } catch (Exception $ex) {
            return false;
        }
        return true;
    }

    public function delete($id)
    {
        try {
            $stmt = $this->DB->prepare('DELETE FROM ' . $this->formatTableWithSchema() . ' WHERE id=:id');
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        } catch (Exception $ex) {
            return false;
        }
        return true;
    }

    public function getAll(array $fields, $optionFetch, array $option)
    {
        try {
            $stmt = $this->DB->prepare('SELECT ' . join(',', $fields) . ' FROM ' . $this->formatTableWithSchema() . join(' ', $option));
            $stmt->execute();
            return $stmt->fetchAll($optionFetch);
        } catch (Exception $ex) {
            return false;
        }
    }

    public function getById(array $fields, $id)
    {
        try {
            $stmt = $this->DB->prepare('SELECT ' . join(',', $fields) . ' FROM ' . $this->formatTableWithSchema() . ' WHERE id=:id');
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (Exception $ex) {
            return false;
        }
    }

    public function customQuery(array $fields, array $condition, array $values)
    {
        try {
            $stmt = $this->DB->prepare('SELECT ' . join(',', $fields) . ' FROM ' . $this->formatTableWithSchema() . ' WHERE ' . join(' ', $condition));
            $stmt->execute($values);
            return $stmt->fetchAll();
        } catch (Exception $ex) {
            return false;
        }
    }

    protected function formatFields($item)
    {
        return ':' . $item;
    }

    protected function formatFieldsUpdate($item)
    {
        return $item . '=:' . $item;
    }

    protected function getClassName()
    {
        $path = explode('\\', get_class($this));
        return array_pop($path);
    }

    protected function formatTableWithSchema()
    {
        $table =  $this->table ?? $this->getClassName();
        return $this->schema . '."' . $table . '"';
    }
}
