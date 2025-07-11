import { useLocation } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import SignRouter from "./routers/SignRouter";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/sign')) {
    return (<>
      <SignRouter />
      <ToastContainer />
    </>)
  }

  return (<>
    <AppRouter />
    <ToastContainer />
  </>)
}

export default App;