import fetch from "node-fetch";
import { hammingDistance, transposeBlocks, singleByteXOR } from "../libs/utils.js";

export const set1Challenge6 = async () => {
    const ch6Data = await fetch("https://cryptopals.com/static/challenge-data/6.txt");
    const data = await ch6Data.text();
    // const toB64 = Buffer.from(data, "base64").toString("hex"); // o ASCII?
    const toB64 = "TSECUVQPFLFWJWMIS";
    
    const str1 = "this is a test";
    const str2 = "wokka wokka!!!";
    const testDistance = hammingDistance(str1, str2);
    console.log({ testDistance });
    
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
        const transposedScore = singleByteXOR(transposed);
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
};