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

//find the highest possible currency return 
//  without being larger than the cash return amount
//  i.e 0.5 highest is 0.25 (quarter)
function findLowestCurr(cash,index=CURR_KEY.length-1)
{
  if(cash < CURR_TABLE[CURR_KEY[index]])
    return findLowestCurr(cash,index-1);
  else if(cash >= CURR_TABLE[CURR_KEY[index]])
    return CURR_KEY[index];
  else
    return -1;      //to filter out 0 and negative
}
