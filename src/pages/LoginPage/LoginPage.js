import { useState, useContext } from "react";
import styled from "styled-components";
import { setAuthToken } from "../../utils";
import { login, getMe } from "../..//WebApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context";

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    width: 30%;
    padding: 0.8rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto;
    display: flex;
    justify-content: center;
      &:hover {
          background: #0056b3;
    }
} 
  }
`;

function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      console.log("登入回應:", data);

      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }

      setAuthToken(data.token);

      try {
        const response = await getMe();

        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(data.message);
        }
        setUser(response.data);
        navigate("/");
      } catch (error) {
        console.error("獲取用戶資料失敗:", error);
        setAuthToken(null);
        setErrorMessage("獲取用戶資料失敗，請重新登入");
      }
    } catch (error) {
      setErrorMessage("登入失敗，請稍後再試");
    }
  };

  return (
    <Login>
      <LoginForm onSubmit={handleSubmit}>
        <h1>登入</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="帳號"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="密碼"
        />
        <div style={{ color: "red", marginBottom: "1rem" }}>{erroMessage}</div>
        <button type="submit">登入</button>
      </LoginForm>
    </Login>
  );
}

export default LoginPage;
