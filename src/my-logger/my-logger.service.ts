import { ConsoleLogger, Injectable } from '@nestjs/common';
import fs from "fs";
import path from 'path';
import { promises as fspromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-us', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Chicago'
        }).format(new Date())}\t${entry}\n`;

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fspromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fspromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry)
        } catch (error) {
            if (error instanceof Error) console.error(error.message)
        }

    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry)
        super.log(message, context)

    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}