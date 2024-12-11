import styled from "styled-components";
import {
  Link,
  NavLink as RouterNavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../Context";
import { useContext } from "react";
import { setAuthToken } from "../utils";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #f0f0f0;
  z-index: 99;
`;
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10rem;
`;

const Brand = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  color: #2c3e50;
  font-family: "Playfair Display", serif;
  transition: color 0.2s;

  &:hover {
    color: #3498db;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 1.1rem;

  &.main-nav {
    justify-content: center;
  }
`;

const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: #34495e;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3498db;
    transition: width 0.4s;
  }

  &.active,
  &:hover {
    color: #3498db;

    &:after {
      width: 100%;
    }
  }
`;
const NavSection = styled.div`
  display: flex;
  gap: 2.5rem;

  &.auth {
    margin-left: auto;
  }
`;

function Header() {
  const { user, setUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  return (
    <HeaderContainer>
      <HeaderContent>
        <Brand to="/">Blog Space</Brand>
        <NavSection>
          <NavbarList>
            <NavbarList>
              <li>
                <NavLink to="/">首頁</NavLink>
              </li>
              <li>{user && <NavLink to="/newPost">發布文章</NavLink>}</li>
            </NavbarList>
          </NavbarList>
        </NavSection>
        <NavSection>
          <NavbarList>
            <li>{!user && <NavLink to="/login">登入</NavLink>}</li>

            <li>
              {user && (
                <NavLink to="/login" onClick={handleLogout}>
                  登出
                </NavLink>
              )}
            </li>
          </NavbarList>
        </NavSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
