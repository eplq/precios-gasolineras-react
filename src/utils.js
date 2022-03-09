
export function capitalize(string) {
    return string.length == 0 ? "" : string[0].toUpperCase() + string.slice(1);
}