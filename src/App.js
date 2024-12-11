// import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header";
import PostPage from "./pages/PostPage/PostPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthContext } from "./Context";
import { useEffect, useState } from "react";
import { getMe } from "./WebApi";
import { getAuthToken } from "./utils";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await getMe();
          if (response.ok) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("獲取用戶資料失敗:", error);
        }
      }
      setIsLoading(false); // 無論成功失敗都結束載入狀態
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return null; // 或者返回一個載入指示器
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route
            path="/newPost"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<NotFound>NotFound</NotFound>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
