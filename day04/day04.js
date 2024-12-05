const fs = require("fs");


const grid = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .map((line) => Array.from(line.trim()));

//console.log(grid);

//Helper function to find the letter in the grid
function findLetter(grid, letter){
  let coord = []
  let rows = grid.length
  let cols = grid[0].length
  for(i=0; i < rows; i++){
    for( j=0; j < cols; j++){
      if(grid[i][j] === letter){
        coord.push([i, j])
      }
    }
  }
  return coord
}

//console.log(findLetter(grid, "X"))

//Helper function to search for the word starting from an specific point in the grid in the right direction
function searchEast(grid, start, word){
  let [i, j] = start;
  let cols = grid[0].length;
  let east = "";
  for(x=j; x < (j+word.length) && x < cols; x++){
    east += grid[i][x]
  }
  return east === word
}

//Helper function to search for the word in the grid in the right direction (east)
function searchHorizontal(grid){
  let total = 0;
  let startX = findLetter(grid, "X")
  let right = startX.filter((point) => searchEast(grid, point, "XMAS"));
  total += right.length;
  let startS = findLetter(grid, "S")
  let left = startS.filter((point) => searchEast(grid, point, "SAMX"));
  total += left.length;
  return total
}

let num1 = searchHorizontal(grid)

//Helper function to search for the word in the grid in the north direction starting from an specific point (up)
function searchNorth(grid, start, word){
  let [i, j] = start;
  let rows = grid.length;
  let north = "";
  for(y=i; y < (i+word.length) && y < rows; y++){
    north += grid[y][j]
  }
  return north === word
}

//Helper function to search for the word in the grid in the north direction - up
function searchVertical(grid){
  let total = 0;
  let startX = findLetter(grid, "X");
  let down = startX.filter((point) => searchNorth(grid, point, "XMAS"));
  total += down.length;
  let startS = findLetter(grid, "S");
  let up = startS.filter((point) => searchNorth(grid, point, "SAMX"));
  total += up.length;
  return total
}

let num2 = searchVertical(grid)

//Helper function to search for the word in the grid in the northeast direction starting from an specific point
function searchNorthEast(grid, start, word){
  let [i, j] = start;
  let northeast = "";
  let cols = grid[0].length;
  for (let k = 0; k < word.length; k++) {
    let tempRow = i - k; // Move up
    let tempCol = j + k; // Move right
    if (tempRow >= 0 && tempCol < cols) { 
      northeast += grid[tempRow][tempCol];
    } 
  }

  return northeast === word;
}

//Helper function to search for the word in the grid in the northeast direction
function searchTravRight(grid){
  let total = 0;
  let startX = findLetter(grid, "X");
  let travUp = startX.filter((point) => searchNorthEast(grid, point, "XMAS"));
  total += travUp.length;
  let startS = findLetter(grid, "S");
  let travDown = startS.filter((point) => searchNorthEast(grid, point, "SAMX"));
  total += travDown.length;
  return total
}

let num3 = searchTravRight(grid);

//Helper function to search for the word in the grid in the northwest direction starting from an specific point
function searchNorthWest(grid, start, word) {
  let [i, j] = start; 
  let northwest = "";

  for (let k = 0; k < word.length; k++) {
    let newRow = i - k; // Move up
    let newCol = j - k; // Move left
    if (newRow >= 0 && newCol >= 0) { 
      northwest += grid[newRow][newCol];
    } 
  }

  return northwest === word;
}

//Helper function to search for the word in the grid in the northwest direction
function searchTravLeft(grid){
  let total = 0;
  let startX = findLetter(grid, "X");
  let travUp = startX.filter((point) => searchNorthWest(grid, point, "XMAS"));
  total += travUp.length;
  let startS = findLetter(grid, "S");
  let travDown = startS.filter((point) => searchNorthWest(grid, point, "SAMX"));
  total += travDown.length;
  return total
}

let num4 = searchTravLeft(grid);


function sumCoord(num1, num2, num3, num4){
  return num1 + num2 + num3 + num4;
}

//console.log(sumCoord(num1, num2, num3, num4))

function searchTravLeftMas(grid){
    let positions = []
    let startM = findLetter(grid, "M");
    let travUp = startM.filter((point) => searchNorthWest(grid, point, "MAS"));
    let upAs = travUp.map(([i, j]) => [i - 1, j-1])
    //console.log(upAs)
    let startS = findLetter(grid, "S");
    let travDown = startS.filter((point) => searchNorthWest(grid, point, "SAM"));
    let downAs = travDown.map(([i, j]) => [i - 1, j-1])
    positions = [...upAs, ...downAs]
    return positions
  }

let diagonalLeft = searchTravLeftMas(grid)

function searchTravRightMas(grid){
  let positions = []
  let startM = findLetter(grid, "M");
  let travUp = startM.filter((point) => searchNorthEast(grid, point, "MAS"));
  let upAs = travUp.map(([i, j]) => [i-1, j+1])
  let startS = findLetter(grid, "S");
  let travDown = startS.filter((point) => searchNorthEast(grid, point, "SAM"));
  let downAs = travDown.map(([i, j]) => [i - 1, j+1])
  positions = [...upAs, ...downAs]
  return positions
}

let diagonalRight = searchTravRightMas(grid)


function comparation(array1, array2){
  let result = []
  let array1String = array1.map(([i, j]) => `${i}, ${j}`);
  let array2String = array2.map(([i, j]) => `${i}, ${j}`);
  for(let i=0; i < array1String.length; i++){
    if(array2String.includes(array1String[i])){
      result.push(array1String[i])
    }
  }

  return result.length;
}

console.log(comparation(diagonalLeft, diagonalRight))