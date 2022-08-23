import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

const colors = [
    "white",
    "black",
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
];

const safelist = [

    ...colors.map((v) => `bg-${v}-500`),
    ...colors.map((v) => `hover:bg-${v}-700`),
];

export default () =>
    Unocss({
        safelist,
        presets: [presetUno(), presetAttributify(), presetIcons()],
    });