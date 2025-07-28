import { useLocation } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import SignRouter from "./routers/SignRouter";
import { AuthProvider } from "context/AuthContext";
import { WriteProvider } from "context/WriteContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/sign')) {
    return (
      <AuthProvider>
        <SignRouter />
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
        />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <WriteProvider>
        <MainLayout />
      </WriteProvider>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
      />
    </AuthProvider>
  );
}

export default App;