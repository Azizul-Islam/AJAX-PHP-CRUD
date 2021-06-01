<?php
    include('dbConnection.php');

    $data = stripslashes(file_get_contents("php://input"));
    $myData = json_decode($data,true);
    $id = $myData['sid'];

    $sql = "SELECT * FROM student where id={$id}";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    echo json_encode($row);

?>