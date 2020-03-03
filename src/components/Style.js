import styled from 'styled-components'
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
const Button = styled.button`
    background: ${props => props.bg || "palevioletred"};
    color: #fff;
    padding: 20px 10px;
    
    &:hover {
        background: blue;
    }
`;
const Menu = styled.ul`
    list-style: none;
`
const MenuItem = styled.li`
    display: inline-block;
    padding: 5px;
`

export {Wrapper, Button, Menu, MenuItem}