import { repeatingKeyXOR } from "../../libs/utils.js";

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

export const challenge6 = (req, res) => {
    try {
        
    } catch (err) {
        throw err;
    }
};