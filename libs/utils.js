import crypto from "crypto";

const frequencies = {
    'a': 0.08167, 'b': 0.01492, 'c': 0.02782, 'd': 0.04253,
    'e': 0.12702, 'f': 0.02228, 'g': 0.02015, 'h': 0.06094,
    'i': 0.06094, 'j': 0.00153, 'k': 0.00772, 'l': 0.04025,
    'm': 0.02406, 'n': 0.06749, 'o': 0.07507, 'p': 0.01929,
    'q': 0.00095, 'r': 0.05987, 's': 0.06327, 't': 0.09056,
    'u': 0.02758, 'v': 0.00978, 'w': 0.02360, 'x': 0.00150,
    'y': 0.01974, 'z': 0.00074, ' ': 0.12800
};

const extendKey = (key, length) => {
    const result = [];
    for (let i=0; i<length; i++) {
        result.push(key[i % key.length]);
    }
    return result.join("");
};

const calculateScore = (str) => {
    try {
        let score = 0;
        for (let i=0; i<str.length; i++) {
            if (str[i] in frequencies) score += frequencies[str[i]];
        }
        return score;
    } catch (err) {
        throw err;
    }
};

export const xorBetweenHex = (hex1, hex2) => {
    const raw1 = Buffer.from(hex1, "hex");
    const raw2 = Buffer.from(hex2, "hex");
    let result = [];
    
    for (let i=0; i<raw1.length; i++) {
        const xor = (raw1[i] ^ raw2[i]).toString(16);
        if (xor.length < 2) result.push("0" + xor);
        else result.push(xor);
    }
    return result;
};

export const singleByteXOR = (raw) => {
    const best = {
        score: 0,
        res: ""
    }
    
    for (let ch=0; ch<256; ch++) {
        let result = [];
        raw.forEach(byte => {
            const singleChar = String.fromCharCode(ch ^ byte);
            result.push(singleChar);
        });
        const score = calculateScore(result);
        if (score > best.score) {
            best.score = score;
            best.res = result;
            best.key = ch.toString(16);
        }
    }
    return best;
};

export const findBestOverallScore = (strings) => {
    const lines = strings.split("\n");

    const bestOverall = {
        score: 0,
        res: ""
    }

    lines.forEach(line => {
        const toBuf = Buffer.from(line, "hex");
        const best = singleByteXOR(toBuf);
        if (best.score > bestOverall.score) {
            bestOverall.score = best.score;
            bestOverall.res = best.res;
            bestOverall.key = best.key;
        }
    });
    return bestOverall;
};

export const repeatingKeyXOR = (str, key) => {
    const extendedKey = extendKey(key, str.length);
    const strToHex = Buffer.from(str, "ascii");
    const keyToHex = Buffer.from(extendedKey, "ascii");
    const result = xorBetweenHex(strToHex, keyToHex);
    return result;
};

const decimalToBits = (dec) => dec.toString(2).padStart(8, "0");

export const hammingDistance = (str1, str2) => {
    if (str1.length != str2.length) throw new Error("HAMMING_DISTANCE.UNEQUAL_LENGTHS");
    let tot = 0;
    for (let i = 0; i < str1.length; i++) {
        const xor = str1[i] ^ str2[i];
        const toBits = decimalToBits(xor);
        const chars = Array.from(toBits);
        tot += chars.filter(bit => bit == "1").length;
    }
    return tot;
};

export const bufInChunks = (buf, len) => {
    const chunks = [];
    let chunksNumber = 0;
    while (chunksNumber + len <= buf.length) {
        const chunk = buf.slice(chunksNumber, chunksNumber + len);
        chunks.push(chunk);
        chunksNumber += len;
    }
    return chunks;
};

export const hammingDistanceBetweenBuffers = (chunks) => {
    if (chunks.length % 2 == 1) chunks.pop();
    let tot = 0;
    let iterations = 0;
    while (chunks.length > 1) {
        const elements = chunks.splice(0, 2);
        const partial = hammingDistance(...elements);
        tot += partial;
        iterations++;
    }
    return tot / iterations;
};

export const transposeBlocks = (blocks) => {
    const transposed = [];
    for (let i = 0; i < blocks[0].length; i++) {
        const partial = [];
        for (let j = 0; j < blocks.length; j++)
            partial.push("0");
        transposed.push(partial);
    }
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            transposed[j][i] = (blocks[i][j]).toString(16).padStart(2, "0");
        }
    }
    for (let i = 0; i < transposed.length; i++) {
        transposed[i] = Buffer.from(transposed[i].join(""), "hex");
    }

    return transposed;
};

export const expandKey = (key, len) => {
    let res = "";
    for (let i = 0; i < len; i++)
        res += key[i % key.length];
    return Buffer.from(res, "ascii");
};

export const XORBetweenBuffers = (plain, key) => {
    let result = "";
    for (let i = 0; i < plain.length; i++)
        result += (plain[i] ^ key[i]).toString(16).padStart(2, "0");
    return Buffer.from(result, "hex").toString("ascii");
};

export const AESDecryptECB = (ciphertext, key) => {
    const cipher = crypto.createDecipheriv("aes-128-ecb", key, "");
    let decrypted = cipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, cipher.final()]);

    return decrypted.toString("ascii");
};