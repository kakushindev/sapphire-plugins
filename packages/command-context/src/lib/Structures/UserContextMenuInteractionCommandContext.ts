/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/explicit-function-return-type */
import { BaseInteractionCommandContext } from "./BaseCommandInteractionCommandContext";
import type { UserContextMenuCommandInteraction } from "discord.js";
import type { Args } from "@sapphire/framework";

export class UserContextMenuInteractionCommandContext extends BaseInteractionCommandContext {
    declare protected readonly data: { context: UserContextMenuCommandInteraction };
    public constructor(context: UserContextMenuCommandInteraction, args?: Args) {
        super(context, args);
    }

    public get options() {
        return this.data.context.options;
    }

    public get targetId() {
        return this.data.context.targetId;
    }

    public get targetMember() {
        return this.data.context.targetMember;
    }

    public get targetUser() {
        return this.data.context.targetUser;
    }
}
