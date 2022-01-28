import { xorBetweenHex } from "../libs/utils.js";

export const set1Challenge2 = () => {
    const str1 = "1c0111001f010100061a024b53535009181c";
    const str2 = "686974207468652062756c6c277320657965";
    const xored = xorBetweenHex(str1, str2);
    const result = xored.join("");
    console.log(`The result is\n${result}`);
};
