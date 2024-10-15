// validators - text, alphaNum, transactionRefNo, number, kitNumber, pan, email, amount, aadhaar, pincode,
// password, comment, address, companyName, city, state, mpin, otp, accountNumber

export const validate = (validator, val, onChange, setNamesError, isSpaceRequired) => {
  switch (validator) {
    case "companyName":
    case "text" || "":
    case "logoUrl": {
      if (val.startsWith(" ")) {
        onChange("");
        return true }
      else {
      onChange(val);
      return true}
    }
    case "address":
      if (val === "") {
        onChange("");
        return true;
      }
      if (val.startsWith(" ")) {
        onChange("");
        return true}
      else if (/^[a-zA-Z0-9()/.,: #\\;'-]+$/.test(val)) {
        onChange(val);
        return true }
      break;

    case "comment":
      if (/^[a-zA-Z0-9() /.,: #\\;'-]+$/.test(val)) return onChange(val);
      break;

    case "name":
      if (val === "") {
        onChange("");
        return true;
      }
      if (/^[a-zA-Z ]+$/.test(val)) {
        let names = val?.split(" ");
        if (names && names.length > 2) {
          setNamesError(true);
          return false;
        } else {
          setNamesError(false);
          onChange(val.trimStart());
          return true;
        }
      } else {
        return false;
      }
      break;
    case "transactionRefNo":
    case "alphaNum":
      if (isSpaceRequired ? /^[0-9a-zA-Z ]+$/.test(val) : /^[0-9a-zA-Z_]+$/.test(val)) {
        onChange(val.toUpperCase());
        return true
      }

      break;

    case "kitNumber":
      if (val.startsWith(" ") || val.startsWith(0)) return onChange("");
      else if (/^[0-9]+$/.test(val)) {
        return onChange(val);
      }
      break;
    case "number":
      if (val.startsWith(" ")) {
        onChange("");
        return true }
      else if (/^[0-9]+$/.test(val)) {
        onChange(val);
        return true
      }
      break;

      case "decimal":
        if (val.startsWith(" ")) {
          onChange("");
          return true;
        } else if (/^\d*\.?\d*$/.test(val)) {
          onChange(val);
          return true;
        }
        break;

    case "pan":
      if (val === "") {
        onChange("");
        return true;
      }
      if (val.length === 10) {
      }
      if (val.length <= 5 && /^[a-zA-Z]+$/.test(val)) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length > 5 && val.length <= 9 && /^[0-9]+$/.test(val.slice(5, val.length))) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length === 10 && /^[a-zA-Z]+$/.test(val.slice(9, val.length))) {
        onChange(val.toUpperCase());
        return true
      }

      break;

    case "gst":
      if (val === "") {
        onChange("");
        return true;
      }
      if (val.length <= 2 && /^[0-9]+$/.test(val)) {
        onChange(val.toUpperCase());
        return true
      } else if (
        val.length > 2 &&
        val.length <= 7 &&
        /^[a-zA-z]+$/.test(val.slice(2, val.length))
      ) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length > 7 && val.length <= 11 && /^[0-9]+$/.test(val.slice(7, val.length))) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length === 12 && /^[a-zA-Z]+$/.test(val.slice(11, val.length))) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length === 13 && /^[0-9]+$/.test(val.slice(12, val.length))) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length === 14 && /^[a-zA-Z]+$/.test(val.slice(13, val.length))) {
        onChange(val.toUpperCase());
        return true
      } else if (
        val.length === 15
        // &&
        // /^[0-9]+$/.test(val.slice(14, val.length))
      ) {
        onChange(val.toUpperCase());
        return true
      }
      break;

    case "email":
      if (val === "") {
        onChange("");
        return true;
      }
      if (/^[0-9a-zA-Z.@]+$/.test(val)){
        onChange(val);
        return true
      } 

      break;
    case "amount":
      if (/^[0-9]+$/.test(val)) {
        let variable = val.replace(/\b(0(?!\b))+/g, "");
        if (parseInt(variable) > 0) {
          onChange(val);
          return true
        }
      }
      break;
    case "amount1":
      if (/^[0-9]+$/.test(val)) {
        let variable = val.replace(/\b(0(?!\b))+/g, "");
        if (parseInt(variable) > 0) {
          onChange(val);
          return true
        }
      }
      break;

    case "aadhaar":
      if (/^[0-9]+$/.test(val) && val.length <= 12) {
        onChange(val);
        return true
      }
      break;

    case "passport":
      if (val.length === 8) {
      }
      if (val.length <= 1 && /^[a-zA-Z]+$/.test(val)) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length > 1 && val.length <= 8 && /^[0-9]+$/.test(val.slice(1, val.length))) {
        onChange(val.toUpperCase());
        return true
      }
      break;

    case "voterId":
      if (val.length === 10) {
      }
      if (val.length <= 3 && /^[a-zA-Z]+$/.test(val)) {
        onChange(val.toUpperCase());
        return true
      } else if (val.length > 3 && val.length <= 10 && /^[0-9]+$/.test(val.slice(3, val.length))) {
        onChange(val.toUpperCase());
        return true
      }
      break;

    case "pincode":
      if (val.startsWith(" ") || val.startsWith(0)) return onChange("");
      else if (/^[0-9]+$/.test(val) && val.length <= 6) {
        onChange(val);
        return true
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
        return true
      }
      break;

    case "mpin":
      if (/^[0-9]+$/.test(val) && val.length <= 4) {
        onChange(val);
        return true
      }
      break;

    case "otp":
      if (/^[0-9]+$/.test(val) && val.length <= 6) {
        onChange(val);
        return true
      }
      break;

    case "mobile":
      if (val === "") {
        onChange("");
        return true;
      }
      if (val.startsWith(0)) {
        onChange("");
        return false;
      } else if (/^[0-9]+$/.test(val) && val.length <= 10 && !val.startsWith(0)) {
        onChange(val);
        return true;
      }
      break;

    case "ifscCode":
      if (/^[0-9A-Za-z]+$/.test(val) && val.length <= 11) {
        onChange(val.toUpperCase());
        return true;
      } 
      break;

    case "accountNumber":
      if (/^[0-9A-Za-z]+$/.test(val) && val.length <= 18) {
        onChange(val.toUpperCase());
        return true
      }
      break;
    case "alphaNum1":
      if (/^[0-9a-zA-Z_ ]+$/.test(val)) {
        onChange(val);
        return true
      }

      break;
    case "alphaNum2":
      if (/^[0-9a-zA-Z]+$/.test(val) && !val.includes(" ")) {
        onChange(val);
        return true
      }
      break;
    default:
      onChange(val);
      return true
  }
  if (val === "") onChange("");
};
// validators - text, alphaNum, transactionRefNo, number, kitNumber, pan, email, amount, aadhaar, pincode,
// password, comment, address, companyName, city, state, mpin, otp, accountNumber
