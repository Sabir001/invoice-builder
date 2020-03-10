import React from 'react';
import Layout from './Layout/Layout';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.div`
    display: inline-block;
    padding: 8px 15px;
    background: red;
    margin-top: 5px;

    a {
        color: #fff;
    }
`;

export default () => {
    return(
        <Layout>
            <Button><NavLink to="/about/family">Family</NavLink></Button>
            <h2>About Page</h2>
        </Layout>
    )

};