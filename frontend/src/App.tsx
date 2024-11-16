import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button.tsx";

function App() {
  return (
    <>
      hello
      <SignedOut>
        <SignInButton>
          <Button variant={"default"}>Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <Button variant={"destructive"}>Sign Out</Button>
        </UserButton>
      </SignedIn>
    </>
  );
}

export default App;
