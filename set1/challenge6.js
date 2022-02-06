import { promises as fs } from "fs";
import {
    hammingDistance,
    bufInChunks,
    hammingDistanceBetweenBuffers,
    transposeBlocks,
    singleByteXOR,
    expandKey
} from "../libs/utils.js";


const XORBetweenBuffers = (plain, key) => {
    let result = "";
    for (let i = 0; i < plain.length; i++)
        result += (plain[i] ^ key[i]).toString(16).padStart(2, "0");
    return Buffer.from(result, "hex").toString("ascii");
}

export const set1Challenge6 = async () => {
    const base64 = await fs.readFile("./set1/6.txt", "ascii");
    const b64ToHex = Buffer.from(base64, "base64");

    const test1 = Buffer.from("this is a test", "ascii");
    const test2 = Buffer.from("wokka wokka!!!", "ascii");

    const HDTest = hammingDistance(test1, test2);
    if (HDTest != 37) throw new Error("HAMMING_DISTANCE_TEST.INVALID");

    const allHammings = [];

    for (let KEYSIZE = 2; KEYSIZE < 41; KEYSIZE++) {
        const chunks = bufInChunks(b64ToHex, KEYSIZE);
        const distancePerKeySize = hammingDistanceBetweenBuffers(chunks) / KEYSIZE;
        allHammings.push({ distance: distancePerKeySize, KEYSIZE });
    }
    const bestResult = allHammings.sort((a, b) => a.distance - b.distance)[0].KEYSIZE;

    const finalChunks = bufInChunks(b64ToHex, bestResult);

    const transposedBlocks = transposeBlocks(finalChunks);

    const keyBytes = [];

    for (const block of transposedBlocks) {
        const best = singleByteXOR(block);
        keyBytes.push(best.key);
    }

    const key = Buffer.from(keyBytes.join(""), "hex").toString("utf8");

    console.log(`The key is:\n${key}\n`);

    const expandedKey = expandKey(key, b64ToHex.length);

    const plaintext = XORBetweenBuffers(b64ToHex, expandedKey);

    console.log(`The plaintext is:\n${plaintext}`);
};