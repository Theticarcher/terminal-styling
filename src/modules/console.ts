import { message } from './types';
import { color } from '../colors/Colors';

/**
 * Utility class for styled and categorized console output.
 *
 * Provides methods for printing error, warning, info, debug, table,
 * and custom-colored messages using ANSI escape codes.
 *
 * @export
 * @class Console
 */
export class Console {
    /**
     * Logs an error message in red.
     *
     * @param {message} consoleLogMessage - The message to log.
     * @example
     * console.err("This is an error");
     */
    err = (consoleLogMessage: message) => {
        process.stdout.write(`${color.foregroundColor('ff0000') + consoleLogMessage}\n`);
    }

    /**
     * Logs a warning message in yellow.
     *
     * @param {message} consoleLogMessage - The warning message.
     * @example
     * console.warn("This is a warning");
     */
    warn = (consoleLogMessage: message) => {
        process.stdout.write(`${color.foregroundColor('ffff00') + consoleLogMessage}\n`);
    }

    /**
     * Logs an informational message in green.
     *
     * @param {message} consoleLogMessage - The info message.
     * @example
     * console.info("System ready");
     */
    info = (consoleLogMessage: message) => {
        process.stdout.write(`${color.foregroundColor('008000') + consoleLogMessage}\n`);
    }

    /**
     * Logs data as a formatted table using process.stdout.write.
     *
     * @param {...any[]} args - Data to be displayed in a table format.
     * @example
     * console.table([{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }]);
     */
    table = (...args: any[]) => {
        const data = args[0];
        if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
            process.stdout.write('Invalid table data.\n');
            return;
        }

        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(h => String(row[h] ?? '')));
        const allRows = [headers, ...rows];

        // Calculate max width per column
        const colWidths = headers.map((_, i) =>
            Math.max(...allRows.map(row => row[i].length))
        );

        const printRow = (row: string[]) => {
            const line = row.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ');
            process.stdout.write(line + '\n');
        };

        // Print table
        printRow(headers);
        process.stdout.write(colWidths.map(w => '-'.repeat(w)).join('-+-') + '\n');
        rows.forEach(printRow);
    };

    /**
     * Logs a message with a custom foreground and optional background color using hex codes.
     *
     * @param {string} text_color - Foreground color as a hex string (e.g. "ff0000").
     * @param {string} consoleLogMessage - The message to log.
     * @param {string} [bg_color] - Optional background color as a hex string (e.g. "000000").
     * @example
     * console.customColor("00ffff", "Cyan text");
     * console.customColor("ffffff", "White on black", "000000");
     */
    customColor = (
        text_color: string,
        consoleLogMessage: string,
        bg_color?: string,
    ): void => {
        const resetAll = '\x1b[0m';
        let out = '';
        out += color.foregroundColor(text_color);
        if (bg_color) out += color.backgroundColor(bg_color);
        out += consoleLogMessage + resetAll;
        process.stdout.write(`${out}\n`);
    };

    /**
     * Logs a debug message without styling.
     *
     * @param {message} consoleLogMessage - The debug message.
     * @example
     * console.debug("Debug: variable x = 42");
     */
    debug = (consoleLogMessage: message) => {
        process.stdout.write(`${consoleLogMessage}\n`);
    }

    
}