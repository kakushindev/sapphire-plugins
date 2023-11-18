import { ChatInputCommandDeniedPayload, Events, Listener } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedBuilder } from "discord.js";

// @ts-expect-error-next-line
@ApplyOptions<Listener.Options>({
    event: Events.ChatInputCommandDenied
})
export class chatInputCommandDenied extends Listener {
    // eslint-disable-next-line class-methods-use-this
    public async run(error: Error, context: ChatInputCommandDeniedPayload): Promise<void> {
        if (!context.interaction.deferred) await context.interaction.deferReply();
        await context.interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor(15075685)
                    .setDescription(`❌ | ${error.message}`)
            ]
        });
    }
}
