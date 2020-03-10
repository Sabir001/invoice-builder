import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Layout = styled.div`
    margin: 5% auto 0 auto;
    max-width: 60%;

`;

export default ({children}) => (
    <Layout>
        <Header poop/>

        {children}
    </Layout>
); 