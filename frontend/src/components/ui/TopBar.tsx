import {
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons.tsx";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10 rounded-lg
    "
    >
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )}
        {/* <SignedIn
        //todo THese components, i.e signed in and signed out are from clerk and work according to the description. SO I can write simple logic as , if user is signed in then show the signout button and the user button
        >
          <SignOutButton />
        </SignedIn> */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
