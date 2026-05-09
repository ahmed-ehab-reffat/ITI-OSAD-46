<?php
session_start();
$errors = [];

if (isset($_GET['logout'])) {
  session_destroy();
  header('Location: login.php');
  exit;
}

if (!empty($_SESSION['user_name'])) {
  header('Location: index.php');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = trim($_POST['username']);
  $password = $_POST['password'];

  if ($username === '') {
    $errors[] = 'Username is required.';
  }

  if ($password === '') {
    $errors[] = 'Password is required.';
  }

  if (empty($errors)) {
    $users = [];
    if (file_exists('users.txt') && is_readable('users.txt')) {
      $users = file('users.txt', FILE_IGNORE_NEW_LINES);;
    }

    foreach ($users as $user) {
      $parts = explode(',', $user);
      list($name, $email, $pass, $room, $image) = $parts;

      if ($username === $name && $password === $pass) {
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_room'] = $room;
        $_SESSION['user_image'] = $image;
        header('Location: index.php');
        exit;
      }
    }

    $errors[] = 'Invalid username or password.';
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>

<body>
  <h1>Cafeteria Login</h1>

  <?php if ($errors): ?>
    <ul class="errors">
      <?php foreach ($errors as $error): ?>
        <li><?php echo htmlspecialchars($error) ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <form action="login.php" method="POST">
    <div>
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required />
    </div>

    <div>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
    </div>

    <button type="submit">Login</button>
  </form>

  <p>Don't have an account? <a href="signup.php">Register here</a>.</p>
</body>

</html>