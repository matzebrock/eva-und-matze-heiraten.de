<?php

require_once './base.inc.php';

$client = getClient();
$driveService = new Google_Service_Drive($client);

$output = [];
$pageToken = null;
do {
    $response = $driveService->files->listFiles(array(
        'q' => sprintf("'%s' in parents and trashed = false", UPLOAD_FOLDER_ID),
        'spaces' => 'drive',
        'pageToken' => $pageToken,
        'fields' => 'nextPageToken, files(*)',
    ));
    foreach ($response->files as $file) {
        $output[] = [
            'id' => $file->id,
            'name' => $file->name,
            'size' => (int)$file->size,
            'mime' => $file->mimeType,
            'created' => strtotime($file->createdTime) * 1000,
            'width' => $file->imageMediaMetadata->width,
            'height' => $file->imageMediaMetadata->height,
            'url' => sprintf(
                'https://drive.google.com/thumbnail?id=%s&sz=w%d-h%d',
                $file->id,
                $file->imageMediaMetadata->width,
                $file->imageMediaMetadata->height
            )
        ];
    }

    $pageToken = $response->pageToken;
} while ($pageToken != null);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
print(json_encode($output));
exit();
