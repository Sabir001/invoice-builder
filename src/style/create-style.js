import styled from "styled-components";



export const HalfWidthLeft = styled.div`
    flex: 1;
    padding: 1em;

    label {
        width: 70px;
    }
`;

export const HalfWidthRight = styled.div`
    flex: 1;
    padding: 1em;
    text-align: right;
`;

export const InputField = styled.input`
    width: auto;
    padding: 10px;
    box-sizing : border-box;
`;

export const InputWrapper = styled.div`
    width: 100%;    
    margin: 0px 0 1.5em 0;
`;

export const InputLabel = styled.label`
    margin: 0px 0 .8em 0;
    color: #707070;
    font-size: 0.9em;
    display: block;
`;

export const InlineInputLabel = styled.label`
    margin: 0px 1em .8em 0;
    color: #707070;
    font-size: 0.9em;
    display: inline-block;
`;

export const InlineInputField = styled.input`
    width: auto;
    padding: 10px;
    box-sizing : border-box;
    display: inline-block;
`;

export const InvoiceTitle = styled.h2`
    font-size: 2em;
    font-weight: 100;
`;