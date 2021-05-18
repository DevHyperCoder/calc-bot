"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const discord_js_1 = require("discord.js");
console.log(process.env.PREFIX);
function helpCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendMessage(msg, `
add x y
multiply x y
divide x y
square x
sqrt x
lcm x y
hcf x y
isdivisible x y
iscoprime x y
isprime x
closetprime x
  `, false, true);
    });
}
function sendMessage(message, c, error = false, help = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const e = new discord_js_1.MessageEmbed()
            .setTitle(message.content)
            .setFooter(`Requested by: ${message.author.username}`)
            .setDescription(c);
        if (error) {
            e.setColor("#FF0000");
        }
        if (help) {
            e.setColor("#00FF00");
        }
        yield message.channel.send(e);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new discord_js_1.Client();
        client.on("ready", () => {
            console.log("bot is up");
        });
        client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg.mentions.has(client.user)) {
                yield helpCommand(msg);
            }
            if (!shouldParseMessage(process.env.PREFIX, msg)) {
                return;
            }
            const { args, command } = getCommandAndArgs(process.env.PREFIX, msg);
            switch (command) {
                case "isdivisible": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const n = parseInt(args[0]);
                    const n1 = parseInt(args[1]);
                    sendMessage(msg, n % n1 == 0 ? "true" : "false");
                    break;
                }
                case "multiply": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const number1 = parseInt(args[0]);
                    const number2 = parseInt(args[1]);
                    sendMessage(msg, number1 * number2);
                    break;
                }
                case "divide": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const number1 = parseInt(args[0]);
                    const number2 = parseInt(args[1]);
                    sendMessage(msg, number1 / number2);
                    break;
                }
                case "add": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const number1 = parseInt(args[0]);
                    const number2 = parseInt(args[1]);
                    sendMessage(msg, number1 + number2);
                    break;
                }
                case "square": {
                    if (args.length < 1) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const n = parseInt(args[0]);
                    sendMessage(msg, n * n);
                    break;
                }
                case "sqrt": {
                    if (args.length < 1) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const n = parseInt(args[0]);
                    sendMessage(msg, Math.sqrt(n));
                    break;
                }
                case "hcf": {
                    if (args.length < 2) {
                        msg.reply("not enough args bruh");
                        sendMessage(msg, "", true);
                        break;
                    }
                    const number1 = parseInt(args[0]);
                    const number2 = parseInt(args[1]);
                    let hcf = getHCF(number1, number2);
                    sendMessage(msg, hcf);
                    break;
                }
                case "isprime": {
                    if (args.length < 1) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    sendMessage(msg, isPrime(parseInt(args[0])));
                    break;
                }
                case "iscoprime": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    sendMessage(msg, isCoPrime(parseInt(args[0]), parseInt(args[1])));
                    break;
                }
                case "lcm": {
                    if (args.length < 2) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    const number1 = parseInt(args[0]);
                    const number2 = parseInt(args[1]);
                    let lcm = getLCM(number1, number2);
                    sendMessage(msg, lcm);
                    break;
                }
                case "closetprime": {
                    if (args.length < 1) {
                        sendMessage(msg, "", true);
                        break;
                    }
                    sendMessage(msg, nearestPrime(parseInt(args[0])));
                    break;
                }
                case "help": {
                    yield helpCommand(msg);
                }
            }
        }));
        client.login(process.env.TOKEN);
    });
}
function getCommandAndArgs(prefix, message) {
    var _a;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return { args, command };
}
function shouldParseMessage(prefix, msg) {
    const hasPrefix = msg.content.startsWith(prefix);
    const isBot = msg.author.bot;
    return hasPrefix && !isBot;
}
main();
function getHCF(number1, number2) {
    let hcf = 0;
    for (let i = 1; i <= number1 && i <= number2; i++) {
        if (number1 % i == 0 && number2 % i == 0) {
            hcf = i;
        }
    }
    return hcf;
}
function getLCM(num1, num2) {
    let min = num1 > num2 ? num1 : num2;
    while (true) {
        if (min % num1 == 0 && min % num2 == 0) {
            return min;
        }
        min++;
    }
}
function isPrime(num) {
    for (var i = 2; i < num; i++)
        if (num % i === 0)
            return "false";
    return num > 1 ? "true" : "false";
}
function isCoPrime(num1, num2) {
    const smaller = num1 > num2 ? num1 : num2;
    for (let ind = 2; ind < smaller; ind++) {
        const condition1 = num1 % ind === 0;
        const condition2 = num2 % ind === 0;
        if (condition1 && condition2) {
            return "false";
        }
    }
    return "true";
}
function nearestPrime(num) {
    while (!isPrime(++num)) { }
    return num;
}
//# sourceMappingURL=index.js.map