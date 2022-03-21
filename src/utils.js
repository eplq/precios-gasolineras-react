
export function capitalize(string) {
    return string
        .split(" ")
        .map(element => ["de", "del", "la", "el", "los", "las"].indexOf(element) === -1 ? element[0].toUpperCase() + element.slice(1) : element)
        .join(" ");
}