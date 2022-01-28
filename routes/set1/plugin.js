import {
    challenge1Opts,
    challenge2Opts,
    challenge3Opts,
    challenge4Opts,
    challenge5Opts,
    challenge6Opts
} from "./schema.js";

export const set1Plugin = (fastify, options, done) => {
    try {
        fastify.get("/challenge5", challenge5Opts);
        fastify.get("/challenge6", challenge6Opts);

        done();
    } catch (err) {
        throw err;
    }
};