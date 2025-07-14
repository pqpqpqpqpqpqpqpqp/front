import { useLocation } from "react-router-dom";
import MainLayout from "Layout/MainLayout";
import SignRouter from "./routers/SignRouter";
import { AuthProvider } from "context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/sign')) {
    return (
      <AuthProvider>
        <SignRouter />
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true} />
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <MainLayout />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true} />
    </AuthProvider>
  )
}

export default App;