import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "styles/App.css";
import Accounts from "pages/Accounts";
import Header from "components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "contexts/AppProvider";
import Login from "pages/Login";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { state } = useAppContext();
  const SignedIn = state.authorization.status;

  return (
    <div className="p-6 box-border w-full text-red-400 dark:text-red-300">
      {SignedIn ? (
        <>
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Accounts />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
