import { singleByteXOR } from "../libs/utils.js";

export const set1Challenge3 = () => {
    const str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
    const raw = Buffer.from(str, "hex");
    const bestResult = singleByteXOR(raw);
    console.log(`The hex key is ${bestResult.key}`);
    console.log(`The cleartext is\n${bestResult.res.join("")}`);
};