import styled from "styled-components";
import { useState } from "react";
import { addPost } from "../../WebApi";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils";

const PageContainer = styled.div`
  min-height: calc(100vh - 60px);
  background: #f5f6f7;
  padding: 3rem 1rem;
`;

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const BodyTextarea = styled.textarea`
  min-height: 400px;
  padding: 1.2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  border: 2px solid #eee;
  border-radius: 8px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled(Message)`
  background-color: #fdecea;
  color: #ea4335;
  border: 1px solid #fdcdc7;
`;

const SuccessMessage = styled(Message)`
  background-color: #e8f5e9;
  color: #4caf50;
  border: 1px solid #c8e6c9;
`;

const SubmitButton = styled.button`
  padding: 1rem 2.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 2rem auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const token = getAuthToken;
    if (!token) {
      navigate("/login");
      return;
    }
    e.preventDefault();

    // 表單驗證
    if (!title.trim() || !body.trim()) {
      setErrorMessage("請填寫完整的標題和內容");
      return;
    }
    setIsLoading(true);

    try {
      await addPost(title, body);
      setSuccessMessage("文章發布成功！");
      setTimeout(() => navigate("/"), 1500); // 顯示成功訊息後再跳轉
    } catch (error) {
      setErrorMessage("發布失敗：" + error.message);
      console.error("發文失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <PostContainer>
        <PostHeader>
          <PostTitle>撰寫新文章</PostTitle>
        </PostHeader>

        <PostForm onSubmit={handleSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <TitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="請輸入標題..."
                disabled={isLoading}
              />
              <BodyTextarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="請輸入內容..."
                disabled={isLoading}
              />
              <SubmitButton disabled={isLoading}>
                {isLoading ? "發布中..." : "發布文章"}
              </SubmitButton>
            </>
          )}
        </PostForm>
      </PostContainer>
    </PageContainer>
  );
};

export default NewPostPage;
