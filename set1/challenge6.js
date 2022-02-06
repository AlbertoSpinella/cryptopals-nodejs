import { promises as fs } from "fs";
import { hammingDistance, bufInChunks, hammingDistanceBetweenBuffers, transposeBlocks, singleByteXOR, transposeResults } from "../libs/utils.js";

export const set1Challenge6 = async () => {
    const base64 = await fs.readFile("./set1/6.txt", "ascii");
    const b64ToHex = Buffer.from(base64, "base64");

    const test1 = Buffer.from("this is a test", "ascii");
    const test2 = Buffer.from("wokka wokka!!!", "ascii");

    const HDTest = hammingDistance(test1, test2);
    if (HDTest != 37) throw new Error("ASSERT_INVALID");

    const allHammings = [];

    for (let KEYSIZE = 2; KEYSIZE < 41; KEYSIZE++) {
        const chunks = bufInChunks(b64ToHex, KEYSIZE);
        const distancePerKeySize = hammingDistanceBetweenBuffers(chunks) / KEYSIZE;
        allHammings.push({ distance: distancePerKeySize, KEYSIZE });
    }
    const bestResult = allHammings.sort((a, b) => a.distance - b.distance)[0].KEYSIZE;

    const finalChunks = bufInChunks(b64ToHex, bestResult);

    const transposedBlocks = transposeBlocks(finalChunks);

    const allBests = [];

    const keyBytes = [];

    for (const block of transposedBlocks) {
        const best = singleByteXOR(block);
        allBests.push(best.res);
        keyBytes.push(best.key);
    }

    const key = Buffer.from(keyBytes.join(""), "hex").toString("utf8");

    console.log(`The key is:\n${key}\n`);

    const result = transposeResults(allBests);

    const cleartext = result.join("");

    console.log(`The cleartext is:\n${cleartext}`);

};