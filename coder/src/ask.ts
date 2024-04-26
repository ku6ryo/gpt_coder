import readline from 'readline';

/**
 * Prompts the user with a given question and returns a promise that resolves with the user's input.
 *
 * @param {string} question - The question to ask the user.
 * @return {Promise<string>} A promise that resolves with the user's input.
 */
export function ask(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise<string>(resolve => {
        rl.question(question, input => {
            rl.close()
            resolve(input)
        });
    });
}