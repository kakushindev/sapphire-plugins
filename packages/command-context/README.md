<div align="center">

# @kakushin/command-context

**Wrapping all sapphire commands (interaction, message) in one context**

[![GitHub](https://img.shields.io/npm/l/@kakushindev/command-context)](https://github.com/kakushindev/sapphire-plugins/blob/main/packages/command-context/LICENSE)
[![npm](https://img.shields.io/npm/v/@kakushin/command-context?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@kakushin/command-context)

</div>

# Installation 
```
npm install @sapphire/framework@next discord.js @sapphire/utilities @kakushin/command-context
```

# Example `ContextCommand`
```ts
import { ApplicationCommandRegistry, Command, RegisterBehavior } from "@sapphire/framework";
import { CommandContext } from "@kakushin/command-context";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Command.Options>({
    name: "ping",
    description: "A ping command.",
    chatInputCommand: {
        register: true
    }
})

export class PingCommand extends ContextCommand {
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
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            registerCommandIfMissing: true
        });
    }
}
```

# Example `ContextPrecondition`
```ts
import { CommandContext, ContextPrecondition } from "@kakushin/command-context";
import type { Precondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Precondition.Options>({
    name: "isAdministrator"
})

export class isAdministrator extends ContextPrecondition {
    public contextRun(context: CommandContext) {
        return context.member!.id === context.guild ? .ownerId ? this.ok() : this.error({
            message: "You are not the administrator."
        });
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        isAdministrator: never;
    }
}
```
