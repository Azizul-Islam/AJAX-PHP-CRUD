<?php
    include("dbConnection.php");


    $data = stripslashes(file_get_contents("php://input"));
    $myData = json_decode($data,true);
    $id = $myData['id'];
    $name = $myData['name'];
    $email = $myData['email'];
    $password = $myData['password'];

    if(!empty($name) && !empty($email) && !empty($password)){
        $sql = "INSERT INTO student(id,name,email,password)VALUES('$id','$name','$email','$password') ON DUPLICATE KEY UPDATE name='$name',email='$email',password='$password'";
        if($conn->query($sql) == true){
            echo "Student save successfully!";
        }else{
            echo "Unable to save student";
        }
    }else{
        echo "Please fill all input field";
    }

?>