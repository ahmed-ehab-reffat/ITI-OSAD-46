<?php
session_start();
$random_string = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 0, 6);
$_SESSION['captcha_code'] = $random_string;
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Registration Form</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 20px auto;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .skill {
      display: flex;
      gap: .4rem;
    }

    .skill label {
      margin-bottom: 0;
    }

    .captcha-box {
      background: #eee;
      padding: 10px;
      font-weight: bold;
      letter-spacing: 2px;
      display: inline-block;
    }
  </style>
</head>

<body>
  <h2>User Registration</h2>
  <form action="done.php" method="POST">

    <div class="form-group">
      <label for="first_name">First Name</label>
      <input type="text" name="first_name" id="first_name" required>
    </div>

    <div class="form-group">
      <label for="last_name">Last Name</label>
      <input type="text" name="last_name" id="last_name" required>
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <textarea name="address" id="address" rows="3" required></textarea>
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <select name="country" id="country">
        <option value="Egypt">Egypt</option>
        <option value="Palestine">Palestine</option>
        <option value="Sudan">Sudan</option>
        <option value="Libya">Libya</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label>Gender</label>
      <input type="radio" name="gender" value="Male" required> Male
      <input type="radio" name="gender" value="Female" required> Female
    </div>

    <div class="form-group">
      <label>Skills</label>
      <div class="skill">
        <input type="checkbox" name="skills[]" value="PHP" id="PHP">
        <label for="PHP">PHP</label>
      </div>
      <div class="skill">
        <input type="checkbox" name="skills[]" value="J2SE" id="J2SE">
        <label for="J2SE">J2SE</label>
      </div>
      <div class="skill">
        <input type="checkbox" name="skills[]" value="MySQL" id="MySQL">
        <label for="MySQL">MySQL</label>
      </div>
      <div class="skill">
        <input type="checkbox" name="skills[]" value="PostgreSQL" id="PostgreSQL">
        <label for="PostgreSQL">PostgreSQL</label>
      </div>
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" name="username" id="username" required>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required>
    </div>

    <div class="form-group">
      <label for="department">Department</label>
      <input type="text" name="department" id="department" required>
    </div>

    <div class="form-group">
      <label>Human Validation</label>
      <p>Please type these characters: <span class="captcha-box"><?php echo $random_string; ?></span></p>
      <input type="text" name="captcha_input" required placeholder="Type the characters above">
    </div>

    <div class="form-group">
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </div>
  </form>
</body>

</html>