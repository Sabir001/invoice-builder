import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';


const InvoiceForm = styled.form`
    width: 960px;
    margin: 5% auto;
    overflow: hidden;
`;

const Column = styled.div`
    float: left;
    width: 50%;
`;

const Button = styled.button`
    display: flex;
    flex-basis: 100%;
`;

const FormField = styled.div`
    margin: 0 0 15px 0;
    // display: flex;
    // flex-direction: column;
    // justfiy-content: center;
    input, textarea {
        display: block;
        padding: 5px;

        
    }

    input.input__label {
        display: inline-block;
        float: left;
    }
`;


export default () => {

    const recipient = useRef();

    const billLabel = useRef();
    const BillingName = useRef();

    const invoiceNumber = useRef();


    const dateLabel = useRef();
    const date = useRef();

    const paymentTermsLabel = useRef();
    const paymentTerms = useRef();

    const dueDateLabel = useRef();
    const dueDate = useRef();


    const [totalBalance, updateTotalBalance] = useState(5.0);


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            "recipient": recipient.current.value,
            "billLabel": billLabel.current.value,
            "BillingName": BillingName.current.value,
            "invoiceNumber": invoiceNumber.current.value,
            "dateLabel": dateLabel.current.value,
            "date": date.current.value,
            "paymentTermsLabel": paymentTermsLabel.current.value,
            "paymentTerms": paymentTerms.current.value,
            "dueDateLabel": dueDateLabel.current.value,
            "dueDate": dueDate.current.valuee
        });

        updateTotalBalance(totalBalance+1);
    }

    useEffect( () => {
        alert('Hello');
    }, []);

    return(
        <InvoiceForm onSubmit={ e => handleSubmit(e) }>

            <div>
                <Column>
                    <FormField>
                        <Button>+ Add Your Logo</Button>
                    </FormField>

                    <FormField>
                        <textarea ref={recipient} placeholder="Who is this invoice from? dafdfaf )"></textarea>
                    </FormField>

                    <FormField>
                        <input type="text" ref={billLabel} className="input__label" />
                        <textarea ref={BillingName} placeholder="Who is this invoice to? )"></textarea>
                    </FormField>
                    
                </Column>

                <Column>
                    <FormField>
                        <span className="input__label">#</span>
                        <input type="text" ref={invoiceNumber} />
                    </FormField>

                    <FormField>
                        <input type="text" ref={dateLabel} className="input__label" />
                        <input ref={date} input="date" />
                    </FormField>

                    <FormField>
                        <input type="text" ref={paymentTermsLabel} className="input__label" />
                        <textarea ref={paymentTerms}></textarea>
                    </FormField>

                    <FormField>
                        <input type="text" ref={dueDateLabel} className="input__label" />
                        <textarea ref={dueDate}></textarea>
                    </FormField>
                    
                </Column>
            </div>

            <div><strong>Balance Due:</strong>{totalBalance}</div>


            <input type="submit" value="Generate Invoice" />


        </InvoiceForm>
    )
}