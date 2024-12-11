import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getPost } from "../../WebApi";

const PostContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Time = styled.time`
  display: block;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #34495e;
  white-space: pre-wrap;
`;

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);
      setPost(post);
    };

    fetchPost();
  }, [id]);

  if (!post)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
          alt="Loading animation"
        ></img>
      </div>
    );

  return (
    <PostContainer>
      <Title>{post.title}</Title>
      <Time>{new Date(post.createdAt).toLocaleString()}</Time>
      <Content>{post.body}</Content>
    </PostContainer>
  );
}

export default PostPage;
