import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];

export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { whitespace: true },
];

export const textInputValidationRulesOpt: Rule[] = [
  { whitespace: true },
  { required: false },
];

export const emailValidationRules: Rule[] = [
  {
    required: true,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];

export const passwordValidationRules: Rule[] = [
  {
    required: true,
  },
  { message: "Field is required" },

  {
    validator: async (_, value) => {
      let paswd =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

      if (!paswd.test(value))
        throw new Error(
          "Password should contain at least one digit and special character and a letter in uppercase, and least 8 characters"
        );
      // if (false) throw new Error("Something wrong!");
      return true;
    },
  },
];

const phoneNumberVal: Rule = {
  validator: async (_, value) => {
    let paswd = /^\+?[0-9()-\s]+$/;

    if (!value.match(paswd)) throw new Error("Only digits are allowed");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const phoneNumberValidationRules: Rule[] = [
  ...generalValidationRules,
  phoneNumberVal,
];

export const integerValidationRules: Rule[] = [
  { required: true, message: "Please enter a number" },
  {
    validator: (_: any, value: number, callback: (error?: string) => void) => {
      if (isNaN(value)) {
        callback("Please enter only digits");
      } else {
        callback();
      }
    },
  },
];

export const urlValidationRules: Rule[] = [
  { required: false },
  {
    type: "url",
    message: "Invalid URL",
  },
  { whitespace: true },
];
