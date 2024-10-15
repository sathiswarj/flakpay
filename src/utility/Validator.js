// validators - text, alphaNum, transactionRefNo, number, kitNumber, pan, email, amount, aadhaar, pincode,
// password, comment, address, companyName, city, state, mpin, otp, accountNumber

export const validate = (
    validator,
    val,
    onChange,
    setNamesError,
    isSpaceRequired
  ) => {
    switch (validator) {
      case "companyName":
      case "text" || "":
      case "logoUrl": {
        if (val.startsWith(" ")) return onChange("");
        else return onChange(val);
      }
      case "address":
        if (val.startsWith(" ")) return onChange("");
        else if (/^[a-zA-Z0-9()/.,: #\\;'-]+$/.test(val)) return onChange(val);
        break;
      case "comment":
        if (/^[a-zA-Z0-9() /.,: #\\;'-]+$/.test(val)) return onChange(val);
        break;
  
      case "name":
        if (/^[a-zA-Z ]+$/.test(val)) {
          let names = val?.split(" ");
          if (names && names.length > 2) {
            return setNamesError(true);
          } else {
            setNamesError(false);
            return onChange(val.trimStart());
          }
        }
        break;
      case "transactionRefNo":
      case "alphaNum":
        if (
          isSpaceRequired
            ? /^[0-9a-zA-Z ]+$/.test(val)
            : /^[0-9a-zA-Z_]+$/.test(val)
        ) {
          return onChange(val.toUpperCase());
        }
  
        break;
  
      case "kitNumber":
        if (val.startsWith(" ") || val.startsWith(0)) return onChange("");
        else if (/^[0-9]+$/.test(val)) {
          return onChange(val);
        }
        break;
      case "number":
        if (val.startsWith(" ")) return onChange("");
        else if (/^[0-9]+$/.test(val)) {
          return onChange(val);
        }
        break;
  
      case "pan":
        if (val.length === 10) {
        }
        if (val.length <= 5 && /^[a-zA-Z]+$/.test(val)) {
          return onChange(val.toUpperCase());
        } else if (
          val.length > 5 &&
          val.length <= 9 &&
          /^[0-9]+$/.test(val.slice(5, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length === 10 &&
          /^[a-zA-Z]+$/.test(val.slice(9, val.length))
        ) {
          return onChange(val.toUpperCase());
        }
  
        break;
  
      case "gst":
        if (val.length <= 2 && /^[0-9]+$/.test(val)) {
          return onChange(val.toUpperCase());
        } else if (
          val.length > 2 &&
          val.length <= 7 &&
          /^[a-zA-z]+$/.test(val.slice(2, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length > 7 &&
          val.length <= 11 &&
          /^[0-9]+$/.test(val.slice(7, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length === 12 &&
          /^[a-zA-Z]+$/.test(val.slice(11, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length === 13 &&
          /^[0-9]+$/.test(val.slice(12, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length === 14 &&
          /^[a-zA-Z]+$/.test(val.slice(13, val.length))
        ) {
          return onChange(val.toUpperCase());
        } else if (
          val.length === 15
          // &&
          // /^[0-9]+$/.test(val.slice(14, val.length))
        ) {
          return onChange(val.toUpperCase());
        }
        break;
  
      case "email":
        if (/^[0-9a-zA-Z.@]+$/.test(val)) return onChange(val);
  
        break;
      case "amount":
        if (/^[0-9]+$/.test(val)) {
          let variable = val.replace(/\b(0(?!\b))+/g, "");
          if (parseInt(variable) > 0) {
            return onChange(val);
          }
        }
        break;
      case "amount1":
        if (/^[0-9]+$/.test(val)) {
          let variable = val.replace(/\b(0(?!\b))+/g, "");
          if (parseInt(variable) > 0) {
            return onChange(val);
          }
        }
        break;
  
      case "aadhaar":
        if (/^[0-9]+$/.test(val) && val.length <= 12) {
          return onChange(val);
        }
        break;
  
      case "passport":
        if (val.length === 8) {
        }
        if (val.length <= 1 && /^[a-zA-Z]+$/.test(val)) {
          return onChange(val.toUpperCase());
        } else if (
          val.length > 1 &&
          val.length <= 8 &&
          /^[0-9]+$/.test(val.slice(1, val.length))
        ) {
          return onChange(val.toUpperCase());
        }
        break;
  
      case "voterId":
        if (val.length === 10) {
        }
        if (val.length <= 3 && /^[a-zA-Z]+$/.test(val)) {
          return onChange(val.toUpperCase());
        } else if (
          val.length > 3 &&
          val.length <= 10 &&
          /^[0-9]+$/.test(val.slice(3, val.length))
        ) {
          return onChange(val.toUpperCase());
        }
        break;
  
      case "pincode":
        if (val.startsWith(" ") || val.startsWith(0)) return onChange("");
        else if (/^[0-9]+$/.test(val) && val.length <= 6) {
          return onChange(val);
        }
        break;
  
      case "password":
        if (!val.includes(" ")) {
          onChange(val);
        }
        break;
  
      case "city":
      case "state":
        if (val.startsWith(" ")) onChange("");
        else if (/^[a-zA-Z ]+$/.test(val)) {
          onChange(val);
        }
        break;
  
      case "mpin":
        if (/^[0-9]+$/.test(val) && val.length <= 4) {
          return onChange(val);
        }
        break;
  
      case "otp":
        if (/^[0-9]+$/.test(val) && val.length <= 6) {
          return onChange(val);
        }
        break;
  
      case "mobile":
        ///^[0-9 ]+$/.test(val) && val.length <= 10
        if (val.startsWith(0)) {
          return onChange("");
        } else if (
          /^[0-9]+$/.test(val) &&
          val.length <= 10 &&
          !val.startsWith(0)
        ) {
          // return onChange(val);
          return onChange(val);
        }
        break;
  
      case "ifscCode":
        if (/^[0-9A-Za-z]+$/.test(val) && val.length <= 11) {
          return onChange(val.toUpperCase());
        }
        break;
  
      case "accountNumber":
        if (/^[0-9A-Za-z]+$/.test(val) && val.length <= 25) {
          return onChange(val.toUpperCase());
        }
        break;
      case "alphaNum1":
        if (/^[0-9a-zA-Z_ ]+$/.test(val)) {
          return onChange(val);
        }
        break;
      case "commonSearch":
        if (/^[0-9a-zA-Z_\- ]+$/.test(val)) {
          return onChange(val);
        }
        break;
      case "alphaNum2":
        if (/^[0-9a-zA-Z]+$/.test(val) && !val.includes(" ")) {
          return onChange(val);
        }
  
        break;
      default:
        return onChange(val);
    }
    if (val === "") onChange("");
  };
  // validators - text, alphaNum, transactionRefNo, number, kitNumber, pan, email, amount, aadhaar, pincode,
  // password, comment, address, companyName, city, state, mpin, otp, accountNumber
  