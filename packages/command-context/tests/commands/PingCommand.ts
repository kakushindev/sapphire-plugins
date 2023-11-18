import { CommandContext, ContextCommand } from "../../src/index";
import { guildIds } from "../auth";
import { ApplicationCommandRegistry, Command, RegisterBehavior } from "@sapphire/framework";

export class PingCommand extends ContextCommand {
    public constructor(context: Command.Context) {
        super(context, {
            name: "ping",
            description: "A ping command."
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public contextRun(ctx: CommandContext): unknown {
        return ctx.send({
            content: "PONG!"
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
