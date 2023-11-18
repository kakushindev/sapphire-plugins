/* eslint-disable @typescript-eslint/consistent-type-imports */
import { PinoLogger } from "./lib/PinoLogger";
import { Plugin, preGenericsInitialization, SapphireClient } from "@sapphire/framework";
import type { ClientOptions } from "discord.js";
import type { LoggerOptions } from "pino";

export class PinoLoggerPlugin extends Plugin {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public static[preGenericsInitialization](this: SapphireClient, options: ClientOptions) {
        options.logger ??= {
            pino: {}
        };
        options.logger.instance = new PinoLogger(options.logger.pino);
    }
}

declare module "@sapphire/framework" {
    export interface ClientLoggerOptions {
        /**
         * @link https://getpino.io/#/docs/api?id=options
         */
        pino: LoggerOptions;
    }
}

SapphireClient.plugins.registerPreGenericsInitializationHook(PinoLoggerPlugin[preGenericsInitialization], "PinoLogger-PreGenericsInitialization");
