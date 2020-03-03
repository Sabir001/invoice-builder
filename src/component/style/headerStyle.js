import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    padding: 50px 0;
`;

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`;

export const HeaderMain = styled.div`
    width: 100%;
    background-color:#fff;
    box-shadow: 2px 0px 10px #d0d0d0;
`;

export const HeaderWrapper = styled.div`
    display: flex;
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