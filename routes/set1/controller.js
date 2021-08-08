import fetch from "node-fetch";
import {
    xorBetweenHex,
    findBestScore,
    findBestOverallScore,
    repeatingKeyXOR,
    hammingDistance,
    transposeBlocks
} from "../../libs/utils.js";

export const challenge1 = (req, res) => {
    try {
        const str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";
        const result = Buffer.from(str, "hex").toString("base64");
        return res.send({result});
    } catch (err) {
        throw err;
    }
};

export const challenge2 = (req, res) => {
    try {

        const str1 = "1c0111001f010100061a024b53535009181c";
        const str2 = "686974207468652062756c6c277320657965";
        const xored = xorBetweenHex(str1, str2);
        const result = xored.join("");
        return res.send({result});
    } catch (err) {
        throw err;
    }
};

export const challenge3 = (req, res) => {
    try {
        const str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
        const best = findBestScore(str);
        const result = best.res.join("");
        return res.send({result});
    } catch (err) {
        throw err;
    }
};

export const challenge4 = async (req, res) => {
    try {
        const ch4Data = await fetch("https://cryptopals.com/static/challenge-data/4.txt");
        const data = await ch4Data.text();
        const lines = data.split("\n");
        const bestOverall = findBestOverallScore(lines);
        const result = bestOverall.res.join("");
        return res.send({result});
    } catch (err) {
        throw err;
    }
};

export const challenge5 = (req, res) => {
    try {
        const str = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
        const key = "ICE";
        const rkxor = repeatingKeyXOR(str, key);
        const result = rkxor.join("");
        return res.send({result});
    } catch (err) {
        throw err;
    }
};

export const challenge6 = async (req, res) => {
    try {
        const ch6Data = await fetch("https://cryptopals.com/static/challenge-data/6.txt");
        const data = await ch6Data.text();
        // const toB64 = Buffer.from(data, "base64").toString("hex"); // o ASCII?
        const toB64 = "TSECUVQPFLFWJWMIS";
        
        const str1 = "this is a test";
        const str2 = "wokka wokka!!!";
        const testDistance = hammingDistance(str1, str2);
        console.log({testDistance});
        
        const minor = {
            f: "",
            s: "",
            edit: 9999999,
            len: 999999
        }
        for (let i=2; i<40; i++) {
            const firstWorth = toB64.slice(0, i);
            const secondWorth = toB64.slice(i, i*2);
            const edit = hammingDistance(firstWorth, secondWorth);
            if (edit / i < minor.edit) {
                minor.f = firstWorth;
                minor.s = secondWorth;
                minor.edit = edit / i;
                minor.len = i;
            }
        }
        console.log(minor);
        const blocks = [];
        // for (let i=0; i<toB64.length / minor.len; i++) blocks.push(toB64.slice(i*minor.len, (i+1)*minor.len));
        for (let i=0; i<toB64.length / 5; i++) blocks.push(toB64.slice(i*5, (i+1)*5));
        

        const allTransposed = transposeBlocks(blocks);
        console.log(allTransposed);
        const bestOnes = [];
        for (const transposed of allTransposed) {
            const transposedScore = findBestScore(transposed);
            console.log({transposedScore});
            bestOnes.push(transposedScore.res);
        }

        const aaa = [];
        const bbb = {};

        for (const qqq of bestOnes) {
            for (let i=0; i<qqq.length; i++) {
                if (!bbb[i]) bbb[i] = qqq[i];
                else bbb[i] += qqq[i];
            } 
        }
        console.log({bbb});


    } catch (err) {
        console.log(err);
        throw err;
    }
};