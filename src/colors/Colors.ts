/**
 * Color utility using hex codes for terminal ANSI escape sequences
 *
 * @export
 * @class Colors
 * @typedef {Colors}
 */
export class Colors {

    /**
     * Converts a hex color string to an RGB tuple
     *
     * @private
     * @param {string} hex
     * @returns {[number, number, number]}
     */
    private hexToRgb(hex: string): [number, number, number] {
        const sanitized = hex.replace(/^#/, '');
        if (sanitized.length !== 6) throw new Error('Invalid hex color');
        const r = parseInt(sanitized.slice(0, 2), 16);
        const g = parseInt(sanitized.slice(2, 4), 16);
        const b = parseInt(sanitized.slice(4, 6), 16);
        return [r, g, b];
    }

    /**
     * Generates a foreground color ANSI escape sequence from hex
     *
     * @param {string} hex
     * @returns {string}
     */
    foregroundColor = (hex: string): string => {
        const [r, g, b] = this.hexToRgb(hex);
        return `\x1b[38;2;${r};${g};${b}m`;
    }

    /**
     * Generates a background color ANSI escape sequence from hex
     *
     * @param {string} hex
     * @returns {string}
     */
    backgroundColor = (hex: string): string => {
        const [r, g, b] = this.hexToRgb(hex);
        return `\x1b[48;2;${r};${g};${b}m`;
    }

    /**
     * Resets all ANSI styles
     *
     * @returns {string}
     */
    reset = (): string => {
        return "\x1b[0m";
    }

    /**
     * Checks if the terminal supports true color
     *
     * @returns {boolean}
     */
    supportsTrueColor(): boolean {
        const colorTerm = process.env.COLORTERM;
        console.log(colorTerm);
        return colorTerm === 'truecolor' || colorTerm === '24bit';
    }
}

export const color = new Colors();