<?php
    include('dbConnection.php');

    $data = stripslashes(file_get_contents("php://input"));
    $myData = json_decode($data,true);
    $id = $myData['sid'];

    $sql = "DELETE FROM student where id={$id}";

    if($conn->query($sql) == true){
        echo 1;
    }else{
        echo 0;
    }


?>