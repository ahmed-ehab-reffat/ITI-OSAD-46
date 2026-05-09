<?php
$errors = [];

$rooms = ['application1', 'application2', 'cloud'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);
  $password = $_POST['password'];
  $confirmPassword = $_POST['confirm-password'];
  $room = $_POST['room'];

  if ($name === '') {
    $errors[] = 'Name is required.';
  }

  if ($email === '') {
    $errors[] = 'Email is required.';
  }

  if ($email !== '') {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors[] = 'Email is not valid.';
    }

    if (!preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/', $email)) {
      $errors[] = 'Email is not valid.';
    }
  }

  if (strlen($password) < 8) {
    $errors[] = 'Password must be exactly 8 characters.';
  }

  if (!preg_match('/^[a-z0-9_]+$/', $password)) {
    $errors[] = 'Password may contain only lowercase letters, digits and underscore; no capitals or special characters.';
  }

  if ($password !== $confirmPassword) {
    $errors[] = 'Passwords do not match.';
  }

  if (!in_array($room, $rooms)) {
    $errors[] = 'Room number must be Application1, Application2, or Cloud.';
  }

  if (!isset($_FILES['profile-picture']) || $_FILES['profile-picture']['error'] !== UPLOAD_ERR_OK) {
    $errors[] = 'Profile picture is required.';
  }

  if (empty($errors)) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0777, true);
    }

    $extension = pathinfo($_FILES['profile-picture']['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '.' . $extension;
    move_uploaded_file($_FILES['profile-picture']['tmp_name'], $uploadDir . $filename);

    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $password = htmlspecialchars($password);
    $room = htmlspecialchars($room);
    $filename = htmlspecialchars($filename);

    $line = "$name,$email,$password,$room,$filename\n";
    file_put_contents('users.txt', $line . PHP_EOL, FILE_APPEND);

    header("Location: login.php", true, 303);
    exit;
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign up</title>
  <link rel="stylesheet" href="style/signup.css">
</head>

<body>
  <h1>Cafeteria Registration</h1>

  <?php if ($errors): ?>
    <ul class="errors">
      <?php foreach ($errors as $error): ?>
        <li><?php echo htmlspecialchars($error) ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <form action="signup.php" method="POST" enctype="multipart/form-data">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" required />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
      <small>Exactly 8 chars, lowercase letters, digits and underscore only.</small>
    </div>

    <div class="form-group">
      <label for="confirm-password">Confirm Password</label>
      <input id="confirm-password" name="confirm-password" type="password" required />
    </div>

    <div class="form-group">
      <label for="room">Room No.</label>
      <select id="room" name="room">
        <option value="application1">Application 1</option>
        <option value="application2">Application 2</option>
        <option value="cloud">Cloud</option>
      </select>
    </div>

    <div class="form-group">
      <label for="profile-picture">Profile Picture</label>
      <input id="profile-picture" name="profile-picture" type="file" accept="image/*" required />
      <img id="profile-preview" alt="Image preview" />
    </div>

    <div class="form-action">
      <button id="submit-btn" type="submit">Submit</button>
      <button id="reset-btn" type="reset">Reset</button>
    </div>
  </form>

  <script>
    const profileInput = document.getElementById('profile-picture');
    const profilePreview = document.getElementById('profile-preview');
    const resetBtn = document.getElementById('reset-btn');

    profileInput.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        profilePreview.src = URL.createObjectURL(file);
        profilePreview.style.display = 'block';
      } else {
        profilePreview.src = '';
        profilePreview.style.display = 'none';
      }
    });

    resetBtn.addEventListener('click', () => {
      profilePreview.src = '';
      profilePreview.style.display = 'none';
    });
  </script>
</body>

</html>