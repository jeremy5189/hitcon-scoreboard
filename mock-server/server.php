<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$mock = [
    'T1' => [
        'teamname' => 'Team 1',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 0,
        'score' => rand(0, 100),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ],
    'T2' => [
        'teamname' => 'Team 2',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(100, 1000),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ],
    'T3' => [
        'teamname' => 'Team 3',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 0,
        'score' => rand(1000, 10000),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ],
    'T4' => [
        'teamname' => 'Team 4',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(10000, 99999),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ],
    'T5' => [
        'teamname' => 'Team 5',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => 0,
        'score' => rand(1000, 10000),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ],
    'T6' => [
        'teamname' => 'Team 6',
        'under_attack' => false,
        'ddos' => 0,
        'score' => rand(1000, 10000),
        'alive_web' => (rand(0, 1) === 1 ? true : false),
        'alive_erp' => (rand(0, 1) === 1 ? true : false),
        'alive_sslvpn' => (rand(0, 1) === 1 ? true : false)
    ]
];

echo json_encode($mock);