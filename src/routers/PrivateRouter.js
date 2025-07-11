import { toast } from "react-toastify";

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    toast('로그인이 필요한 기능입니다.');
    // 로그인 안내 모달 띄우기
    return null;
  };

  return children;
}

export default PrivateRoute;