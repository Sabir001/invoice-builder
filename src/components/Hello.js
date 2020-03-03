import React from 'react'
import {Wrapper, Button} from './Style'

const Hello = () => {
    return (
        <div>
            <Wrapper>
               <h1> Hello World!!</h1>
               <Button bg={'#404040'}>Click Me!!</Button>
               <Button bg={'#654256'}>Click Me!!</Button>
            </Wrapper>
        </div>
    );
}

export default Hello;
