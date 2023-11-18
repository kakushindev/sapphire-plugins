/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/explicit-function-return-type */
import { BaseInteractionCommandContext } from "./BaseCommandInteractionCommandContext";
import type { ChatInputCommandInteraction } from "discord.js";
import type { Args } from "@sapphire/framework";

export class CommandInteractionCommandContext extends BaseInteractionCommandContext {
    declare protected readonly data: { context: ChatInputCommandInteraction };
    public constructor(context: ChatInputCommandInteraction, args?: Args) {
        super(context, args);
    }

    public get options() {
        return this.data.context.options;
    }
}
