import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !showToast) {
      toast.warn('로그인이 필요한 기능입니다.');
      setShowToast(true);
    }
  }, [isLoggedIn, showToast]);

  if (!isLoggedIn) {
    return <Navigate to="/sign/required" replace />;
  }

  return children;
}

export default PrivateRoute;