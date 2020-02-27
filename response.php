
<html>
 <head> 
 
 <link rel="stylesheet" type="text/css" href="reset.css">
 <link rel="stylesheet" type="text/css" href="style.css">
 
</head>
<body>
<h3>

<?php


//connect to mysql


$server = "localhost";
$username = "root";
$password = "";
$database = "pastaboss_email_list";


$mysqli = new mysqli('127.0.0.1', 'root', '', '');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

mysqli_select_db ( $mysqli , "pastaboss_email_list");

if ($mysqli->query("INSERT INTO email_list (name, food, email)
VALUES ('".$_POST['name']."' , '".$_POST['food']."' , '".$_POST['email']."')")){
	echo("<br>Thank you for this extremely useful information ".$_POST['name']."."."<br>"." 
	I feel like I've known you forever....");
	
}else{
	echo $mysqli->error;
}
$mysqli->close();




?>
</body>
</html>