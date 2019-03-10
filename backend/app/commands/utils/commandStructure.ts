export function commandStructureOf(command: string) {
    const splitCommand = command.split(" ");
    return {
        name: splitCommand[0].toLowerCase(),
        args: splitCommand.slice(1),
        content: (command.includes(" ") ? command.slice(command.indexOf(" ") + 1) : ""),
    };
}
