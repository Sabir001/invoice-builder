import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = styled.header`
    width: 100%;
    background: ${ props => props.poop ? '#ffa000' : 'green'};
    text-align: center;

    a {
        text-decoration: none;
        color: #fff;
        padding: 8px 15px;
        display: inline-block;
    }
    
`;

export default (props) => (
    <Header {...props}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
    </Header>
);