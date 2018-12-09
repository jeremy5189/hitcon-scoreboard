<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$mock = [
    'T1' => [
        'teamname' => '隊伍 1',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(0, 100),
        'alive_web' => true,
        'alive_erp' => true,
        'alive_sslvpn' => true,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ],
    'T2' => [
        'teamname' => '隊伍 2',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(100, 1000),
        'alive_web' => true,
        'alive_erp' => true,
        'alive_sslvpn' => false,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ],
    'T3' => [
        'teamname' => '隊伍 3',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(1000, 10000),
        'alive_web' => true,
        'alive_erp' => false,
        'alive_sslvpn' => false,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ],
    'T4' => [
        'teamname' => '隊伍 4',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(10000, 99999),
        'alive_web' => false,
        'alive_erp' => true,
        'alive_sslvpn' => true,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ],
    'T5' => [
        'teamname' => '隊伍 5',
        'under_attack' => (rand(0, 1) === 1 ? true : false),
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(1000, 10000),
        'alive_web' => false,
        'alive_erp' => false,
        'alive_sslvpn' => true,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ],
    'T6' => [
        'teamname' => '隊伍 6',
        'under_attack' => true,
        'ddos' => (rand(0, 1) === 1 ? rand(0, 100) : 0),
        'score' => rand(1000, 10000),
        'alive_web' => false,
        'alive_erp' => false,
        'alive_sslvpn' => false,
        'alive' => (rand(0, 1) === 1 ? true : false)
    ]
];

echo json_encode($mock);