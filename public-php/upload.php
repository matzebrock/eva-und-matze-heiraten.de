<?php

require_once './base.inc.php';

$client = getClient();
$status = false;

$creationTimestamp = (int) (isset($_GET['c']) ? $_GET['c'] : time());

foreach ($_FILES as $file) {
    try {
        $fileMetadata = new Google_Service_Drive_DriveFile([
            'name' => md5_file($file['tmp_name']),
            'parents' => [UPLOAD_FOLDER_ID],
            'createdTime' => gmdate("Y-m-d\TH:i:s\Z", $creationTimestamp),
        ]);
        $content = file_get_contents($file['tmp_name']);
        $file = $driveService->files->create($fileMetadata, [
            'data' => $content,
            'mimeType' => $file['type'],
            'uploadType' => 'multipart',
            'fields' => 'id',
        ]);

        if ($file) {
            $status = true;
        }
    } catch (\Exception $e) {
        throw $e;
    }
}

print(json_encode([
    'status' => $status,
]));
exit();
