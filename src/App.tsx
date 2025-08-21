import React, { useRef, useState } from "react";
import {
  BasisTheoryProvider,
  // CardElement,
  useBasisTheory,
  CardNumberElement,
  CardExpirationDateElement,
  CardVerificationCodeElement,
} from "@basis-theory/react-elements";

export default function App() {
  const { bt } = useBasisTheory("key_test_us_pub_Gtquo4kCeDkj2hTFWJSYCX");
  // Ref to get access to the Element instance
  const cardElementRef = useRef(null);

  // Refs to get access to the Elements instance
  const cardNumberRef = useRef(null);
  const cardExpirationRef = useRef(null);
  const cardVerificationRef = useRef(null);
  
  // stores the current card brand in state, to pass to CardVerificationCodeElement
  const [cardBrand, setCardBrand] = useState();

  // const submit = async () => {
  //   try {
  //     const token = await bt?.tokens.create({
  //       type: 'card',
  //       data: cardElementRef.current,
  //     });
  //     // store token.id in your database
  //     console.log(token);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
        type: 'card',
        data: {
          number: cardNumberRef.current,
          expiration_month: cardExpirationRef.current.month(),
          expiration_year: cardExpirationRef.current.year(),
          cvc: cardVerificationRef.current,
        }
      });
      // TODO post the intent object to your backend
      console.log("Token id: ", token?.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="text-lg font-semibold mb-4 text-gray-800">
          Enter Card Details
        </h1>
        {/* <BasisTheoryProvider bt={bt}>
          <div style={{ marginBottom: "20px" }}>
            <CardElement 
              id="myCard" 
              ref={cardElementRef} 
            />
          </div>

          <button onClick={submit}>Submit</button>
        </BasisTheoryProvider> */}
        <BasisTheoryProvider bt={bt}>
          <CardNumberElement
            id="myCardNumber"
            ref={cardNumberRef}
            onChange={({ cardBrand }) => setCardBrand(cardBrand)}
          />
          <div style={{ display: 'flex' }}>
            <div style={{ width: "100%" }}>
              <CardExpirationDateElement
                id="myCardExpiration"
                ref={cardExpirationRef}
              />
            </div>
            <div style={{ width: "100%" }}>
              <CardVerificationCodeElement
                id="myCardVerification"
                ref={cardVerificationRef}
                cardBrand={cardBrand}
              />
            </div>
          </div>
          <button onClick={submit}>Submit</button>
        </BasisTheoryProvider>
      </div>
    </>

  );
}