import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];

export const generalValidationRulesOpt: Rule[] = [
  { required: false, message: "Field is required!" },
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

// Files
export type TFileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "text/csv";

export type TCeateFileValidationRuleProps = {
  required?: boolean;
  maxFileSize?: number;
  allowedFileTypes: TFileType[];
  maxFileUploadCount?: number;
};
export const DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB = 2;
export const DEFAULT_MAX_FILE_UPLOAD_COUNT = 1;

export const createFileValidationRule = (
  props: TCeateFileValidationRuleProps
): Rule => {
  const {
    required = true,
    maxFileSize = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
    allowedFileTypes,
    maxFileUploadCount = DEFAULT_MAX_FILE_UPLOAD_COUNT,
  } = props;
  return {
    required,

    validator: async (_, value) => {
      // non required
      if (
        required === false &&
        (Array.isArray(value) === false || value?.length === 0)
      ) {
        return true;
      }
      
      // required
      if (Array.isArray(value) === false || value?.length === 0) {
        throw new Error("Please upload a file");
      }
      if (Array.isArray(value) === true && value?.length > maxFileUploadCount) {
        throw new Error(
          "You can only upload a maximum of " + maxFileUploadCount + " files"
        );
      }
      (value as any[]).forEach((item, i) => {
        const file = item?.originFileObj;
        const isLt2M = file.size / 1024 / 1024 <= maxFileSize;

        if (!isLt2M) {
          throw new Error(
            `File ${i + 1} must smaller than or equal to ${maxFileSize}MB!`
          );
        }
        if (!allowedFileTypes.includes(file.type as TFileType)) {
          throw new Error(
            `File ${i + 1}: This file type (${file.type}) is not allowed!`
          );
        }
      });

      return true;
    },
  };
};
