import { Events, Listener, MessageCommandDeniedPayload } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedBuilder } from "discord.js";

// @ts-expect-error-next-line
@ApplyOptions<Listener.Options>({
    event: Events.MessageCommandDenied
})
export class messageCommandDenied extends Listener {
    // eslint-disable-next-line class-methods-use-this
    public async run(error: Error, context: MessageCommandDeniedPayload): Promise<void> {
        await context.message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(15075685)
                    .setDescription(`❌ | ${error.message}`)
            ]
        });
    }
}
