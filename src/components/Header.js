import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOut());
          navigate("/login");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLogin({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  // const signIn = () => {
  //   auth.signInWithPopup(provider).then((result) => {
  //     let user = result.user;
  //     dispatch(
  //       setUserLogin({
  //         name: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL,
  //       })
  //     );
  //     navigate("/");
  //   });
  // };

  // const signOut = () => {
  //   auth.signOut().then(() => {
  //     dispatch(setSignOut());
  //     navigate("/login");
  //   });
  // };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {/* <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo> */}
      {!userName ? (
        <LoginContainer>
          <Login onClick={handleAuth}>Login</Login>
        </LoginContainer>
      ) : (
        // <Login onClick={handleAuth}>Login</Login>
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg onClick={handleAuth} src={userPhoto} />
            {/* <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown> */}
          </SignOut>
        </>
      )}
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  text-decoration: none;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: inherit;

    text-decoration: none;

    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.3px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        // top: 0;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        tranform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;

        transform: scaleX(0);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 5px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
  }
`;

// const DropDown = styled.div`
//   position: absolute;
//   top: 48px;
//   right: 0px;
//   background: white;
//   border: 1px solid rgba(151, 151, 151, 0.34);
//   border-radius: 4px;
//   box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
//   padding: 10px;
//   font-size: 14px;
//   letter-spacing: 3px;
//   width: 100px;
//   opacity: 0;
// `;
