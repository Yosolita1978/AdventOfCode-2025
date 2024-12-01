const fs = require("fs");


const lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((line) => line.split(/\s+/));

  const left = lines.map((line) => parseInt(line[0]));
  const right = lines.map((line) => parseInt(line[1]));


//function to find the distance between two indexes

function compareList (leftList, rightList){
    let distances = [];
    let sortedLeft = leftList.sort();
    let sortedRight = rightList.sort();
    let tempDist = 0
  
    for(let i = 0; i < sortedLeft.length; i++){
      //compare
      if(sortedLeft[i] < sortedRight[i]){
        tempDist = sortedRight[i] - sortedLeft[i];
        distances.push(tempDist)
      }
  
      if(sortedLeft[i] > sortedRight[i]){
        tempDist = sortedLeft[i] - sortedRight[i];
        distances.push(tempDist);
      }
  
      if(sortedLeft[i] === sortedRight[i] ){
        tempDist = 0;
        distances.push(tempDist);
      }
    }
  
    return distances;
    
  }

let totalDistances = (compareList(left, right));

function sumDistances(array){
    let sum = 0
    for(let i= 0; i < array.length; i++){
      sum += array[i]
    }
  
    return sum
  }

console.log(sumDistances(totalDistances));

function simiScores(leftList, rightList){
    let total = 0
    
    for (let i =0; i < leftList.length; i++){
      let numToFind = leftList[i];
      let filterRight = rightList.filter((element) => element === numToFind)
      let numToScore = filterRight.length;
      total += numToFind * numToScore;
    }
  
    return total
  }

console.log(simiScores(left, right));