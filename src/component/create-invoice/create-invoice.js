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

  // let finalData = {
  //   logo: logo,
  //   formData: formData,
  //   invoice: invoice,
  //   invoiceDate: invoiceDate,
  //   createdDate: createdDate,
  //   dueDate: dueDate,
  //   dueBanalce: dueBanalce,
  //   items: items
  // };

  return (
    <Wrapper>
      <div className="header">
        <Row>
          <HalfWidthLeft>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              singleImage={true}
              onChange={picture => onDrop(picture)}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={2048}
            />
          </HalfWidthLeft>

          <HalfWidthRight>
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
          </HalfWidthRight>
        </Row>
      </div>


      <div className="body">
        <Row>
          <HalfWidthLeft>
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
          </HalfWidthLeft>

          <HalfWidthRight>
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
          </HalfWidthRight>
          </Row>
      </div>

      <div className="info-and-numbers">
          <Row>
          <InputWrapper>
            <InlineInputLabel>Voucher No:</InlineInputLabel>
            <InputField type="text" />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Transaction Date:</InlineInputLabel>
            <InputField type="text" />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Due Date:</InlineInputLabel>
            <InputField type="text" />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Created At:</InlineInputLabel>
            <InputField type="text" />
          </InputWrapper>
          </Row>
      </div>

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
        {submit && (
          <Link
            className={"show_pdf"}
            target="_blank"
            to={{
              pathname: "/pdf"
            }}
          >
            <span>Show PDF</span>
          </Link>
        )}
      </SubmitRow>
    </Wrapper>
  );
};

export default CreateInvoice;
