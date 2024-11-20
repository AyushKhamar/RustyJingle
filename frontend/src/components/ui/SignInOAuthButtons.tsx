import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button.tsx";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }
  //todo This is the login button setup, we need to import signIn and then call it on click, with the setup shown here. the redirect url is the same that we handled in app.tsx, one that has AuthenticateWithRedirectCallbackUrl - so it will hit sso-callback then when the authentication will be completed it will be sent to auth-callback page. the route is added just in case. otherwise this button alone will do all the redirect work by itself.
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};
export default SignInOAuthButtons;
