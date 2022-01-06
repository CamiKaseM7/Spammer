const readline = require("readline");
const tmi = require("tmi.js");

const MAXLENGTH = 500;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(
    "Entra a este link para conseguir tu token: https://twitchapps.com/tmi/"
);
rl.question("cual es tu token? ", (token) => {
    rl.question(
        "cuantos milisegundos queres esperar entre cada mensaje? ",
        (interval) => {
            rl.question("que emote queres spamear? ", (emote) => {
                rl.question("en que chat queres spamearlo? ", (channel) => {
                    const options = {
                        options: {
                            debug: false,
                        },
                        connection: {
                            reconnect: true,
                            reconnectInterval: 50,
                        },
                        identity: {
                            username: "camikase",
                            password: token, // pone tu oauth code aca
                        },
                        channels: [channel],
                    };

                    const client = new tmi.client(options);
                    client.connect();

                    const emoteMessage = getLongestMessage(emote, MAXLENGTH);

                    client.on("connected", (address, port) => {
                        console.log("Bot conectado");

                        const spamInterval = setInterval(() => {
                            client.say(channel, emoteMessage).catch((err) => {
                                clearInterval(spamInterval);
                            });
                        }, interval);
                    });
                });
            });
        }
    );
});

function getLongestMessage(s, maxLength) {
    let result = s;

    while (result.length + s.length < maxLength) {
        result += ` ${s}`;
    }

    return result;
}
