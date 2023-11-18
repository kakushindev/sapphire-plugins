import { token } from "./auth";
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { IntentsBitField } from "discord.js";
import { join } from "node:path";

import "../src/register";

class TestClient extends SapphireClient {
    public constructor(clientOptions?: SapphireClientOptions) {
        super({
            fetchPrefix: () => "t!",
            intents: [
                IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages
            ],
            logger: {
                pino: {
                    timestamp: true,
                    transport: {
                        targets: [{
                            target: "pino-pretty",
                            level: "info",
                            options: {
                                translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o"
                            }
                        }]
                    }
                }
            },
            loadMessageCommandListeners: true,
            baseUserDirectory: join(__dirname),
            ...clientOptions
        });
    }
}

const client = new TestClient();

void client.login(token);
