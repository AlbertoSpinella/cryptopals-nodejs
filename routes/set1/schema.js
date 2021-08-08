import {
    challenge1,
    challenge2,
    challenge3,
    challenge4,
    challenge5,
    challenge6
} from "./controller.js";

export const challenge1Opts = {
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
    handler: challenge1
};

export const challenge2Opts = {
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
    handler: challenge2
};

export const challenge3Opts = {
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
    handler: challenge3
};

export const challenge4Opts = {
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
    handler: challenge4
};

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