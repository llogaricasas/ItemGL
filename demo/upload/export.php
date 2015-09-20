<?php
	$r = date('siHdmy');
	$file = 'json/'.$r.'.json';
	$myfile = fopen($file, "w");
	fwrite($myfile, json_encode($_POST['jsonfile']));
	fwrite($myfile, $txt);
	fclose($myfile);
	print 'http://digitalmediafinalproject.kaleidoscop.net/demo/upload/'.$file;
?>