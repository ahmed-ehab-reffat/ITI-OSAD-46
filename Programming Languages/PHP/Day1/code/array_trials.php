<?php

include ('main.php');

$indexedArray = array(1,2,3);
$indexedArray2 = ['Omnia','menna',15];
//var_dump($indexedArray);
//var_dump($indexedArray2);

var_dump($indexedArray2[0]);

//for($i = 0; $i < count($indexedArray2); $i++){
//    echo "$indexedArray2[$i]<br>";
//}
//
//foreach ($indexedArray as $value){
//    echo "$value<br>";
//}
//$indexedArray2[0]= 'zeyad';
//
//foreach ($indexedArray2 as $index => $value){
//    echo "$value<br>","$index<br>";
//}
//
//$nums = range(1,10,2);
//var_dump($nums);
//
//$characters = range('a','z',3);
//var_dump($characters);
//
////******************************
////ASSOCIATIVE ARRAY
//
//$associativeArray = [
//    'name' => 'Omnia',
//    'age' => 1,
//    'city' => 'cairo'
//];
//
//var_dump($associativeArray['name']);
//
//foreach ($associativeArray as $key => $value){
//    echo "$key ","$value<br>";
//}
//
//$associativeArray['email'] = 'Omnia@email.com';
//var_dump($associativeArray);
//
//$info = [
//    'name' => 'Omnia',
//    'age' => 1,
//    'city' => 'cairo',
//    '0' => 145,
//    145,
//    '1'=>'one',
//    153.22,
//    'email' => 'Omnia@email.com',
//    66
//];
//
//foreach ($info as $key => $value){
//    echo "$key ","$value<br>";
//}

//constractive associative array from vars
//$first = 'Omnia';
//$second = 'Gad';
////$data = ['first' => $first, 'second' => $second];
//$data = compact('first', 'second');
//var_dump($data);
//
////Operators
//$array1 = ['first' => $first, 'second' => $second];
//$array2 = ['first' => 'shahd', 'second' => $second]; //check value,key, arrangement
//var_dump($array1 == $array2);
//var_dump($array1 === $array2);
//
//$array3 = array(1,2,3);
//$array4 = array(1,2,3);
//var_dump($array3 == $array4);//true
//
////UNION
//$unionArray = $array1 + $array2;
//var_dump($unionArray);


//***********************
echo "<h4>Multi dimensional array</h4>";

$client = [
    'name' => 'John Doe',
    'email' => 'john@doe.com',
];

$clients = [
  ['Ali', '26', 'cairo'],
  ['Omnia', 26 , 'Cairo'],
    ['Nawal', 16,'Giza']
];
//sort($clients);

//echo $clients[0][1];


$multidimensionalAssociative = [
    [
        'name' => 'John Doe',
        'email' => 'john@doe.com',
    ],
    [
        'name' => 'Ali',
        'email' => 'ali@doe.com',
    ]
];

var_dump(shuffle($multidimensionalAssociative));

//echo $multidimensionalAssociative[0]['name'];

//array[0]
//foreach ($multidimensionalAssociative as $value) {
//    echo $value['name'], " ", $value['email'];
//}


//foreach ($clients as $value) {
//    echo $value[0];
//}

//$data = [
//    "clients" =>[
//        'omnia', 'ahmed', 'menna'
//    ],
//    0 => "value",
//    'age' => 25
//];
//
//var_dump($data);
//
//$data = [1,4,2,6];
//sort($data);
////var_dump($sorted);
//var_dump($data);

$client = [
    'name' => 'zz Doe',
    'email' => 'john@doe.com',
];
//asort($client);
ksort($client);
var_dump($client);
krsort($client);
var_dump($client);
//var_dump($client);
//arsort($client);
//var_dump($client);

//user defined sort
//function sorting($a, $b)
//{
//    return $a - $b;
//}
$arraySort = array(1,5,9,4);
//usort($arraySort, 'sorting'); //negative number $a<$b
//var_dump($arraySort);
//positive number // $b<$a
//zero $b=$a


//shuffle($arraySort);
//array_push($arraySort,2);
//array_pop($arraySort);
//var_dump($arraySort);

//var_dump(array_flip($arraySort));

$myArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
////var_dump(in_array('one', $myArray));
//
//var_dump(current($myArray));
//var_dump(next($myArray));
////var_dump(prev($myArray));
//var_dump(current($myArray));
//var_dump(reset($myArray));

//var_dump(array_chunk($myArray,5));


//$multidimensionalAssociative = [
//    0=>[
//        'name' => 'John Doe',
//        'email' => 'john@doe.com',
//        'age' =>55 ],
//    1=>[
//
//    ]
//];
//shuffle($multidimensionalAssociative);
//var_dump($multidimensionalAssociative);
//
//$associativeArray1 = [
//    'name' => 'John Doe',
//    'email' => 'john@doe.com',
//];
//var_dump(merge($associativeArray1));

$myArray = ['one', 'two', 'three', 'four'];
$arraySum = ['omnia', 'karim', 'andrew','menna'];
//$output = array_map(function ($a, $b) {
//   return $a . $b;
//}, $myArray, $arraySum);
//var_dump($output);
//
//$newArray = array_combine($myArray, $arraySum);
//var_dump($newArray);
//

//$name = 1;
//$age=2;
//[$name, $age] = [$age,$name];

$name = 'John Doe';
$scalarArray = [
    'name' => 'omnia',
    'age' => 25
];
extract($scalarArray);
$name = 'nn';
var_dump($name,$age);