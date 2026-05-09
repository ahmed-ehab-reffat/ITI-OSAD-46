<?php
session_start();

if (isset($_GET['logout'])) {
  session_destroy();
  header('Location: login.php');
  exit;
}

$loggedIn = isset($_SESSION['user_name']);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cafeteria</title>
</head>

<body>
  <?php if ($loggedIn): ?>
    <h1>Welcome, <?= htmlspecialchars($_SESSION['user_name']) ?>!</h1>

    <div class="user-info">
      <p><strong>Email:</strong> <?= htmlspecialchars($_SESSION['user_email']) ?></p>
      <p><strong>Room:</strong> <?= htmlspecialchars($_SESSION['user_room']) ?></p>

      <?php if (!empty($_SESSION['user_image'])): ?>
        <div>
          <strong>Profile Picture:</strong><br>
          <img src="uploads/<?= htmlspecialchars($_SESSION['user_image']) ?>" alt="Profile Picture" style="max-width: 150px; border-radius: 8px; margin-top: 10px;">
        </div>
      <?php endif; ?>
    </div>
    <p><a href="login.php?logout=1">Logout</a></p>
  <?php else: ?>
    <h1>Welcome to Cafeteria</h1>
    <p><a href="signup.php">Register</a> or <a href="login.php">Login</a></p>
  <?php endif; ?>
</body>

</html>