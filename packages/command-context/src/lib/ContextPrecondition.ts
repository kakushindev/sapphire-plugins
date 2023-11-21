/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/explicit-function-return-type */
import { MessageContextMenuInteractionCommandContext } from "./Structures/MessageContextMenuInteractionCommandContext.js";
import { UserContextMenuInteractionCommandContext } from "./Structures/UserContextMenuInteractionCommandContext.js";
import { CommandInteractionCommandContext } from "./Structures/CommandInteractionCommandContext";
import { MessageCommandContext } from "./Structures/MessageCommandContext";
import type { CommandContext } from "./Structures/CommandContext.js";
import { type ChatInputCommandInteraction, type Message, type MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { LoaderPieceContext, Precondition } from "@sapphire/framework";

export abstract class ContextPrecondition extends Precondition {
    public constructor(context: LoaderPieceContext<"preconditions">, options?: Precondition.Options) {
        super(context, options);
    }

    public messageRun(message: Message) {
        return this.contextRun(new MessageCommandContext(message));
    }

    public chatInputRun(interaction: ChatInputCommandInteraction) {
        return this.contextRun(new CommandInteractionCommandContext(interaction));
    }

    public contextMenuRun(interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction) {
        return interaction instanceof UserContextMenuCommandInteraction
            ? this.contextRun(new UserContextMenuInteractionCommandContext(interaction))
            : this.contextRun(new MessageContextMenuInteractionCommandContext(interaction));
    }

    public abstract contextRun(ctx: CommandContext): Precondition.Result;
}
