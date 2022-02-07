import { set1Challenge1 } from "./set1/challenge1.js";
import { set1Challenge2 } from "./set1/challenge2.js";
import { set1Challenge3 } from "./set1/challenge3.js";
import { set1Challenge4 } from "./set1/challenge4.js";
import { set1Challenge5 } from "./set1/challenge5.js";
import { set1Challenge6 } from "./set1/challenge6.js";
import { set1Challenge7 } from "./set1/challenge7.js";

const set1 = () => {
    const challenge = process.argv.slice(2)[0];
    if (!challenge) throw new Error("Invalid challenge number.\nValid input:\n1\n2\n3\n4\n5\n6\n");

    switch (challenge) {
        case "1":
            set1Challenge1();
            break;
        case "2":
            set1Challenge2();
            break;
        case "3":
            set1Challenge3();
            break;
        case "4":
            set1Challenge4();
            break;
        case "5":
            set1Challenge5();
            break;
        case "6":
            set1Challenge6();
            break;
        case "7":
            set1Challenge7();
            break;
        default:
            throw new Error("Invalid challenge number.\nValid input:\n1\n2\n3\n4\n5\n6\n7\n");
    }
};

set1();