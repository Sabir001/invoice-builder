import styled from "styled-components";

export const HeaderMain = styled.div`
    width: 100%;
    background-color:#fff;
    box-shadow: 2px 0px 10px #d0d0d0;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    max-width: 960px;
    margin: 0px auto;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const HeaderBrand = styled.div`
    
`;

export const HeaderLogo = styled.img`
    height: 70px;
    width: auto;
`;

export const HeaderNav = styled.ul`
    padding: 0;
    margin: 0;
`;
export const HeaderList = styled.li`
    padding: 15px;
    display: inline-block;

    a {
        color: #000;
        text-decoration: none;

        &:hover {
            color: #4d4db0;
        }
    }
`;