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

export const Payment_METHOD = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "Budpay", "Cash On Delivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.PAYMENT_DEFAULT_METHOD || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 5;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
  console_type: "",
};
export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];

export const reviewFormDefaultValues = {
  title: " ",
  comment: " ",
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your elementary school?",
  "What city were you born in?",
  "What is your favorite food?",
  "What was the make of your first car?",
  "What is your favorite movie?",
];
