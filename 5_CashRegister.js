/*
Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]

Tests
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
Passed:checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
Passed:checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Passed:checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
Failed:checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

*/

//Conversion Table for Word to currency amount
const CURR_TABLE = {
  "PENNY" : 0.01,
  "NICKEL" : 0.05,
  "DIME" : 0.10,
  "QUARTER" : 0.25,
  "ONE" : 1.00,
  "FIVE" : 5.00,
  "TEN" : 10.00,
  "TWENTY" : 20.00,
  "ONE HUNDRED" : 100.00
};

//Nice to have the key to the Object available
const CURR_KEY = Object.keys(CURR_TABLE);

//Aquire sum of CID recursivley 
//Used to aid in determining status : Open/Closed
function getTillTotal(cid, index = cid.length-1)
{
  if(index>=1)
    return cid[index][1] + getTillTotal(cid,index-1);
  else if (index===0)
    return cid[0][1];
  else
      return 0;
}

//find the highest possible currency return 
//  without being larger than the cash return amount
//  i.e 0.5 highest is 0.25 (quarter)
//Function returns the Index of the Curr_Key Array
function findMaxCurrKeyIndx(cash,cid,index=CURR_KEY.length-1)
{
  if(cash < CURR_TABLE[CURR_KEY[index]])
    return findMaxCurrKeyIndx(cash,cid,index-1);
  else if(cash >= CURR_TABLE[CURR_KEY[index]])
  {
    //console.log("CID " + cid[index][1])
    //console.log("cash " + cash)
    if(cid[index][1] >= CURR_TABLE[CURR_KEY[index]])
      return index;
    else
      return findMaxCurrKeyIndx(cash,cid,index-1);
  }
  else
  {
    return -1;      //to filter out cash = 0 and negative
  }
}

//function to collect change
function completeTransaction(cash, cid, maxIndx, stageTotal, rtnArr)
{
  cid[maxIndx][1] = cid[maxIndx][1].toFixed(2) - stageTotal;
  rtnArr.push([CURR_KEY[maxIndx],stageTotal]);
  cash = cash - stageTotal;
  cash = cash.toFixed(2);
  if(cash > 0)
  {
    return checkCID(cash, cid,rtnArr);
    
  }
  else
  {
    return rtnArr;
  }
}

//Recursively check cash with inventory until we hit zero
function checkCID(cash, cid, rtnArr = [])
{
  //Return uppermost Index for current stage
  let maxIndx = findMaxCurrKeyIndx(cash,cid);

  //End if not available
  if(maxIndx === -1)
    return null;

  //Total coins available in this stage
  let availableCoins = cid[maxIndx][1]/CURR_TABLE[cid[maxIndx][0]];
  
  //Current coins needed in this stage
  let coinsNeeded = Math.floor(cash/CURR_TABLE[cid[maxIndx][0]]);

  //if enough is in the till
  //do the math and recursivley go until we are out
  //null out the return array if we dont have what they are looking for 
  if(coinsNeeded <= availableCoins)
  {
    //use how many you want since we have more than you need
    let stageTotal = coinsNeeded*CURR_TABLE[CURR_KEY[maxIndx]];
    completeTransaction(cash, cid, maxIndx, stageTotal,rtnArr);
  }
  else if(coinsNeeded >= availableCoins && maxIndx === 0)
  {
    return null;
  }
  else if(coinsNeeded >= availableCoins && availableCoins >= 1)
  {
    console.log(coinsNeeded);
    console.log(availableCoins);
    console.log();
    //use available coins not how many you want
    let stageTotal = availableCoins*CURR_TABLE[CURR_KEY[maxIndx]];
    completeTransaction(cash, cid, maxIndx, stageTotal,rtnArr);
  }
  else
  {
    return null;
  }

  return rtnArr;
}

//Call Function
function checkCashRegister(price, cash, cid) {
  let cashDiff = cash-price;
  let myChange = checkCID(cashDiff,cid,myChange);
  let outPut = {
    status: "",
    change: myChange
  };

  if(myChange == null)
    outPut = {status: "INSUFFICIENT_FUNDS", change: []};
  else
    outPut.status = (getTillTotal(cid).toFixed(2)>0)? "OPEN" : "CLOSED" ;

  return outPut;
}

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
