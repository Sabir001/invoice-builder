import React, {useEffect,useState} from 'react';
import { InvoiceItem } from "../../style/InvoiceItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceRight = () => {
    const [invoice, setinvoice] = useState('');
    const [invoiceDate, setinvoiceDate] = useState(new Date());
    const [terms, setterms] = useState('');
    const [dueDate, setdueDate] = useState(new Date());
    const [dueBanalce, setdueBanalce] = useState(0);

    const [submit, setSubmit] = useState(false);
    return (
        <div>
            <InvoiceItem>
                <label htmlFor="invoice-id">Invoice Id</label>
                <input type="number" name="invoice-id" placeholder="Invoice Id" value={invoice} onChange={(e) => setinvoice(e.target.value)} />
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="invoice-date">Date</label>
                <DatePicker
                    selected={invoiceDate}
                    onChange={(date) => setinvoiceDate(date)}
                />
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="paymets-terms">Payment Terms</label>
                <input name="paymets-terms" placeholder="paymets terms" value={terms} onChange={(e) => setterms(e.target.value)}/>
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="due-date">Due Date</label>
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setdueDate(date)}
                />
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="balance-due">Balance Due</label>
                <input type="number" name="balance-due" placeholder="Balance due" value={dueBanalce} onChange={(e) => setdueBanalce(e.target.value)} />
            </InvoiceItem>
            <button onClick={(e) => setSubmit(true)}>Submit</button>

            <div>
                {
                    submit &&
                        <p>
                            Invoice id: {invoice} <br/>

                        Terms: {terms} <br/>
                        Due Banalce: {dueBanalce} <br/>

                        </p>
                }
            </div>
        </div>
    );
}
export default InvoiceRight;