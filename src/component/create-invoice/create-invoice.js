import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Wrapper, Row } from "../../style/common";

import {
  HalfWidthLeft,
  HalfWidthRight,
  InputField,
  InputWrapper,
  InvoiceTitle,
  InlineInputLabel,
  InlineInputField,
  TableMain,
  SubmitRow,
  SubmitButton
} from "../../style/create-style";

const CreateInvoice = () => {
  const [logo, setLogo] = useState();

  const [billFrom, setBillFrom] = useState("");
  const [billTo, setBillTo] = useState("");

  const [invoice, setinvoice] = useState("");
  const [invoiceDate, setinvoiceDate] = useState(new Date());
  const [terms, setTerms] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [dueBanalce, setdueBanalce] = useState(0);

  const [items, setItems] = useState([
    {
      name: "",
      quantity: "",
      rate: "",
      amount: ""
    }
  ]);

  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    localStorage.clear();
    localStorage.setItem("billFrom", billFrom);
    localStorage.setItem("billTo", billTo);
    localStorage.setItem("invoice_no", invoice);
    localStorage.setItem("invoiceDate", invoiceDate);
    localStorage.setItem("dueDate", dueDate);
    localStorage.setItem("terms", terms);
    localStorage.setItem("dueBanalce", dueBanalce);
    localStorage.setItem("items", items);

    setSubmit(true);
  };

  const handleRemoveItem = (e, i) => {
    e.preventDefault();

    setItems(items.filter((item, index) => index !== i));
  };

  const handleAddItem = e => {
    e.preventDefault();

    const newItem = {
      name: "",
      quantity: "",
      rate: "",
      amount: ""
    };

    setItems([...items, newItem]);
  };

  const handleItemChange = (e, index) => {
    const newItems = [...items];
    newItems[index] = {
      ...items[index],
      [e.target.name]: e.target.value
    };

    setItems(newItems);
  };

  const onDrop = picture => {
    setLogo(picture);
  };

  return (
    <Wrapper>
      <Row>
        <HalfWidthLeft>
          <InputWrapper>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              singleImage={true}
              onChange={picture => onDrop(picture)}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={2048}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Bill From:</InlineInputLabel>
            <InputField
              type="text"
              name="bill_to"
              onChange={e => setBillFrom(e.target.value)}
              placeholder="Who is this Invoice from?"
              value={billFrom}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Bill To:</InlineInputLabel>
            <InputField
              type="text"
              name="bill_from"
              onChange={e => setBillTo(e.target.value)}
              placeholder="Who is this Invoice to?"
              value={billTo}
            />
          </InputWrapper>
        </HalfWidthLeft>

        {/* Right */}
        <HalfWidthRight>
          <InvoiceTitle>Invoice</InvoiceTitle>

          <InputWrapper>
            <InlineInputLabel>Invoice No:</InlineInputLabel>
            <InlineInputField
              type="number"
              name="invoice-id"
              placeholder="Invoice Id"
              value={invoice}
              onChange={e => setinvoice(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel htmlFor="invoice-date">Date:</InlineInputLabel>
            <DatePicker
              showPopperArrow={false}
              selected={invoiceDate}
              onChange={date => setinvoiceDate(date)}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel htmlFor="due-date">
              Payment Terms:
            </InlineInputLabel>
            <InlineInputField
              type="text"
              name="payment_terms"
              placeholder="Terms"
              value={terms}
              onChange={e => setTerms(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel htmlFor="due-date">Due Date:</InlineInputLabel>
            <DatePicker
              showPopperArrow={false}
              selected={dueDate}
              onChange={date => setDueDate(date)}
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel htmlFor="balance-due">
              Balance Due:
            </InlineInputLabel>
            <InlineInputField
              type="number"
              name="balance-due"
              placeholder="Balance due"
              value={dueBanalce}
              onChange={e => setdueBanalce(e.target.value)}
            />
          </InputWrapper>
        </HalfWidthRight>
      </Row>

      <Row>
        <TableMain>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    {" "}
                    <input
                      name="name"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      name="quantity"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      name="rate"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      name="amount"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </td>

                  <td>
                    <button onClick={e => handleRemoveItem(e, i)}>X</button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td>
                <button onClick={e => handleAddItem(e)}>+ Line Item</button>
              </td>
            </tr>
          </tbody>
        </TableMain>
      </Row>

      <SubmitRow>
        <SubmitButton onClick={e => handleSubmit()}>Submit</SubmitButton>
        {submit && <Link
          className={'show_pdf'}
          target="_blank"
          to={{
            pathname: "/pdf"
          }}
        >
          <span>Show PDF</span>
        </Link>}
        
      </SubmitRow>
    </Wrapper>
  );
};

export default CreateInvoice;
