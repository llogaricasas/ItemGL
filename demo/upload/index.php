<?php
error_reporting(E_ALL);
	
$name = explode('.', $_FILES['uploadFile']['name']);
$ext = $name[1];	
$valid = array('dae', 'DAE', 'JSON', 'json', 'obj', 'OBJ', 'js', 'JS');
if(in_array($ext,$valid)){
	$r = date('siHdmy');
	$z = 'files/'.$r.'.'.$ext;
	move_uploaded_file($_FILES['uploadFile']['tmp_name'], '../'.$z);
	chmod('../'.$z, 0777);
	header('Content-Type: application/json');
	print json_encode(array('response' => 1, 'url' => 'http://digitalmediafinalproject.kaleidoscop.net/demo/'.$z, 'type' => $ext));	
} else {
	header('Content-Type: application/json');
	print json_encode(array('response' => 0));
}

?>