const fs = require("fs");


const input = fs
    .readFileSync("input.txt", { encoding: "utf-8" });

const [rulesSection, updatesSection] = input.trim().split("\n\n");
const rules = rulesSection.split("\n").map(rule => rule.split('|').map(Number));
const updates = updatesSection.split("\n").map(update => update.split(',').map(Number));

//Helper function to check if an update is right to use inside the filter
function isCorrectOrder(rules, update) {

    //Map each update with their index to check against the rules
    const indexMap = new Map();
    update.forEach((page, index) => indexMap.set(page, index));

    for (const [before, after] of rules) {
        if (indexMap.has(before) && indexMap.has(after)) {
            if (indexMap.get(before) >= indexMap.get(after)) {
                return false
            }
        }
    }
    return true
}

//Helper function to find the middle point of AN update
function findMiddlePoint(update) {
    const middlePoint = Math.floor(update.length / 2);
    return update[middlePoint]
}

const validUpdates = updates.filter((update) => isCorrectOrder(rules, update))

const allMidlePages = validUpdates.map((update) => findMiddlePoint(update));

const total = allMidlePages.reduce((sum, num) => sum + num, 0);

//console.log(total);

function isCorrectOrderPart2(rules, update) {
    let isOrdered;

    do {
        isOrdered = true;
        //Map each update with their index to check against the rules
        const indexMap = new Map();
        update.forEach((page, index) => indexMap.set(page, index));
        for (const [before, after] of rules) {
            if (indexMap.has(before) && indexMap.has(after)) {
                if (indexMap.get(before) >= indexMap.get(after)) {
                    isOrdered = false;
                    let beforeIndex = indexMap.get(before);
                    let afterIndex = indexMap.get(after);
                    [update[beforeIndex], update[afterIndex]] = [
                        update[afterIndex],
                        update[beforeIndex],
                    ];
                    break;
                }
            }
        }
    } while (!isOrdered);

    return update;
}

const incorrectUpdates = updates.filter(
    (update) => !isCorrectOrder(rules, update),
);

const allPart2 = incorrectUpdates.map((update) => isCorrectOrderPart2(rules, update));

const allMidlePagesPart2 = allPart2.map((update) => findMiddlePoint(update));

const totalPart2 = allMidlePagesPart2.reduce((sum, num) => sum + num, 0);

console.log(totalPart2);