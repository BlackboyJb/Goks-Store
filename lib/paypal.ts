const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

// Function to fetch the exchange rate (Replace with your actual exchange rate API)
export async function getExchangeRate() {
  // Example: Hardcoded exchange rate (Replace with a dynamic API call)
  const exchangeRate = 1600; // Example: 1 USD = 1400 NGN
  return exchangeRate;
}

export const paypal = {
  createOrder: async function createOrder(priceInNaira: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    // Convert NGN to USD
    const exchangeRate = await getExchangeRate();
    const priceInUSD = (priceInNaira / exchangeRate).toFixed(2); // Round to 2 decimal places

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: priceInUSD,
            },
          },
        ],
      }),
    });
    return handleErrorResponse(response);
  },

  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleErrorResponse(response);
  },
};

// Generate PayPal access token
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString(
    "base64"
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const jsonData = await handleErrorResponse(response);
  return jsonData.access_token;
}

// Function to handle errors
async function handleErrorResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAccessToken };

// const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

// export const paypal = {
//   createOrder: async function createOrder(price: number) {
//     const accessToken = await generateAcessToken();
//     const url = `${base}/v2/checkout/orders`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               value: price,
//             },
//           },
//         ],
//       }),
//     });
//     return handleErrorResponse(response);
//   },
//   capturePayment: async function cspturePayment(orderId: string) {
//     const accessToken = await generateAcessToken();
//     const url = `${base}/v2/checkout/orders/${orderId}/capture`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return handleErrorResponse(response);
//   },
// };

// //Generate access paypal access token
// async function generateAcessToken() {
//   const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
//   const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString(
//     "base64"
//   );

//   const response = await fetch(`${base}/v1/oauth2/token`, {
//     method: "POST",
//     body: "grant_type=client_credentials",
//     headers: {
//       Authorization: `Basic ${auth}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//   const jsonData = await handleErrorResponse(response);
//   return jsonData.access_token;
// }

// //function to handle errors
// async function handleErrorResponse(response: Response) {
//   if (response.ok) {
//     return response.json();
//   } else {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }

// export { generateAcessToken };
