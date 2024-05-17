export function handleDateString(datestring: any, key?: string) {
    if (+new Date(datestring) === datestring) {
        return handleDate(new Date(datestring), key);
    } else {
        return "kein Datum";
    }
}

export function handleDate(date: Date, key?: string) {
    switch (key) {
        case "H":
            return date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            });
        case "D":
            return date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            });
        case "W":
            return date.toLocaleDateString("de-DE", {
                month: "2-digit",
                day: "2-digit",
            });
        case "M":
            return date.toLocaleDateString("de-DE", {
                month: "2-digit",
                day: "2-digit",
            });
        case "Y":
            return date.toLocaleDateString("de-DE", {
                month: "2-digit",
                day: "2-digit",
            });
        case "DDMMYYYY":
            return date.toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        case "HHMMDDMMYYYY":
            return date.toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        default:
            return date.toLocaleDateString("de-DE", {
                timeZone: "Europe/Berlin",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
    }
}
