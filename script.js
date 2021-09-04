function isPalindrome(str){
return str === str.split("").reverse().join("");
}
//-------------------------------------------------
const convertDateToStr=(date)=>{
const dateStr={day: "",month:"",year:""};
if(date.day<10){
  
  dateStr.day= "0"+date.day.toString();
}
else{
  dateStr.day= date.day.toString();
}
if(date.month < 10){
  dateStr.month = "0"+date.month;
}
else {
  dateStr.month =date.month.toString();
}
dateStr.year = date.year.toString();

return dateStr
}
//---------------------------------------------------
function getAllDateFormats(date){
var dateStr = convertDateToStr(date);
var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
var yyyymmdd=dateStr.year + dateStr.month+ dateStr.day;
var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
var mmddyy= dateStr.month+dateStr.day+dateStr.year.slice(-2);
var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}
//---------------------------------------------------------------
function checkPalindromeForAllDateFormats(date){
  var listOfPalindromes = getAllDateFormats(date);
  var flag= false;
  for(var i=0;i<listOfPalindromes.length;i++){
    if(isPalindrome(listOfPalindromes[i])){
           flag=true;
           break
    }
  }
  return flag;
}
//-----------------------------------------------------------------
function getNextDate(date){
var day = date.day  + 1;
var month =date.month;
var year = date.year;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
if(month ===2){
  if(isLeapYear(year)){
  if(day>29){
    day=1;
    month++;
  }
  }
}
else{
  if(day>28){
    day=1;
    month++;
  }
}

  if(day>daysInMonth[month-1]){
    day=1;
    month++;
  }
if(month>12){
  month=1;
  year++;
}
return{
  day:day,
  month:month,
  year:year
};
}
//-----------------------------------------------------------------
function getNextPalindromeDate(date){
var counter =0;
var nextDate= getNextDate(date);
while(1){
  counter++;
  var isPalindrome = checkPalindromeForAllDateFormats
  (nextDate);
  if(isPalindrome){
    break;
  }
  nextDate =getNextDate(nextDate);

}
return [counter,nextDate]
}

//-------------------------------------------------------------------
 
var dateInputRef=document.querySelector("#bday-input")
var showBtnRef= document.querySelector("#show-btn")
var resultRef = document.querySelector("#result");

const clickHandler=(e)=>{
  var bdayStr = dateInputRef.value;
  if(bdayStr != "")
  {
    listOfDate = bdayStr.split("-")
    var date = {
      day: Number(listOfDate[2]),
      month : Number(listOfDate[1]),
      year : Number(listOfDate[0])
    }
   var isPalindrome = checkPalindromeForAllDateFormats(date);
   if(isPalindrome){
     resultRef.innerText= "hey your birthday is a palindrome 🥰🥰🥰"   
  }
  else{

    var [counter , nextDate] = getNextPalindromeDate(date);

    resultRef.innerText=`The next palidrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed it by ${counter} days !`;
  }
}}

showBtnRef.addEventListener("click", clickHandler)
