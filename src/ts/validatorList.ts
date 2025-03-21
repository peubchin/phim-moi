import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

function isAllDigit(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNum = /^\d+$/.test(control.value);
    return isNum ? null : { isNum: { value: control.value } };
  };
}

function containsLetter(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containsLetter = /(?=.*[A-Za-z])/.test(control.value);
    return containsLetter ? null : { containsLetter: { value: control.value } };
  };
}

function containsDigit(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containsDigit = /(?=.*\d)/.test(control.value);
    return containsDigit ? null : { containsDigit: { value: control.value } };
  };
}

function containsSpecialChar(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containsSpecialChar = /(?=.*\W)/.test(control.value);
    return containsSpecialChar
      ? null
      : { containsSpecialChar: { value: control.value } };
  };
}

function isSamePassword(formControl: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isSamePassword = control.value == formControl.value;
    return isSamePassword
      ? null
      : { isSamePassword: { value: control.value } };
  };
}

function isUnique(valueList: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isUnique = valueList.every((value) => {
      return value != control.value;
    });
    return isUnique ? null : { isUnique: { value: control.value } };
  };
}

const validatorList = {
  isAllDigit,
  containsDigit,
  containsLetter,
  containsSpecialChar,
  isSamePassword,
  isUnique,
};

export { validatorList };
