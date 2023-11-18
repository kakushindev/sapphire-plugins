import { CommandContext, ContextCommand } from "../../src/index";
import { guildIds } from "../auth";
import { ApplicationCommandRegistry, Command, RegisterBehavior } from "@sapphire/framework";

export class AdministratorCommand extends ContextCommand {
    public constructor(context: Command.Context) {
        super(context, {
            name: "administrator",
            description: "An administrator command.",
            /** @ts-expect-error ts node mark this as error? */
            preconditions: ["isAdministrator"]
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public contextRun(ctx: CommandContext): unknown {
        return ctx.send({
            content: "*This is a secret message.*"
        });
    }

    public override registerApplicationCommands(registry: ApplicationCommandRegistry): void {
        registry.registerChatInputCommand({
            name: this.name,
            description: this.description
        }, {
            guildIds,
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            registerCommandIfMissing: true
        });
    }
}
