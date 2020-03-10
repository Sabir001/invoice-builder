import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Link } from "react-router-dom";

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
  TableHead,
  TableRow,
  TableTD
} from "../../style/create-style";

const CreateInvoice = () => {
  const [logo, setLogo] = useState("wxww");
  const [formData, updateFormData] = useState();

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

        <HalfWidthRight>
          <InvoiceTitle>Invoice</InvoiceTitle>

          <InputWrapper>
            <InlineInputLabel>Invoice No:</InlineInputLabel>
            <InlineInputField
              type="text"
              name="invoice_no"
              onChange={e => handleBillFrom(e)}
              placeholder="ARC0001001"
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Date:</InlineInputLabel>
            <InlineInputField
              type="text"
              name="date"
              onChange={e => handleBillFrom(e)}
              placeholder="21/03/2020"
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Payment Terms:</InlineInputLabel>
            <InlineInputField
              type="text"
              name="payment_terms"
              onChange={e => handleBillFrom(e)}
              placeholder="Payment Terms"
            />
          </InputWrapper>

          <InputWrapper>
            <InlineInputLabel>Due Date:</InlineInputLabel>
            <InlineInputField
              type="text"
              name="due_date"
              onChange={e => handleBillFrom(e)}
              placeholder="21/03/2020"
            />
          </InputWrapper>
        </HalfWidthRight>
      </Row>

      <Row>
        <TableMain>
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
                <button onClick={e => handleRemoveItem(e, i)}>X</button>
              </TableRow>
            );
          })}
          <button onClick={e => handleAddItem(e)}>+ Line Item</button>

          {console.log(items)}
        </TableMain>
      </Row>

      <Row>
        {console.log(logo)}
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
      </Row>
    </Wrapper>
  );
};

export default CreateInvoice;
