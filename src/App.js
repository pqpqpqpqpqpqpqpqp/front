import { useLocation } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import SignRouter from "./routers/SignRouter";

function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/sign')) {
    return <SignRouter />;
  }
  
  return <AppRouter />;
}

export default App;