import fetch from "node-fetch";
import { xorBetweenHex, calculateScore, findBestScore, findBestOverallScore, repeatingKeyXOR } from "../../libs/utils.js";

export const challenge1 = (req, res) => {
    try {
        const str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";
        const b64 = Buffer.from(str, "hex").toString("base64");
        return res.send(b64);
    } catch (err) {
        throw err;
    }
};

export const challenge2 = (req, res) => {
    try {

        const str1 = "1c0111001f010100061a024b53535009181c";
        const str2 = "686974207468652062756c6c277320657965";
        const result = xorBetweenHex(str1, str2);
        return res.send(result.join(""));
    } catch (err) {
        throw err;
    }
};

export const challenge3 = (req, res) => {
    try {
        const str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
        const best = findBestScore(str);
        return res.send(best.res.join(""));
    } catch (err) {
        throw err;
    }
};

export const challenge4 = async (req, res) => {
    try {
        const ch4Data = await fetch("https://cryptopals.com/static/challenge-data/4.txt");
        const data = await ch4Data.text();
        const bestOverall = findBestOverallScore(data);
        return res.send(bestOverall.res.join(""));
    } catch (err) {
        throw err;
    }
};

export const challenge5 = (req, res) => {
    try {
        const str = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
        const key = "ICE";
        const result = repeatingKeyXOR(str, key);

        return res.send(result.join(""));
    } catch (err) {
        throw err;
    }
};