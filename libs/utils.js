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
    try {
        let result = "";
        for (let i=0; i<length; i++) {
            result += key[i%key.length];
        }
        return result;
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

export const calculateScore = (str) => {
    let score = 0;
    for (let i=0; i<str.length; i++) {
        if (str[i] in frequencies) score += frequencies[str[i]];
    }
    return score;
};

export const singleByteXOR = (str) => {
    const raw = Buffer.from(str, "hex");
    
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
        const best = singleByteXOR(line);
        if (best.score > bestOverall.score) {
            bestOverall.score = best.score;
            bestOverall.res = best.res;
        }
    });
    return bestOverall;
};

export const repeatingKeyXOR = (str, key) => {
    try {
        const extendedKey = extendKey(key, str.length);
        const strToHex = Buffer.from(str, "ascii");
        const keyToHex = Buffer.from(extendedKey, "ascii");
        const result = xorBetweenHex(strToHex, keyToHex);
        return result;
    } catch (err) {
        throw err;
    }
};