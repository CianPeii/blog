import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "../utils";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查是否有登入token
    const token = getAuthToken();
    if (!token) {
      // 如果沒有token，重定向到登入頁面
      navigate("/login");
    }
  }, [navigate]);

  // 如果有token，顯示子組件
  return getAuthToken() ? children : null;
};

export default ProtectedRoute;
