# Credit Card Capture Example

A React application demonstrating secure credit card data capture using [Basis Theory React Elements](https://developers.basistheory.com/docs/sdks/web/react-elements). This example shows how to implement PCI-compliant credit card form fields that tokenize sensitive data without it touching your servers.

<img width="557" height="389" alt="image" src="https://github.com/user-attachments/assets/9b052c28-8f3f-4e50-baba-47df083e4b75" />


## Features

- 🔒 **PCI Compliant**: Credit card data is tokenized client-side
- 🎨 **Customizable Styling**: Fully customizable input field styles
- 🚀 **React 19**: Built with the latest React features
- ⚡ **Fast Development**: Built with Vite for rapid development

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd cc-capture-example

# Install dependencies
pnpm install
# or
npm install
```

### 2. App is Pre-configured with a sandbox Basis Theory key

```typescript
const { bt } = useBasisTheory("public_key_provided_by_rye");
```

### 3. Run the Application

```bash
# Start development server
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Enter Credit Card Information**: Fill in the card number, expiration date, and CVC
2. **Submit the Form**: Click the "Submit" button to tokenize the card data
3. **View Results**: Check the browser console to see the generated token ID

## How It Works

This application demonstrates the secure capture of credit card data using Basis Theory's React Elements:

- **CardNumberElement**: Captures and validates card numbers
- **CardExpirationDateElement**: Handles expiration date input
- **CardVerificationCodeElement**: Captures CVC/CVV codes

When the form is submitted, the sensitive card data is tokenized client-side and a secure token is generated. This token can then be sent in the `/confirm` step of the checkout-intents-api for processing payment with checkout. Like so 

```
# Payload of POST /confirm

{
    "paymentMethod": {
        "type": "basis_theory_token",
        "basisTheoryToken": "<token-from-cc-capture>",
    }
}
```

## Project Structure

```
cc-capture-example/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Dependencies

- **@basis-theory/react-elements**: Basis Theory's React components for secure data capture
- **React 19**: Latest version of React
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast build tool and development server

## Security Notes

- This example uses a public API key which is safe to include in client-side code
- Sensitive card data never touches your servers
- All tokenization happens client-side using Basis Theory's secure elements
- The generated tokens can be safely transmitted to Rye's api service

## Next Steps

To integrate this into your application:

1. Replace the hardcoded API key with one provided by Rye for production.
2. Implement backend processing for the generated tokens
3. Add proper error handling and validation
4. Customize the styling to match your brand
5. Add additional form fields as needed

## Learn More

- [React Elements Guide](https://developers.basistheory.com/docs/sdks/web/react-elements)


# Alternative Backend Flow
If you already have access to the raw credit card information and would just like to tokenize it directly, you can follow this example call:
```
curl "https://api.basistheory.com/tokens" \
  -H "BT-API-KEY: key_test_us_pub_Gtquo4kCeDkj2hTFWJSYCX" \
  -H "Content-Type: application/json" \
  -X "POST" \
  -d '{
    "type": "card",
    "data": {
	    "number": "4242424242424242",
	    "expiration_month": 02,
	    "expiration_year": 2028,
	    "cvc": 123
    }
  }'
```
- The response will contain an `id`, which is the token-id that needs to be passed in `/confirm` as shown above.
