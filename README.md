# HITCON DEFENCE SCOREBOARD

![main-scoreboard](https://user-images.githubusercontent.com/1984426/50040572-edfb6400-0080-11e9-89cf-d5548908bc8a.jpg)


This is the scoreboard of Hack In Taiwan Conference Defence, which took place on Dec. 14, 2018 in Taipei. Six major cooperation and governmental agency has participated in this event including:

- Ministry of Finance, Taiwan (財政部資安團隊）
- IISI Group (資拓宏宇)
- Chunghwa Telecom (中華電信聯隊)
- Industrial Technology Research Institute, Taiwan (工研院）
- And two other cooperation which remained anonymous

Participant of HITCON Defence will be given a set of enterprise level equipment including: Arbor APS, Amazon AWS, Cicso NGFW, Cicso switch, Dell rack server, Imperva WAF, Pulse Secure SSLVPN and Panduit Rack.

During the 6 hour contest, each team (blue team) shell utilize these equipment given above to defence against the red team. The red team will execute multiple attack trying to take down the blue team's service. The team who successfully kept their service up and live as long as possible will be the winner.

For more information please visit: [HITCON DEFENCE](https://hitcon.org/2018/defense/), [HITCON PACIFIC 2018](https://hitcon.org/2018/pacific/)

## Demo

![img_8107](https://user-images.githubusercontent.com/1984426/50040989-35d1b980-0088-11e9-823e-f963acc485f1.JPG)

Video here: [https://youtu.be/qpa5Ibzpw48](https://youtu.be/qpa5Ibzpw48)

## Features

The scoreboard runs in a browser. The backend JSON API feeds the data to the server via polling.

- teamname: Overwrite local on each successful API request
- score: Overwrite local on each successful API request
- under_attack: Render a phaser attack with shield
- ddos: Render a green beam attack, beam thinkness ranging from 0 ~ 100
- alive_web: Determine if web service is up
- alive_erp: Determine if ERP service is up
- alive_sslvpn: Determine if SSLVPN service is up

Upon each successful API request, `alive_level` with be calculated base on `alive_web`, `alive_erp` and `alive_sslvpn`

- 3 Service up: Render blue shield on phaser attack
- 2 Service up: Render red shield on phaser attack
- 1 Service up: Render a broken and shaking ship, red shield on phaser attack
- 0 Service up: Explode and render a transparent ship with alpha = 0.2

## Get started

This project is written with Pixi.js and wepback.

### Development

```sh
$ cp src/config.js.example src/config.js
$ npm install
$ npm run mock # Start at localhost:8001
$ npm rum mock-vtime # Start at localhost:8002
$ npm run dev
```
When you are done you can access your project at http://localhost:8080

### Production

```sh
$ npm install
$ npm run mock # Start at localhost:8001
$ npm rum mock-vtime # Start at localhost:8002
$ npm run build
```
When you are done just open the page index.html in your browser (Node http server coming soon)

## Resource credit

- Borg cube: [http://stwog.wikia.com/wiki/File:Cube_2.png](http://stwog.wikia.com/wiki/File:Cube_2.png)
- Enterprise: [http://chittagongit.com/icon/star-trek-enterprise-icon-10.html](http://chittagongit.com/icon/star-trek-enterprise-icon-10.html)
- Background: [https://flic.kr/p/fKXCdY](https://flic.kr/p/fKXCdY)
