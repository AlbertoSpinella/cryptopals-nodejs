import { promises as fs } from "fs";
import { AESDecryptECB } from "../libs/utils.js";

export const set1Challenge7 = async () => {
    const base64 = await fs.readFile("./set1/7.txt", "ascii");
    const encrypted = Buffer.from(base64, "base64");
    const key = "YELLOW SUBMARINE";

    const decrypted = AESDecryptECB(encrypted, key);
    console.log(decrypted);
};