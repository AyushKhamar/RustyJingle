import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          // todo if user is authenticated, then redirect him to this callback page. And the redirect url is added here

          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        ></Route>
        <Route path="/auth-callback" Component={AuthCallbackPage}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route
          //todo if you have designed a common sidebar or a layout and you wantall the pages to only change a certain section of the page and not the entire layout then you can wrap those routes inside the layout route element

          element={<MainLayout />}
        >
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path="/albums/:id" element={<AlbumPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
