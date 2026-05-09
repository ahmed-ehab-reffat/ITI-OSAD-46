<?php
try {
  $pdo = new PDO("mysql:dbname=php_iti;host=localhost", "ahmed", "5820");
} catch (PDOException $e) {
  die("Database connection failed: " . $e->getMessage());
}

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
  $id = $_POST['delete'];
  try {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $message = "User deleted successfully.";
  } catch (PDOException $e) {
    $message = "Failed to delete user: " . $e->getMessage();
  }
}

try {
  $stmt = $pdo->query("SELECT * FROM users");
  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  die("Failed to fetch users: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Users List</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    .message {
      color: green;
    }

    .error {
      color: red;
    }
  </style>
</head>

<body>
  <h1>Users List</h1>

  <a href="form.php">Add New User</a>

  <?php if ($message): ?>
    <p class="message"><?= htmlspecialchars($message); ?></p>
  <?php endif; ?>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Room</th>
        <th>Profile Picture</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($users as $user): ?>
        <tr>
          <td><?= htmlspecialchars($user['id']); ?></td>
          <td><?= htmlspecialchars($user['name']); ?></td>
          <td><?= htmlspecialchars($user['email']); ?></td>
          <td><?= htmlspecialchars($user['room']); ?></td>
          <td>
            <?php if ($user['profile_picture']): ?>
              <img src="uploads/<?= htmlspecialchars($user['profile_picture']); ?>" alt="Profile" width="50">
            <?php endif; ?>
          </td>
          <td>
            <a href="form.php?id=<?= $user['id']; ?>">Edit</a>
            <form method="POST" action="" style="display:inline;">
              <input type="hidden" name="delete" value="<?= $user['id']; ?>">
              <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</body>

</html>