<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$mock = [
    'day' => rand(0, 100),
    'hour' => rand(0, 24)
];

echo json_encode($mock);