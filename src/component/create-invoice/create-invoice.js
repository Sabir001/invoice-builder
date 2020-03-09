import React, { useState, useEffect } from "react";
import ImageUploader from 'react-images-upload';
import { Link } from "react-router-dom";

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
    const [logo, setLogo] = useState('');    
    const [formData, updateFormData] = useState();

    const handleBillFrom = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onDrop = (picture) => {
        setLogo(picture);
    }

    return <Wrapper>

        <Row>
            <HalfWidth>

                <InputWrapper>
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        singleImage={true}
                        onChange={(picture) => onDrop(picture)}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={2242880}
                    />
                </InputWrapper>
                
                <InputWrapper>
                    <InputField type="text" name="bill_to" onChange={ (e) => handleBillFrom(e) } placeholder="Who is this Invoice from?" />
                </InputWrapper>

                <InputWrapper>
                    <InputLabel>Bill To</InputLabel>
                    <InputField type="text" name="bill_from" onChange={ (e) => handleBillFrom(e) } placeholder="Who is this Invoice to?" />

                    
                </InputWrapper>

            </HalfWidth>

            <HalfWidth>
                <InputField type="text" placeholder="" />
            </HalfWidth>
        </Row>

        <Row>
            <Link to="/pdf" target="_blank" state={formData}>
              <span>Preview PDF</span>
            </Link>
        </Row>

    </Wrapper>;
}

export default CreateInvoice;