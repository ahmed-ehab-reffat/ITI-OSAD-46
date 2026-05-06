<?php

include ('main.php');
//$client_file = fopen("clients.txt","r");
//var_dump($client_file);
//
//if($client_file){
//    $data = fread($client_file, filesize("clients.txt"));
//    var_dump($data);
//} else{
//    echo "Not found";
//}

////read line by line
//while(!feof($client_file)){
//    $line = fgets($client_file);
//    var_dump($line);
//}

//echo "<table class='table'>
//<tr><th>Name</th><th>Age</th></tr>";"
//";

//use delimiter
//while(!feof($client_file)){
//    $line = fgetcsv($client_file,100,":");
//        echo "<tr>";
//    foreach($line as $value){
//        echo "<td>".$value."</td>";
//    }
//    echo "</tr>";
//}
//
//echo "</table>";



//fclose($client_file);

//read file in one step
//function readMyFile($file_path)
//{
//    $file_data = readfile($file_path);
//    var_dump($file_data);
//}
//
//readMyFile('clients.txt');

//function read_file_in_array($file_path)
//{
//    $data = file($file_path);
//    var_dump($data);
//}
//
//read_file_in_array('clients.txt');

//function read_content_string($file_path)
//{
//    $data = file_get_contents($file_path);
//    var_dump($data);
//}
//read_content_string("clients.txt");

//function file_operations($file_path)
//{
//    $client_file = fopen($file_path,"r");
//    if($client_file){
////    $data = fread($client_file, filesize("clients.txt"));
////    var_dump($data);
////    rewind($client_file); // reset pointer
////    $new_data = fread($client_file, filesize("clients.txt"));
////    var_dump($new_data);
//            fseek($client_file, 10);
//        while(!feof($client_file)){
//            $line = fgets($client_file);
//            echo $line;
//        }
//    fclose($client_file);
//    } else{
//    echo "Not found";
//    }
//}
//
//file_operations("clients.txt");

//echo filetype('clients.txt'); //file or folder
//unlink('clients.txt');
//function read_or_create($file_name)
//{
////    if(!file_exists($file_name)){
////        `touch $file_name`;
////    }
//    if (!file_exists($file_name)){
//        $handle = fopen($file_name, "w");
//        if($handle){
//            fclose($handle);
//        }
////        file_put_contents($file_name,"Hello");
//    }
//
//}
//read_or_create('clients.txt');

//read file name
//var_dump(basename('..\session1\test.txt'));

//****************************
//WRITE FILE

//$client_file = fopen("clients.txt","w");
////fwrite($client_file, "Hello Omnia\n");
////fwrite($client_file, 'New hello'.PHP_EOL);
////fwrite($client_file, 'New again hello');
////echo readfile('clients.txt');
//
//function save_writing($file_path)
//{
//    file_put_contents($file_path,'New text');
//}
//save_writing('clients.txt');
//fclose($client_file);

//***********************
//APPEND FILE
$client_file = fopen("clients.txt","a");
fwrite($client_file,'hello');
fclose($client_file);
