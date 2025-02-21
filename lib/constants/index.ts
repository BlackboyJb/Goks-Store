export const APP_NAME = process.env.NEXT_APP_NAME || "Goks Store";
export const APP_DESCRIPTION = process.env.NEXT_APP_DESCRIPTION || "Game Store";
export const PUBLIC_DOMAIN =
  process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
export const LATEST_PRODUCT_LIMIT = process.env.LATEST_PRODUCT_LIMIT || 4;

export const SignInDefaultValues = {
  email: "",
  password: "",
};

export const SignUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
