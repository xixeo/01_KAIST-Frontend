import dayjs from 'dayjs';

export function getForamtDate(date) {
    var year = date.getFullYear();
    var month = ( 1 + date.getMonth())
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return new Date(Number(year), Number(year), Number(day))
  }

  export function getDateToStringMonth(date) {
    var year = date.getFullYear();
    var month = ( 1 + date.getMonth())
    month = month >= 10 ? month : '0' + month;
    return year.toString()+month.toString()
  }

  export function getDateToStringDte(date) {
    var year = date.getFullYear();
    var month = ( 1 + date.getMonth())
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year.toString()+month.toString()+day.toString()
  }

  export function getStringToDate(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return new Date(y,m-1,d);
    
  }

  //현재일자를 'format에 맞게 변형 YYYY-MM-DD'
  export function getCurrentDate() {
    return dayjs(new Date()).format('YYYY-MM-DD')                     
  }

  //현재일자에서 이전달을 'format에 맞게 변형 YYYY-MM-DD' ex) a=1 한달전
  export function getPreMonth(month) {    
    return dayjs(new Date()).subtract(month, 'month').format('YYYY-MM-DD')    
  }

  //현재일자에서 이전일을 'format에 맞게 변형 YYYY-MM-DD' ex) a=1 1일전
  export function getPreDay(day) {    
    return dayjs(new Date()).subtract(day, 'day').format('YYYY-MM-DD')    
  }

  //특정일자를 'format에 맞게 변형 YYYY-MM-DD'
  export function getDateFormat(date) {
    if(date){
      return dayjs(date).format('YYYY-MM-DD')                     
    }else{
      return null
    }
  }

  //특정일자를 'format에 맞게 변형 YYYY-MM'
  export function getMonthFormat(date) {
    if(date){
      return dayjs(date).format('YYYY-MM')                     
    }else{
      return null
    }
  }

  //특정일자를 'format에 맞게 변형 YYYY'
  export function getYearFormat(date) {
    if(date){
      return dayjs(date).format('YYYY')                     
    }else{
      return null
    }
  }

  // 4자리 입력 숫자 시간 유효성 검사     맞으면 true 틀리면 false 
  export function timeCheck(inputTime) {
    let pattern = /^([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/
    let time = inputTime.replace(/[^0-9]/g,"")
    if(!pattern.test(time) || time.length !== 4) {
      return false
    } else {
      return true
    }   
  }

 /**
 * 좌, 우측문자열채우기
 *  - str : 원 문자열 
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
export function lpad(str, padLen, padStr) {
  if (padStr.length > padLen) {
    //채우고자 하는 문자열이 요청 길이보다 클때
    return str + "";
  }
  str += ""; // 문자로
  padStr += ""; // 문자로
  while (str.length < padLen)
      str = padStr + str;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
}
  
export function rpad(str, padLen, padStr) {
  if (padStr.length > padLen) {
    //채우고자 하는 문자열이 요청 길이보다 클때
    return str + "";
  }
  str += ""; // 문자로
  padStr += ""; // 문자로
  while (str.length < padLen)
      str += padStr;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
}

