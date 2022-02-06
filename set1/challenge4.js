import { promises as fs } from "fs";
import { findBestOverallScore } from "../libs/utils.js";

export const set1Challenge4 = async () => {
    const data = await fs.readFile("./set1/4.txt", "ascii");
    const bestOverall = findBestOverallScore(data);
    console.log(`The best hex key is ${bestOverall.key}`);
    console.log(`The plaintext is:\n${bestOverall.res.join("")}`);
};