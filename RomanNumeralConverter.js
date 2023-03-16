/*
Roman Numeral Converter
Convert the given number into a roman numeral.

Roman numerals	Arabic numerals
M	1000
CM	900
D	500
CD	400
C	100
XC	90
L	50
XL	40
X	10
IX	9
V	5
IV	4
I	1
All roman numerals answers should be provided in upper-case.

*/

//This Object will be our 'Keyed' system for Roman Num. conversion
const romanArray = {
    1000 : 'M',
    900 : 'CM',
    500 : 'D',
    400 : 'CD',
    100 : 'C',
    90  : 'XC',
    50 : 'L',
    40 : 'XL',
    10 : 'X',
    9  : 'IX',
    5 : 'V',
    4 : 'IV',
    1 : 'I',
  };

//This array will be numeric values from above. 
// This is needed for conversion
const romanKeys = Object.keys(romanArray);

//key is the numeric number to translate
//times is times we want that value translated
//this function is recursive
function getRomanConv(key,times)
{
  if(times <= 1)
  {
    return romanArray[key];
  }
  else
  {
    return romanArray[key] + getRomanConv(key,times-1);
  }
}

//Main user call
function convertToRoman(num) {
  let str = [];

  for(let i = romanKeys.length-1; i>=0;i--)
  {
    //The amount the value repeats at the romanKey stage
    let repFactor = Math.floor(num / romanKeys[i]); 

    //if repFactor value is greater than zero convert
    if(Boolean(repFactor))
    {
      str.push(getRomanConv(romanKeys[i],repFactor));
      num = num - (repFactor*romanKeys[i]);
    }
  }

  return str.join("");
}

//Test
convertToRoman(36);
