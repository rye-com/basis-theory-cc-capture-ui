import { useRef, useState } from "react";
import {
  BasisTheoryProvider,
  useBasisTheory,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerificationCodeElement,
} from "@basis-theory/react-elements";

const inputStyle = {
  base: {
    // Default style
    color: "#32325d",
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "16px",
    ":focus": {
      // Style when input has focus
      color: "#80bdff",
    },
    padding: "10px",
  },
  invalid: {
    // Style when input is invalid
    color: "#fa755a",
  },
  complete: {
    // Style when input is complete
    color: "#4CAF50",
  },
  empty: {
    // Style when input is empty
    color: "#c4c4c4",
  },
}

export default function App() {
  const { bt } = useBasisTheory("key_test_us_pub_Gtquo4kCeDkj2hTFWJSYCX");

  // Refs to get access to the Elements instance
  const cardNumberRef = useRef(null);
  const cardExpirationRef = useRef(null);
  const cardVerificationRef = useRef(null);

  // stores the current card brand in state, to pass to CardVerificationCodeElement
  const [cardBrand, setCardBrand] = useState();

  const submit = async () => {
    try {
      if (!cardNumberRef.current) {
        throw new Error("Card number is required");
      }
      if (!cardExpirationRef.current) {
        throw new Error("Card expiration date is required");
      }
      if (!cardVerificationRef.current) {
        throw new Error("Card verification code is required");
      }

      const token = await bt?.tokens.create({
        type: "card",
        data: {
          number: cardNumberRef.current,
          expiration_month: cardExpirationRef.current.month(),
          expiration_year: cardExpirationRef.current.year(),
          cvc: cardVerificationRef.current,
        },
      });
      // TODO post the intent object to your backend
      console.log("Token id: ", token?.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "50px auto",
          padding: "20px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h1
          style={{ color: "black"}}
        >
          Enter Payment Info
        </h1>

        <BasisTheoryProvider bt={bt}>
          <div
            style={{
              backgroundColor: "white",
              padding: "5px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              marginBottom: "2px",
            }}
          >
            <CardNumberElement
              id="myCardNumber"
              ref={cardNumberRef}
              onChange={({ cardBrand }) => setCardBrand(cardBrand)}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div
              style={{
                width: "100%",
                border: "2px solid #ccc",
                marginRight: "1px",
                borderRadius: "5px",
              }}
            >
              <CardExpirationDateElement
                id="myCardExpiration"
                ref={cardExpirationRef}
                style={inputStyle}
              />
            </div>
            <div
              style={{
                width: "100%",
                border: "2px solid #ccc",
                marginLeft: "1px",
                borderRadius: "5px",
              }}
            >
              <CardVerificationCodeElement
                id="myCardVerification"
                ref={cardVerificationRef}
                cardBrand={cardBrand}
                style={inputStyle}
              />
            </div>
          </div>
          <button
            onClick={submit}
            style={{
              borderRadius: "5px",
              backgroundColor: "#2348FC",
              color: "white",
            }}
          >
            Submit
          </button>
        </BasisTheoryProvider>
      </div>
    </>
  );
}
