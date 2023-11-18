import { token } from "./auth";
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { IntentsBitField } from "discord.js";
import { join } from "node:path";

class TestClient extends SapphireClient {
    public constructor(clientOptions?: SapphireClientOptions) {
        super({
            fetchPrefix: () => "t!",
            intents: [
                IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages
            ],
            loadMessageCommandListeners: true,
            baseUserDirectory: join(__dirname),
            ...clientOptions
        });
    }
}

const client = new TestClient();

void client.login(token);
