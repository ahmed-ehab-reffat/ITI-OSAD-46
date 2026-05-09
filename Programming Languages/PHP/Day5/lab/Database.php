<?php

class Database
{
  private $connection;

  public function connect($host, $db, $user, $pass)
  {
    try {
      $dsn = "mysql:dbname=$db;host=$host;";
      $this->connection = new PDO($dsn, $user, $pass);
      return true;
    } catch (PDOException $e) {
      throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
  }

  public function select($table)
  {
    $sql = "SELECT * FROM $table";
    $stmt = $this->connection->query($sql);
    return $stmt->fetchAll();
  }

  public function delete($table, $id)
  {
    $sql = "DELETE FROM $table WHERE id = ?";
    $stmt = $this->connection->prepare($sql);
    return $stmt->execute([$id]);
  }

  public function insert($table, $data)
  {
    $columns = implode(', ', array_keys($data));
    $placeholders = implode(', ', array_fill(0, count($data), '?'));

    $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
    $stmt = $this->connection->prepare($sql);
    return $stmt->execute(array_values($data));
  }

  public function update($table, $id, $data)
  {
    $setParts = [];
    foreach (array_keys($data) as $column) {
      $setParts[] = "$column = ?";
    }
    $setClause = implode(', ', $setParts);

    $sql = "UPDATE $table SET $setClause WHERE id = ?";
    $stmt = $this->connection->prepare($sql);

    $params = array_values($data);
    $params[] = $id;

    return $stmt->execute($params);
  }
}
