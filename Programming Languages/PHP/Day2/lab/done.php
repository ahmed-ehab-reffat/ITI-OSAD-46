<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Handle delete request
  if (isset($_POST['delete_id'])) {
    $delete_id = $_POST['delete_id'];
    $lines = file('customer.txt', FILE_IGNORE_NEW_LINES);
    $new_lines = [];
    foreach ($lines as $line) {
      $parts = explode(',', $line);
      if ($parts[0] != $delete_id) {
        $new_lines[] = $line;
      }
    }
    file_put_contents('customer.txt', implode("\n", $new_lines) . "\n");
    // Redirect to avoid resubmission
    header("Location: done.php?message=deleted", true, 303);
    exit;
  }

  $user_captcha = $_POST['captcha_input'] ?? '';
  $real_captcha = $_SESSION['captcha_code'] ?? '';

  if ($user_captcha !== $real_captcha) {
    die("<h3>Security Check Failed!</h3>
      You entered the wrong validation characters. <br>
      <a href='form.php'>Try again</a>");
  }

  // Server-side validation
  $errors = [];
  $first_name = trim($_POST['first_name'] ?? '');
  if (empty($first_name)) $errors[] = "First name is required.";

  $last_name = trim($_POST['last_name'] ?? '');
  if (empty($last_name)) $errors[] = "Last name is required.";

  $address = trim($_POST['address'] ?? '');
  if (empty($address)) $errors[] = "Address is required.";

  $country = $_POST['country'] ?? '';
  if (empty($country)) $errors[] = "Country is required.";

  $gender = $_POST['gender'] ?? '';
  if (empty($gender)) $errors[] = "Gender is required.";

  $skills_array = $_POST['skills'] ?? [];
  if (empty($skills_array)) $errors[] = "At least one skill is required.";

  $username = trim($_POST['username'] ?? '');
  if (empty($username)) $errors[] = "Username is required.";

  $password = trim($_POST['password'] ?? '');
  if (empty($password) || strlen($password) < 6) $errors[] = "Password is required and must be at least 6 characters.";

  $department = trim($_POST['department'] ?? '');
  if (empty($department)) $errors[] = "Department is required.";

  if (!empty($errors)) {
    echo "<h3>Validation Errors:</h3><ul>";
    foreach ($errors as $error) {
      echo "<li>$error</li>";
    }
    echo "</ul><a href='form.php'>Go back</a>";
    exit;
  }

  // Sanitize the data
  $first_name = htmlspecialchars($first_name);
  $last_name = htmlspecialchars($last_name);
  $address = htmlspecialchars($address);
  $country = htmlspecialchars($country);
  $gender = htmlspecialchars($gender);
  $username = htmlspecialchars($username);
  $password = htmlspecialchars($password);
  $department = htmlspecialchars($department);

  $safe_skills = array_map('htmlspecialchars', $skills_array);
  $skills_string = implode(" - ", $safe_skills);

  // Generate unique ID
  $id = time() . rand(1000, 9999);

  // Save to file
  $line = "$id,$first_name,$last_name,$address,$country,$gender,$skills_string,$username,$password,$department\n";
  file_put_contents('customer.txt', $line, FILE_APPEND);

  $message = "Record saved successfully.";

  // Clear captcha
  unset($_SESSION['captcha_code']);
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['message']) && $_GET['message'] === 'deleted') {
  $message = "Record deleted successfully.";
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Customer Records</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 1200px;
      margin: 20px auto;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }

    th {
      background: #eee;
    }

    .delete-btn {
      background: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }

    .delete-btn:hover {
      background: #d32f2f;
    }
  </style>
</head>

<body>
  <h2>Customer Records</h2>

  <?php if (isset($message)) echo "<p>$message</p>"; ?>

  <?php
  if (file_exists('customer.txt')) {
    $lines = file('customer.txt', FILE_IGNORE_NEW_LINES);
    if (!empty($lines)) {
      echo "<table>";
      echo "<tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Gender</th>
              <th>Skills</th>
              <th>Username</th>
              <th>Department</th>
              <th>Action</th>
            </tr>";
      foreach ($lines as $line) {
        $parts = explode(',', $line);
        if (count($parts) >= 10) {
          list($id, $fname, $lname, $addr, $cntry, $gen, $skls, $usr, $pwd, $dept) = $parts;
          echo "<tr>";
          echo "<td>$id</td>";
          echo "<td>$fname</td>";
          echo "<td>$lname</td>";
          echo "<td>" . nl2br($addr) . "</td>";
          echo "<td>$cntry</td>";
          echo "<td>$gen</td>";
          echo "<td>$skls</td>";
          echo "<td>$usr</td>";
          echo "<td>$dept</td>";
          echo "<td>
                  <form method='POST' style='display:inline;'>
                    <input type='hidden' name='delete_id' value='$id'>
                    <button type='submit' class='delete-btn'>Delete</button>
                  </form>
                </td>";
          echo "</tr>";
        }
      }
      echo "</table>";
    } else {
      echo "<p>No records found.</p>";
    }
  } else {
    echo "<p>No records file exists yet.</p>";
  }
  ?>

  <br>
  <a href="form.php">Add New Record</a>
</body>

</html>