import { GalleryKeyword } from "../../client/board-api";

export type KeywordArray = Array<GalleryKeyword>;
export type KeywordDict = { [key: string]: GalleryKeyword; }
// initialise Arrays and prepare Functionality
export async function initKeywordFunctions(initKeywords: KeywordArray) {
    const sourceArray: string[] = [];
    initKeywords.forEach((key) => {
        sourceArray.push(key.keyword);
    });
    // console.log("sourceArray", sourceArray);
    return sourceArray;
}

export function checkIfStringPartInArrayElement(inputString: string, sourceArray: string[], keySuggestArr: string[]) {
    inputString = inputString.toLowerCase();
    sourceArray.forEach((key) => {
        if (key.startsWith(inputString) && inputString !== "") {
            console.log(key);
            if (!keySuggestArr.includes(key)) {
                keySuggestArr.push(key);
            }
        } else {
            // keySuggestArr.remove(key);
            removeA(keySuggestArr, key);
        }
    });
}

export async function removeA(arr: string[], key: string) {
    // remove string "key" from arr
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === key) {
            console.log(`${key} found!`)
            arr.splice(i, 1);
        }
    }
    return arr;
}

// check if string is equal to an element in sourceArray
// - if true, move to destinationArray
export function moveStringToDestArr(inputString: string, sourceArray: string[], destinationArray: string[], keySuggestArr: string[]) {
    console.log(inputString);
    // Überprüfen, ob der String im Quellarray vorhanden ist
    const index = sourceArray.indexOf(inputString);

    if (index !== -1) {
        // String gefunden, entferne ihn aus dem Quellarray
        sourceArray.splice(index, 1);

        // Füge den String dem Zielarray hinzu
        destinationArray.push(inputString);

        keySuggestArr.forEach(() => {
            removeA(keySuggestArr, inputString);
        });
        console.log("destinationArray", destinationArray);

        console.log("Der String wurde erfolgreich verschoben.");
    } else {
        console.log("Der String wurde nicht im Array gefunden.");
    }
}

// check if string is equal to an element in sourceArray
// - if true, move to destinationArray
export function moveStringToSourceArr(inputString: string, sourceArray: string[], destinationArray: string[], keySuggestArr: string[]) {
    console.log(inputString);
    // Überprüfen, ob der String im Quellarray vorhanden ist
    const index = destinationArray.indexOf(inputString);

    if (index !== -1) {
        // String gefunden, entferne ihn aus dem Quellarray
        destinationArray.splice(index, 1);

        // Füge den String dem Zielarray hinzu
        sourceArray.push(inputString);

        keySuggestArr.forEach(() => {
            removeA(keySuggestArr, inputString);
        });
        console.log("destinationArray", destinationArray);

        console.log("Der String wurde erfolgreich verschoben.");
    } else {
        console.log("Der String wurde nicht im Array gefunden.");
    }
}
