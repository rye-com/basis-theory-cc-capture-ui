# Credit Card Capture Example

A React application demonstrating secure credit card data capture using [Basis Theory React Elements](https://developers.basistheory.com/docs/sdks/web/react-elements). This example shows how to implement PCI-compliant credit card form fields that tokenize sensitive data without it touching your servers.

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

### 2. Configure Basis Theory

1. Sign up for a [Basis Theory account](https://portal.basistheory.com/signup)
2. Create a new application in the Basis Theory portal
3. Copy your public API key
4. Update the API key in `src/App.tsx`:

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

When the form is submitted, the sensitive card data is tokenized client-side and a secure token is generated. This token can then be sent in the `/confim` step of the checkout-intents-api for processing payment with checkout.

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

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

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

1. Replace the hardcoded API key with one provided by Rye.
2. Implement backend processing for the generated tokens
3. Add proper error handling and validation
4. Customize the styling to match your brand
5. Add additional form fields as needed

## Learn More

- [React Elements Guide](https://developers.basistheory.com/docs/sdks/web/react-elements)
