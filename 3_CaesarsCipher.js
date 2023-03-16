/*
Caesars Cipher
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

Tests
Passed:rot13("SERR PBQR PNZC") should decode to the string FREE CODE CAMP
Passed:rot13("SERR CVMMN!") should decode to the string FREE PIZZA!
Passed:rot13("SERR YBIR?") should decode to the string FREE LOVE?
Passed:rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to the string THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
*/

//Did not know the best way to get alphabet 
//so i did it manually
const alphabetKey = [
  'A','B','C','D','E',
  'F','G','H','I','J',
  'K','L','M','N','O',
  'P','Q','R','S','T',
  'U','V','W','X','Y',
  'Z'
  ];

function rot13(str) {
  //Output String
  let nStr = "";
  
  str=str.split("");

  //ROT13 is basically half of the alphabet sooooo
  //greater than 13 subtract
  //less than 13 add
  //iterate through each element of str array (not the best way i think)
  for(let i=0; i<str.length;i++ )
  {
    let indx = alphabetKey.indexOf(str[i]);
    if(indx>=0 && indx<= alphabetKey.length)
    {
      nStr += (indx>=13)? alphabetKey[indx-13] : alphabetKey[indx+13];
    }
    else
    {
      nStr += str[i];
    }
  }
  
  return nStr;
}
