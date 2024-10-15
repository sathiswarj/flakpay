// date and time
// export const dateConvert = (dates, isTimeRequired = true) => {
//   let dateObject = new Date(dates);
//   dateObject = new Date(dateObject.toUTCString());
//   let date = dateObject.getUTCDate();
//   let month = parseInt(dateObject.getUTCMonth()) + 1;
//   let year = dateObject.getUTCFullYear();
//   let hours = dateObject.getUTCHours();
//   let minutes = dateObject.getUTCMinutes();
//   let seconds = dateObject.getUTCSeconds();
//   let updatedDate = date == 0 ? "00" : date;
//   if (date < 10) {
//     updatedDate = "0" + date;
//   }
//   let updatedMonth = month == 0 ? "00" : month;
//   if (month < 10) {
//     updatedMonth = "0" + month;
//   }
// let updatedHours = hours == 0 ? "00" : hours;
// if (hours < 10) {
//   updatedHours = "0" + hours;
// }

// updatedHours = updatedHours > 12 ? Number(updatedHours) - 12 : updatedHours;

//   let updatedMinutes = minutes == 0 ? "00" : minutes;
//   if (minutes < 10) {
//     updatedMinutes = "0" + minutes;
//   }
//   let updatedSeconds = seconds == 0 ? "00" : seconds;
//   if (seconds < 10) {
//     updatedSeconds = "0" + seconds;
//   }

//   if (isTimeRequired)
//     return `${date}/${month}/${year}  ${updatedHours}:${updatedMinutes}${
//       Number(updatedHours) >= 12 ? "PM" : "AM"
//     }`;
//   else return `${date}/${month}/${year}`;
// };

export const dateConvert = (dateObject, isTimeRequired = true) => {
    dateObject = new Date(dateObject);
    let date = dateObject.getDate();
    let month = parseInt(dateObject.getMonth()) + 1;
    let year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    let updatedDate = date == 0 ? "00" : date;
    if (date < 10) {
      updatedDate = "0" + date;
    }
    let updatedMonth = month == 0 ? "00" : month;
    if (month < 10) {
      updatedMonth = "0" + month;
    }
    let updatedHours = hours == 0 ? "00" : hours;
    if (hours < 10) {
      updatedHours = "0" + hours;
    }
    updatedHours = hours == 0 ? "00" : hours;
    if (hours < 10) {
      updatedHours = "0" + hours;
    }
  
    updatedHours = updatedHours > 12 ? Number(updatedHours) - 12 : updatedHours;
    let updatedMinutes = minutes == 0 ? "00" : minutes;
    if (minutes < 10) {
      updatedMinutes = "0" + minutes;
    }
    let updatedSeconds = seconds == 0 ? "00" : seconds;
    if (seconds < 10) {
      updatedSeconds = "0" + seconds;
    }
  
    if (isTimeRequired)
      return `${date}/${month}/${year}  ${updatedHours}:${updatedMinutes}${Number(updatedHours) <= 12 ? "PM" : "AM"}`;
    else return updatedDate + "/" + updatedMonth + "/" + year;
  };
  
  //onlyTime
  
  // export const onlyTime = (dates) => {
  //   let dateObject = new Date(dates);
  //   dateObject = new Date(dateObject.toUTCString());
  
  //   let hours = dateObject.getUTCHours();
  //   let minutes = dateObject.getUTCMinutes();
  //   let seconds = dateObject.getUTCSeconds();
  
  //   let updatedHours = hours == 0 ? "00" : hours;
  //   if (hours < 10) {
  //     updatedHours = "0" + hours;
  //   }
  
  //   updatedHours = updatedHours > 12 ? Number(updatedHours) - 12 : updatedHours;
  
  //   let updatedMinutes = minutes == 0 ? "00" : minutes;
  //   if (minutes < 10) {
  //     updatedMinutes = "0" + minutes;
  //   }
  //   let updatedSeconds = seconds == 0 ? "00" : seconds;
  //   if (seconds < 10) {
  //     updatedSeconds = "0" + seconds;
  //   }
  
  //   return ` ${updatedHours}:${updatedMinutes}${
  //     Number(updatedHours) >= 12 ? "PM" : "AM"
  //   }`;
  // };
  
  export const onlyTime = (dates) => {
    let dateObject = new Date(dates);
  
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    let updatedHours = hours == 0 ? "00" : hours;
    if (hours < 10) {
      updatedHours = "0" + hours;
    }
  
    updatedHours = updatedHours > 12 ? Number(updatedHours) - 12 : updatedHours;
  
    let updatedMinutes = minutes == 0 ? "00" : minutes;
    if (minutes < 10) {
      updatedMinutes = "0" + minutes;
    }
    let updatedSeconds = seconds == 0 ? "00" : seconds;
    if (seconds < 10) {
      updatedSeconds = "0" + seconds;
    }
  
    return ` ${updatedHours}:${updatedMinutes}${Number(updatedHours) <= 12 ? "PM" : "AM"}`;
  };
  
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  export const dateConvertNewFormat = (dateObject, isTimeRequired = true) => {
    dateObject = new Date(dateObject);
    let date = dateObject.getDate();
    let month = parseInt(dateObject.getMonth()) + 1;
    let year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    let updatedDate = date == 0 ? "00" : date;
    if (date < 10) {
      updatedDate = "0" + date;
    }
    let updatedMonth = month == 0 ? "00" : month;
    if (month < 10) {
      updatedMonth = "0" + month;
    }
    let updatedHours = hours == 0 ? "00" : hours;
    if (hours < 10) {
      updatedHours = "0" + hours;
    }
    updatedHours = hours == 0 ? "00" : hours;
    if (hours < 10) {
      updatedHours = "0" + hours;
    }
  
    updatedHours = updatedHours > 12 ? Number(updatedHours) - 12 : updatedHours;
    let updatedMinutes = minutes == 0 ? "00" : minutes;
    if (minutes < 10) {
      updatedMinutes = "0" + minutes;
    }
    let updatedSeconds = seconds == 0 ? "00" : seconds;
    if (seconds < 10) {
      updatedSeconds = "0" + seconds;
    }
  
    return `${date} ${monthNames[month - 1]} ${year}`;
  };
  
  export const formateDate = (dates) => {
    const d = dates.split("/");
    console.log(dates, "sates");
    let date = d[0];
    let month = d[1];
    let year = d[2];
  
    // if (Number(month) < 10) {
    //   month = "0" + month;
    // }
    if (Number(date) < 10) {
      date = "0" + date;
    }
  
    return `${date} ${monthNames[month - 1]} ${year}`;
  };
  
  export const convertDateToIST = (utcDateRaw) => {
    const utcDate = new Date(utcDateRaw);
    const options = {
      timeZone: "Asia/Kolkata", // Set the Indian time zone
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  
    // Convert the UTC date to Indian date-time format
    const indianDateTime = utcDate.toLocaleString("en-IN", options);
    return indianDateTime;
  };
  