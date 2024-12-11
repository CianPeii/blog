import styled from "styled-components";

const NotFoundWrapper = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
    max-width: 1200px;
    margin: 0 auto;
    display: block;
  }
`;

function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <img
        src="https://media.gettyimages.com/id/1359544002/zh/%E5%90%91%E9%87%8F/404-error-computer-program-error-web-page-cannot-be-opened.jpg?s=612x612&w=0&k=20&c=2q1UKee4ufYye0N7qWnKzb9NNcz5MWUj7faQgInD5A0="
        alt="404 Not Found"
      />
    </NotFoundWrapper>
  );
}

export default NotFoundPage;
