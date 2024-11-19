import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/auth-callback" Component={AuthCallbackPage}></Route>
      </Routes>
    </>
  );
}

export default App;
