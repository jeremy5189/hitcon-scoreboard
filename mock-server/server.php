<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$mock = [
    'T1' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 10,
        'score' => rand(0, 100)
    ],
    'T2' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 30,
        'score' => rand(100, 1000)
    ],
    'T3' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 10,
        'score' => rand(1000, 10000)
    ],
    'T4' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 20,
        'score' => rand(10000, 99999)
    ],
    'T5' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 10,
        'score' => rand(1000, 10000)
    ],
    'T6' => [
        'alive' => (rand(0, 1) === 1 ? true : false),
        'under_attack' => true,
        'ddos' => 10,
        'score' => rand(1000, 10000)
    ]
];

echo json_encode($mock);