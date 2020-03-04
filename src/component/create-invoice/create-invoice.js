import React, { useState, useEffect } from "react";
import { 
    Wrapper,
    Row,
    HalfWidth,
 } from "../../style/common";
import { 
    InputField,
    InputWrapper,
    InputLabel
} from "../../style/create-style";

function CreateInvoice() {

    const [welcome, setWelcome] = useState(true);
    useEffect( () => {
        if (welcome) {
        //   alert("Welcome to Invoice Generator!");
        }
        setWelcome(false);
    }, []);

    return <Wrapper>

        <Row>
            <HalfWidth>

                <InputWrapper>
                    <InputField type="text" placeholder="Who is this Invoice from?" />
                </InputWrapper>

                <InputWrapper>
                    <InputLabel>Bill To</InputLabel>
                    <InputField type="text" placeholder="Who is this Invoice to?" />
                </InputWrapper>

            </HalfWidth>

            <HalfWidth>
                <InputField type="text" placeholder="" />
            </HalfWidth>
        </Row>

    </Wrapper>;
}

export default CreateInvoice;
