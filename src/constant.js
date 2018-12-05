// Screen size
const screen = {
    w: 1920,
    h: 1080,
};

// Logo
const logo = {
    x: 135,
    y: 135
};

// Red Team Position
const red_team_position = {
    center: {
        x: screen.w / 2,
        y: screen.h - 125,
    },
    cannon: {
        x: screen.w / 2,
        y: screen.h - 100 - 140,
    },
};

const color = {
    background_black: 0x000000,
    cannon_light_red: 0xFF4629,
    phaser_center_yellow: 0xFFF2A3,
    phaser_glow_yellow: 0xF4D03F,
    sheild_green: 0x46F975,
};

export default {
    screen,
    red_team_position,
    color,
    logo,
};