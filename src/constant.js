// Screen size
const screen = {
  w: 1920,
  h: 1080,
};

// Logo
const logo = {
  x: screen.w / 2,
  y: screen.h / 2
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
  phaser_center_yellow: 0XFFCCCC,
  phaser_glow_yellow: 0xD40501,
  sheild_blue: 0x12A8F4,
  beam_green: 0x12F42C,
  beam_green_dark: 0x059115,
};

// Server Team ID => Local Team ID
const team_id_mapping = {
  'T1': 5,
  'T2': 4,
  'T3': 3,
  'T4': 2,
  'T5': 1,
  'T6': 0,
};

export default {
  screen,
  red_team_position,
  color,
  logo,
  team_id_mapping,
};