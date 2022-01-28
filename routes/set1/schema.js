import {
    challenge5
} from "./controller.js";

export const challenge5Opts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    result: { type: "string" }
                }
            }
        }
    },
    handler: challenge5
};

export const challenge6Opts = {
    // schema: {
    //     response: {
    //         200: {
    //             type: "object",
    //             properties: {
    //                 result: { type: "string" }
    //             }
    //         }
    //     }
    // },
    handler: challenge6
};