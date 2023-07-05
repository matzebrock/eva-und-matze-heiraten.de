<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

if ($_GET['check'] !== 'lotz') {
	http_response_code(404);
	exit(1);
}

$return = ['files' => []];
$targetDir = $_SERVER['DOCUMENT_ROOT'] . 'uploads/';

foreach ($_FILES as $file) {
	$fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
	$targetFile =  $targetDir . hash_file('md5', $file['tmp_name']) . '.' . $fileExt;

	$status = move_uploaded_file($file['tmp_name'], $targetFile);

	$return['files'][] = [
		'name' => $file['name'],
		'size' => $file['size'],
		'type' => $file['type'],
		'path' => str_replace($_SERVER['DOCUMENT_ROOT'], '', $targetFile),
		'status' => $status,
		'error' => error_get_last(),
	];
}

echo json_encode($return);