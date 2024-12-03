const fs = require("fs");


const lines = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .map((line) => line.split(/\s+/));

console.log(lines);


//Helper function to check if input is Safe

function isSafe(array) {
    let increase = true;
    let decrease = true;

    for (i = 0; i < array.length - 1; i++) {
        const diff = array[i + 1] - array[i];
        //console.log(diff);

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        if (diff > 0) {
            decrease = false;
        }

        if (diff < 0) {
            increase = false;
        }
    }

    return increase || decrease
}


//Helper function to check the report is safw with the Problem Dampener

function isSafeWithDampener(levels) {
    // If the original report is safe, return true.
    if (isSafe(levels)) {
      return true;
    }
  
    // Try removing each level and check if the report becomes safe.
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(modifiedLevels)) {
        return true;
      }
    }
  
    return false;
  }


//Helper function to count the report safe

function countSafeReports(reports) {
    let safeCount = 0;
  
    for (const report of reports) {
      const levels = report.map(Number); // Convert array elements to numbers.
      if (isSafeWithDampener(levels)) {
        safeCount++;
      }
    }
  
    return safeCount;
}

const safeReportsCount = countSafeReports(lines);
console.log(`Number of safe reports: ${safeReportsCount}`);