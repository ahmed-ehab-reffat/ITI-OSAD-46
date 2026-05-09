<?php

require_once 'Database.php';

$db = new Database();

$db->connect('localhost', 'php_iti', 'ahmed', '5820');

// $db->insert('admins', [
//   'name' => 'Ahmed Ehab',
//   'email' => 'ahmed@gmail.com'
// ]);


// $db->update('admins', 2, [
//   'name' => 'Ahmed Reffat'
// ]);

// $users = $db->select('admins');
// foreach ($users as $user) {
//   echo $user['name'] . " => " . $user['email'] . "<br>";
// }

// $db->delete('admins', 2);
