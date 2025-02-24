/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//convert Prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumbertoDecimal(num: number): string {
  return num.toFixed(2);
}
//format errors
export function formatError(error: any) {
  if (error.name === "ZodError") {
    //Handle Zod Error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //  Handle Prisma Error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    //Handle other Errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

//Round Number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round(((value + Number.EPSILON) * 100) / 100);
  } else if (typeof value === "string") {
    return Math.round(((Number(value) + Number.EPSILON) * 100) / 100);
  } else {
    throw new Error("Value is not a number or string");
  }
}

// //format number in decimal places
// export function formatNumbertoDecimal(num: number): string {
//   const [int, decimal] = num.toString().split(".");
//   return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
// }
