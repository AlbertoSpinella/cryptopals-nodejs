import {
    challenge5
} from "./controller.js";

export const challenge5Opts = {
    schema: {
        response: {
            200: {
                type: "string"
            }
        }
    },
    handler: challenge5
};