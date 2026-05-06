<?php

//echo "<h1> Case Sensitive </h1>";

//$_name='omnia';
//var_dump($_name);
//
//$_Name = 'Ahmed';
//var_dump($_name);
//

//echo "<h1>Local & Global Scopes</h1>";

//$name = 'Omnia';
//
//function scopeTest()
//{
//    $name = 'Ahmed';
//    var_dump($name);
//}
//
//scopeTest();

//function scopeTest()
//{
//    $name = 'Omnia';
//    var_dump($name);
//}
//
//scopeTest();
//
//var_dump($name);
//
//echo "<h1> Parameter Scopes </h1>";
//
//function printNumbers($number1, $number2)
//{
//    var_dump($number1, $number2);
//}
//
//printNumbers(1,2);
//
//var_dump($number2);

//echo "<h1> Static Scopes </h1>";
//function testStaticScope()
//{
//    static $counter = 0;
//    $counter +=1 ;
//    var_dump($counter);
//}
//
//testStaticScope();
//testStaticScope();
//testStaticScope();
//
//var_dump($counter);

//echo "<h1> Constant Scopes </h1>";
//const myAge = 14;
//var_dump(myAge);

//function testConst()
//{
//    var_dump(myAge);
//}
//
//testConst();
//myAge = 14;
//var_dump(myAge);

//echo "<h1> Super Global Scopes </h1>";
//function updatePostRequest()
//{
//    $_POST['email'] = 'test@test.com';
//}
//updatePostRequest();
//var_dump($_POST['email']);
//var_dump($_POST);
//echo $_POST; // print string only
//print "omnia"; //return 1
//echo "<br>omnia"," omnia"," omnia"," omnia"; //no return - faster

//print_r($_POST);

//$name = 12;
//$name = 'omnia';
//var_dump($name);

//$file = fopen("page.txt", "r"); //resource
//
//var_dump($file);
//
//echo "<h1> Casting </h1>";
//$myString = "123";
//var_dump($myString);
//
//$myInt= (int)$myString;
//var_dump($myInt);
//
//$floatNum= 123.52;
//$intNum= (int)$floatNum;
//var_dump($intNum);
//
//$myDigit = 0;
//$boolDigit = (bool)$myDigit;
//var_dump($boolDigit);

//$sum = "case" + 5;
//var_dump($sum); //20
//
//$concat = "omnia". "gad";
//$concat .= "hosny";
//var_dump($concat);

//$name = "Omnia";
//$number = (int) $name;
//var_dump($number);

//$x = "5s";
//$y ="5";
//var_dump($x === $y); //same value & same datatype
//var_dump($x <> $y); //not equal != <>

//var_dump($x !== $y);

//Spaceship Operator
//var_dump($x <=> $y);
//echo $x <=> $y;

//var_dump($x == $y);

//$name = "omnia";
//$second = "omnia";
//var_dump($name == $second);

//$x = 5;
////$y = ++$x;
////echo $x; //6
////echo $y; //6
//$y = $x++;
//echo $x; //6
//echo $y; //5
//$x = 5;
//echo $x++; //5 => 6
//echo ++$x; //7

// Reference Operator
//$a = 10;
//$b = &$a;
//$b = 20;
//echo $a;

// and or xor
//$x = true;
//$y = false;
//var_dump($x xor $y);
//var_dump($x && $y);
//var_dump($x and $y);

//$variable = "var";
//$$variable = "no";
//var_dump($var);

//class Test
//{
//}
//class AnotherTest
//{
//}
//
//$newObj = new Test();
//
//if($newObj instanceof Test){
//    echo "Instance of Test<br>";
//}
//elseif($newObj instanceof AnotherTest){
//    echo "Instance of AnotherTest<br>";
//}

//$num = NULL;
////settype($num, "int");
//echo gettype($num); //string integer float => unknown type
//

//$array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//if(is_array($array))
//{
//    echo "this is array";
//}
//
//$x="15.5";
////echo is_float($x);
//var_dump(is_string($x));

//$_POST['email'] = "omnia@email.com";
//if(isset($_POST['age'])){
//    echo "exists";
//}
//var_dump($_POST);
//
//unset($_POST['email']);
//var_dump($_POST);
//if(isset($_POST['email'])){
//    echo "exists";
//}

//$x = $_POST['email'];
//var_dump(empty($_POST['email'])); //true false
//
//$z = `ls`; // for commands and not printed
//
//echo $z;

//$x = 3;
//$$x = 7;
//var_dump($$x);

//if($x>3) {
//    echo "greater than 3";
//} elseif ($x<3){
//    echo "less than 3";
//} else{
//    echo "equals 3";
//}

//switch ($x){
//    case 1:
//        echo "1";
//        break;
//    case 2:
//        echo "2";
//        break;
//    case 3:
//        echo "3";
//        break;
//    case 4:
//        echo "4";
//        break;
//    default:
//        echo "default";
//}


//$data = [1,2,3,4];
//foreach ($data as $value) {
//    echo $value;
//}
//
//for($i = 0; $i < 4; $i++){
//    echo $data[$i];
//    exit();
//}
//
//echo "123"; // exit the whole script


//$x=4;
//do{
//    echo "exists";
//    $x--;
//} while (in_array($x, $data));

//$name = 'Omnia';
//function scopeTest()
//{
//    global $name;
//    var_dump($name);
//}
//
//scopeTest();
//$_REQUEST;
//    $_POST;
////REQUEST POST GET
////Request => get data regardless what is it for
////POST => get payload formdata
////GET => queryr params of get request
