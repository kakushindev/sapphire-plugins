/* eslint-disable @typescript-eslint/consistent-type-imports, multiline-comment-style */
import { CommandContext, ContextPrecondition } from "../../src/index";
import type { Precondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

// @ts-expect-error-next-line
@ApplyOptions<Precondition.Options>({
    name: "isAdministrator"
})
export class isAdministrator extends ContextPrecondition {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public contextRun(context: CommandContext) {
        // eslint-disable-next-line multiline-ternary
        return context.member!.id === context.guild?.ownerId ? this.ok() : this.error({
            message: "You are not the administrator."
        });
    }
}

/** TS-NODE DOES NOT RECOGNIZE THIS. */
/*
 * declare module "@sapphire/framework" {
 *  interface Preconditions {
 *      isAdministrator: never;
 *  }
 * }
 */
