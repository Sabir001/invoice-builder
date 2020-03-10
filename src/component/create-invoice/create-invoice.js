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
  TableInputField,
  TableMain,
  TableTH,
  TableBody,
  TableHead,
  TableRow,
  TableTD,
  SubmitRow,
  SubmitButton
} from "../../style/create-style";

const CreateInvoice = () => {
  const [logo, setLogo] = useState("wxww");
  const [formData, updateFormData] = useState();

  const [invoice, setinvoice] = useState("");
  const [invoiceDate, setinvoiceDate] = useState(new Date());
  const [createdDate, setCreatedDate] = useState(new Date());

  const [dueDate, setdueDate] = useState(new Date());
  const [dueBanalce, setdueBanalce] = useState(0);

  const [submit, setSubmit] = useState(false);

  const [items, setItems] = useState([
    {
      name: "",
      quantity: "",
      rate: "",
      amount: ""
    }
  ]);

  const handleBillFrom = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              onChange={e => handleBillFrom(e)}
              placeholder="Who is this Invoice from?"
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Bill To:</InlineInputLabel>
            <InputField
              type="text"
              name="bill_from"
              onChange={e => handleBillFrom(e)}
              placeholder="Who is this Invoice to?"
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
            <InlineInputLabel htmlFor="due-date">Due Date:</InlineInputLabel>
            <DatePicker
              showPopperArrow={false}
              selected={dueDate}
              onChange={date => setdueDate(date)}
            />
          </InputWrapper>
          <InputWrapper>
            <InlineInputLabel htmlFor="due-date">
              Created Date:
            </InlineInputLabel>
            <DatePicker
              showPopperArrow={false}
              selected={createdDate}
              onChange={date => setCreatedDate(date)}
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
          <TableHead>
            <TableRow>
              <TableTH>Item Name</TableTH>
              <TableTH>Quantity</TableTH>
              <TableTH>Rate</TableTH>
              <TableTH>Amount</TableTH>
              <TableTH>Delete</TableTH>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableTD>
                    {" "}
                    <TableInputField
                      name="name"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </TableTD>

                  <TableTD>
                    {" "}
                    <TableInputField
                      name="quantity"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </TableTD>

                  <TableTD>
                    {" "}
                    <TableInputField
                      name="rate"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </TableTD>

                  <TableTD>
                    {" "}
                    <TableInputField
                      name="amount"
                      type="text"
                      onChange={e => handleItemChange(e, i)}
                    />
                  </TableTD>

                  <TableTD>
                    <button onClick={e => handleRemoveItem(e, i)}>X</button>
                  </TableTD>
                </TableRow>
              );
            })}
            <TableRow>
              <TableTD>
                <button onClick={e => handleAddItem(e)}>+ Line Item</button>
              </TableTD>
            </TableRow>
          </TableBody>

          {console.log(items)}
        </TableMain>
      </Row>

      <SubmitRow>
        <SubmitButton onClick={e => setSubmit(true)}>Submit</SubmitButton>
        <Link
          target="_blank"
          to={{
            pathname: "/pdf",
            state: {
              test: "logo"
            }
          }}
        >
          <span>Preview PDF</span>
        </Link>
      </SubmitRow>
    </Wrapper>
  );
};

export default CreateInvoice;
