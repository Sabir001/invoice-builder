import React from "react";
import { Wrapper } from "../../style/common";

const HomePage = () => {
  return (
    <Wrapper>
      Homepage
      <img src={ localStorage.getItem('logo') } />
    </Wrapper>
  );
};

export default HomePage;
