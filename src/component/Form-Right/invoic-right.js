import React, {useEffect,useState} from 'react';
import { InvoiceItem } from "../../style/InvoiceItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import {HeaderList} from "../../style/headerStyle";

const InvoiceRight = () => {
    const [invoice, setinvoice] = useState('');
    const [invoiceDate, setinvoiceDate] = useState(new Date());
    const [createdDate, setCreatedDate] = useState(new Date());

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

                    showPopperArrow={false}
                    selected={invoiceDate}
                    onChange={date => setinvoiceDate(date)}
                />
            </InvoiceItem>

            <InvoiceItem>
                <label htmlFor="due-date">Due Date</label>
                <DatePicker
                    showPopperArrow={false}
                    selected={dueDate}
                    onChange={(date) => setdueDate(date)}
                />
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="due-date">Created Date</label>
                <DatePicker
                    showPopperArrow={false}
                    selected={createdDate}
                    onChange={(date) => setCreatedDate(date)}
                />
            </InvoiceItem>
            <InvoiceItem>
                <label htmlFor="balance-due">Balance Due</label>
                <input type="number" name="balance-due" placeholder="Balance due" value={dueBanalce} onChange={(e) => setdueBanalce(e.target.value)} />
            </InvoiceItem>

            <Link to="/pdf">
                <span>pdf</span>
            </Link>
            <button onClick={(e) => setSubmit(true)}>Submit</button>

            <div>
                {
                    submit &&
                    (
                        <p>

                            Invoice id: {invoice} <br/>
                            Invocie Date: {invoiceDate.getDate()+"-"+(invoiceDate.getMonth()+1)+"-"+invoiceDate.getFullYear()} <br/>
                            Created Date: {createdDate.getDate()+"-"+(createdDate.getMonth()+1)+"-"+createdDate.getFullYear()} <br/>
                            Due Date: {dueDate.getDate()+"-"+(dueDate.getMonth()+1)+"-"+dueDate.getFullYear()} <br/>
                            Due Banalce: {dueBanalce} <br/>

                        </p>
                    )
                }
            </div>
        </div>
    );
}
export default InvoiceRight;