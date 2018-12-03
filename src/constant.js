// Screen size
const screen = {
    w: 1920,
    h: 1080
};

// Red Team Position
const red_team_position = {
    center: {
        x: screen.w / 2,
        y: screen.h
    },
    cannon: {
        x: screen.w / 2,
        y: screen.h - 100
    }
};

export default {
    screen,
    red_team_position,
};