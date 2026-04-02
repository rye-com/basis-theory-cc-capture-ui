"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  BasisTheoryProvider,
  CardElement,
  useBasisTheory,
} from "@basis-theory/react-elements";
import { createBasisTheorySession } from "./actions";

const BT_API_KEY = "key_test_us_pub_Gtquo4kCeDkj2hTFWJSYCX";

function CardForm() {
  const { bt } = useBasisTheory(BT_API_KEY);
  const cardRef = useRef(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!bt || !cardRef.current) return;

      setLoading(true);
      setStatus("");

      try {
        // 1. Create a scoped session on the server
        const { sessionKey, container } = await createBasisTheorySession();

        // 2. Tokenize the card using the session key and container
        const token = await bt.tokens.create({
          type: "card",
          data: cardRef.current,
          containers: [container],
        }, {
          apiKey: sessionKey,
        });

        setStatus(`Token created: ${token.id}`);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setStatus(`Error: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    [bt]
  );

  return (
    <BasisTheoryProvider bt={bt}>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-6 border border-gray-300 rounded-xl shadow-sm bg-white"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Enter Card Details
        </h2>
        <div className="mb-4 p-3 border border-gray-300 rounded">
          <CardElement id="card-element" ref={cardRef} />
        </div>
        <button
          type="submit"
          disabled={!bt || loading}
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Tokenizing..." : "Tokenize Card"}
        </button>
        {status && (
          <p className="mt-4 text-sm text-gray-700 bg-gray-100 p-2 rounded break-all">
            {status}
          </p>
        )}
      </form>
    </BasisTheoryProvider>
  );
}

export default function CardTokenizer() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <CardForm />
    </div>
  );
}
