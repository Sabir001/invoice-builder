import styled from "styled-components";

export const InvoiceItem = styled.div`
 
    padding-bottom: 30px;
    
    label,
    legend {
        display: block;
        margin-bottom: .5rem;
        font-weight: 600; 
    }
    
    input,
    textarea {
        width: 100%;
        max-width: 320px;
        height: 38px;
        padding: 6px 10px; /* The 6px vertically centers text on FF, ignored by Webkit */
        background-color: #fff;
        border: 1px solid #D1D1D1;
        border-radius: 4px;
        box-shadow: none;
        box-sizing: border-box;
    }
    
    textarea {
        min-height: 65px;
        padding-top: 6px;
        padding-bottom: 6px; 
    }
    
  
`;