<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  die("Please submit the form first. <a href='form.php'>Go back</a>");
}

$user_captcha = $_POST['captcha_input'] ?? '';
$real_captcha = $_SESSION['captcha_code'] ?? '';

if ($user_captcha !== $real_captcha) {
  die("<h3>Security Check Failed!</h3> You entered the wrong validation characters. <br><a href='form.php'>Try again</a>");
}

// 2. Safely capture the data
// We use htmlspecialchars() to prevent Cross-Site Scripting (XSS) attacks. 
// Never trust user input!
$first_name = htmlspecialchars($_POST['first_name'] ?? '');
$last_name  = htmlspecialchars($_POST['last_name'] ?? '');
$address    = htmlspecialchars($_POST['address'] ?? '');
$country    = htmlspecialchars($_POST['country'] ?? '');
$gender     = htmlspecialchars($_POST['gender'] ?? '');
$username   = htmlspecialchars($_POST['username'] ?? '');
$department = htmlspecialchars($_POST['department'] ?? '');

// Skills is an array, so we handle it differently
$skills_array = $_POST['skills'] ?? [];
// Sanitize each skill, then join them with a comma
$safe_skills = array_map('htmlspecialchars', $skills_array);
$skills_string = implode(", ", $safe_skills);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Registration Complete</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 20px auto;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }

    th {
      background: #eee;
      width: 30%;
    }
  </style>
</head>

<body>
  <h2>Registration Successful!</h2>
  <?php
  if ($gender === 'Male') {
    $title = 'Mr.';
  } else {
    $title = 'Miss';
  }
  ?>
  <p>Thanks <?php echo "$title $first_name $last_name" ?></p>
  <p>Please Review Your Information</p>

  <table>
    <tr>
      <th>First Name</th>
      <td><?php echo $first_name; ?></td>
    </tr>
    <tr>
      <th>Last Name</th>
      <td><?php echo $last_name; ?></td>
    </tr>
    <tr>
      <th>Address</th>
      <td><?php echo nl2br($address); ?></td>
    </tr>
    <tr>
      <th>Country</th>
      <td><?php echo $country; ?></td>
    </tr>
    <tr>
      <th>Gender</th>
      <td><?php echo $gender; ?></td>
    </tr>
    <tr>
      <th>Skills</th>
      <td><?php echo $skills_string ?: 'None selected'; ?></td>
    </tr>
    <tr>
      <th>Username</th>
      <td><?php echo $username; ?></td>
    </tr>
    <tr>
      <th>Department</th>
      <td><?php echo $department; ?></td>
    </tr>
  </table>

  <br>
  <a href="form.php">Submit another response</a>
</body>

</html>