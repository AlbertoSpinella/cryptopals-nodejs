import { repeatingKeyXOR } from "../libs/utils.js";

const str = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
const key = "ICE";
const result = repeatingKeyXOR(str, key);

console.log(`The result is\n${result.join("")}`);