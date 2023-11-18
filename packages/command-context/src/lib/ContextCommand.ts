/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/explicit-function-return-type */
import { MessageContextMenuInteractionCommandContext } from "./Structures/MessageContextMenuInteractionCommandContext.js";
import { UserContextMenuInteractionCommandContext } from "./Structures/UserContextMenuInteractionCommandContext";
import { CommandInteractionCommandContext } from "./Structures/CommandInteractionCommandContext";
import { MessageCommandContext } from "./Structures/MessageCommandContext";
import type { CommandContext } from "./Structures/CommandContext";
import { type ChatInputCommandInteraction, type Message, type MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import type { CommandOptions, PieceContext } from "@sapphire/framework";
import type { Awaitable } from "@sapphire/utilities";
import { Args, Command } from "@sapphire/framework";

export abstract class ContextCommand extends Command {
    public constructor(context: PieceContext, options?: CommandOptions | undefined) {
        super(context, options);
    }

    public messageRun(message: Message, args: Args) {
        return this.contextRun(new MessageCommandContext(message, args));
    }

    public chatInputRun(interaction: ChatInputCommandInteraction) {
        return this.contextRun(new CommandInteractionCommandContext(interaction));
    }

    public contextMenuRun(interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction) {
        return interaction instanceof UserContextMenuCommandInteraction
            ? this.contextRun(new UserContextMenuInteractionCommandContext(interaction))
            : this.contextRun(new MessageContextMenuInteractionCommandContext(interaction));
    }

    public abstract contextRun(ctx: CommandContext): Awaitable<unknown>;
}
