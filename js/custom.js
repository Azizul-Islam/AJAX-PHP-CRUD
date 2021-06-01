$(document).ready(function(){

function showData(){
    output = '';
    $.ajax({
        url:'retrive.php',
        method:'GET',
        dataType: 'json',
        success: function(data){
            if(data){
                x = data;
            }else{
                x = '';
            }
            for(i=0;i<x.length;i++){
                output +="<tr><td>" + x[i].id + "</td><td>"+ x[i].name +"</td><td>"+ x[i].email +"</td><td>"+ x[i].password +"</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid=" +x[i].id+ ">Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid="+ x[i].id + ">Delete</button></td></tr>";
            }
            $('#tbody').html(output);
        }
    });
}
showData();



//insert data
$("#subBtn").click(function(e){
    e.preventDefault();
    // console.log("Button is clicked");
    let stid = $('#stid').val();
    let nm = $('#txtName').val();
    let em = $('#txtEmail').val();
    let pw = $('#pwdPass').val();

   myData = {id: stid, name: nm, email: em, password: pw };
   $.ajax({
       url: 'insert.php',
       method: "POST",
       data: JSON.stringify(myData),
       success: function(data){
        msg = "<div class='alert alert-dark'>"+ data +"</div>";
        $("#message").html(msg);
           $('#subForm')[0].reset();
           showData();
       },
   });
});

//delete data from student
$('tbody').on('click','.btn-del', function(){
    let id = $(this).attr('data-sid');
    myData = {sid: id};
    myThis = this;
    $.ajax({
        url: 'delete.php',
        method: 'DELETE',
        data: JSON.stringify(myData),
        success: function(data){
            // console.log(data);
            // showData();
            if(data == 1){
                msg = "<div class='alert alert-danger'>Student Deleted successfully!</div>";
                $(myThis).closest('tr').fadeOut();
                
            }else if(data == 0){
                msg = "<div class='alert alert-info'>Unable to delete student.!</div>";
            }
            $("#message").html(msg);
        },
    });
});
//edit data
    $('tbody').on('click','.btn-edit',function(){
        let id = $(this).attr('data-sid');
        myData = {sid: id};
        $.ajax({
            url: 'edit.php',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(myData),
            success: function(data){
                // console.log(data);
                $("#stid").val(data.id);
                $("#txtName").val(data.name);
                $("#txtEmail").val(data.email);
                $("#pwdPass").val(data.password);
            }
        });
    });
});