import fetch from "node-fetch";
import { findBestOverallScore } from "../libs/utils.js";

const ch4Data = await fetch("https://cryptopals.com/static/challenge-data/4.txt");
const data = await ch4Data.text();
const bestOverall = findBestOverallScore(data);
console.log(`The best overall is\n${bestOverall.res.join("")}`);