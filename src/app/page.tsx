import CardTokenizer from "./CardTokenizer";
import { createBasisTheorySession } from "./actions";

export default async function Home() {
  // Create a session with Basis Theory and pass it to the CardTokenizer component to scope tokens to your Rye account
  const { sessionKey, container } = await createBasisTheorySession();
  return <CardTokenizer sessionKey={sessionKey} container={container} />;
}
