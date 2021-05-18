require("dotenv").config();

import { Client, Message, MessageEmbed } from "discord.js";

console.log(process.env.PREFIX);

async function helpCommand(msg: Message) {
  await sendMessage(
    msg,
    `
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
  `,
    false,
    true
  );
}

async function sendMessage(
  message: Message,
  c: number | string,
  error = false,
  help = false
) {
  const e = new MessageEmbed()
    .setTitle(message.content)
    .setFooter(`Requested by: ${message.author.username}`)
    .setDescription(c);

  if (error) {
    e.setColor("#FF0000");
  }
  if (help) {
    e.setColor("#00FF00");
  }

  await message.channel.send(e);
}

async function main() {
  const client = new Client();

  client.on("ready", () => {
    console.log("bot is up");
  });

  client.on("message", async (msg: Message) => {
    if (msg.mentions.has(client.user!)) {
      await helpCommand(msg);
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
        await helpCommand(msg);
      }
    }
  });

  client.login(process.env.TOKEN);
}

function getCommandAndArgs(
  prefix: String,
  message: Message
): { args: Array<string>; command: String | undefined } {
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift()?.toLowerCase();

  return { args, command };
}

function shouldParseMessage(prefix: string, msg: Message): Boolean {
  const hasPrefix = msg.content.startsWith(prefix);
  const isBot = msg.author.bot;

  return hasPrefix && !isBot;
}

main();

function getHCF(number1: number, number2: number): number {
  let hcf = 0;

  for (let i = 1; i <= number1 && i <= number2; i++) {
    // check if is factor of both integers
    if (number1 % i == 0 && number2 % i == 0) {
      hcf = i;
    }
  }
  return hcf;
}

function getLCM(num1: number, num2: number): number {
  let min = num1 > num2 ? num1 : num2;

  // while loop
  while (true) {
    if (min % num1 == 0 && min % num2 == 0) {
      return min;
    }
    min++;
  }
}

function isPrime(num: number): string {
  for (var i = 2; i < num; i++) if (num % i === 0) return "false";
  return num > 1 ? "true" : "false";
}

function isCoPrime(num1: number, num2: number): string {
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

function nearestPrime(num: number): number {
  while (!isPrime(++num)) {}
  return num;
}
