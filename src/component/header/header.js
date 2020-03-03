import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderMain,
  HeaderWrapper,
  HeaderBrand,
  HeaderLogo,
  HeaderNav,
  HeaderList
} from "../../style/headerStyle";
import Logo from "../../assets/image/invoice-logo.png";

function Header() {
  return (
    <HeaderMain>
      <HeaderWrapper>
        <HeaderBrand>
          <Link to="/">
            <HeaderLogo src={Logo} alt="Logo" />
          </Link>
        </HeaderBrand>

        <HeaderNav>
          <HeaderList>
            <Link to="/">
              <span>Home</span>
            </Link>
          </HeaderList>

          <HeaderList>
            <Link to="/create">
              <span>Create</span>
            </Link>
          </HeaderList>

          <HeaderList>
            <Link to="/template">
              <span>Templates</span>
            </Link>
          </HeaderList>
        </HeaderNav>
      </HeaderWrapper>
    </HeaderMain>
  );
}

export default Header;
