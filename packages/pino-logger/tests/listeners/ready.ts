import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

// @ts-expect-error-next-line
@ApplyOptions<Listener.Options>({
    name: "ready"
})

export class ready extends Listener {
    public run(): void {
        this.container.logger.info("Client ready and logged in.");
        // Test error
        throw new Error("Hello world.");
    }
}
