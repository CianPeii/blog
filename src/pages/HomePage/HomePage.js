import styled from "styled-components";
import { getPosts } from "../../WebApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Root = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostContainer = styled.article`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    background-color: lightblue;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PostTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const PostDate = styled.time`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// 分頁樣式
const PaginationStyles = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    list-style: none;
    padding: 0;
  }

  .page-item {
    display: inline-flex;
  }

  .page-link {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #3498db;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      background: #f5f5f5;
    }
  }

  .active .page-link {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }

  .disabled .page-link {
    color: #ccc;
    cursor: not-allowed;

    &:hover {
      background: none;
    }
  }
`;

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(posts);
      setPosts(response);
    };
    fetchPosts();
  });

  // 計算當前頁面的文章
  const lastPost = (currentPageIndex + 1) * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const currentPosts = posts.slice(firstPost, lastPost);

  return (
    <Root>
      {currentPosts.map((post) => (
        <PostContainer key={post.id}>
          <StyledLink to={`/post/${post.id}`}>
            <PostTitle>{post.title}</PostTitle>
          </StyledLink>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostContainer>
      ))}

      {posts.length > 0 && (
        <PaginationStyles>
          <ReactPaginate
            previousLabel="上一頁"
            nextLabel="最後一頁"
            pageCount={Math.ceil(posts.length / postsPerPage)}
            onPageChange={({ selected }) => {
              // 檢查是否點擊了"最後一頁"按鈕
              if (selected === Math.ceil(posts.length / postsPerPage) + 1) {
                // 直接跳到最後一頁
                setCurrentPageIndex(Math.ceil(posts.length / postsPerPage) + 1);
              } else {
                // 一般的頁面切換
                setCurrentPageIndex(selected);
              }
              window.scrollTo(0, 0);
            }}
            forcePage={setCurrentPageIndex}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        </PaginationStyles>
      )}
    </Root>
  );
}

export default HomePage;
