"use server";

import CheckoutIntents from "checkout-intents";

const client = new CheckoutIntents({
  apiKey: "Qe4filf9bT",
  environment: "staging",
});

export async function createBasisTheorySession() {
  const { sessionKey, container } =
    await client.paymentGateways.createSession("basis-theory");

  return { sessionKey, container };
}
