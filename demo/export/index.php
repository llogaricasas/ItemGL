<?php
ini_set("upload_max_filesize", "32M");
ini_set("post_max_size", "32M");
ini_set("memory_limit", "32M");

$file = json_decode($_POST['data']);
print($file);	
?>