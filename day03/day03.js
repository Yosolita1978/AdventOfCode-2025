const fs = require("fs");


const string = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .join(" ");

//console.log(string);

//Helper function to found the patter for the multiply function - returns an array with the instructions of each pattern
function convertString(string) {
    let rgx = /mul\([0-9]{1,3},[0-9]{1,3}\)/g
    let found = string.match(rgx)
    return found
}

//Helper function to mutiply the numbers in a single pattern - return the result of that multiplication
function multiply(instruction) {
    let rgx = /mul\((?<num1>[0-9]{1,3}),(?<num2>[0-9]{1,3})\)/
    let pattern = instruction.match(rgx)
    let { num1, num2 } = pattern.groups;
    let total = parseInt(num1) * parseInt(num2);
    return total
}

//Helper function to iterate for the whole string and return the total of the multiplications
function totalMult(string) {
    let total = 0;
    let instructions = convertString(string);
    for (let i = 0; i < instructions.length; i++) {
        let inst = instructions[i];
        let temp = multiply(inst)
        total += temp
    }
    return total
}

//Helper function to convert the string to instruction with the rgx part 2
function convertStringPart2(string) {
    let rgx = /(mul\(([0-9]{1,3}),([0-9]{1,3})\))|(do\(\))|(don't\(\))/g
    let found = string.match(rgx)
    return found
}


//Helper function to mutiply the numbers in a single pattern - return the result of that multiplication - Part 2
function multiplyPart2(instruction) {
    let rgx = /mul\((?<num1>[0-9]{1,3}),(?<num2>[0-9]{1,3})\)/
    let pattern = instruction.match(rgx)
    let { num1, num2 } = pattern.groups;
    let total = parseInt(num1) * parseInt(num2);
    return total

}

//Helper function to iterate for the whole string and return the total of the multiplications - Part 2
function totalMultPart2(string) {
    let enabled = true;
    let total = 0;
    let instructions = convertStringPart2(string);
    for (let i = 0; i < instructions.length; i++) {
        let inst = instructions[i];
        if (inst.startsWith('mul') && enabled) {
            let temp = multiplyPart2(inst)
            total += temp
        } else if (inst.startsWith('don')) {
            enabled = false;
        } else if (inst.startsWith('do')) {
            enabled = true;
        }

    }
    return total
}

console.log(totalMultPart2(string))