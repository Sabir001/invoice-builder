import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Wrapper,
  Row,
  HeaderFull,
  Container,
  HalfWidthLeft,
  HalfWidthRight,
  MainBody,
  InputField,
  InputWrapper,
  InputLabel,
  TextareaField,
  InlineInputLabel,
  InlineInputField,
  TableMain,
  Discounts,
  SubmitRow,
  SubmitButton
} from "../../style/create-style";
import styled from "styled-components";

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
      amount: 0
    }
  ]);

  const [subTotal, updateSubTotal] = useState(0);

  const [discount, updateDiscount] = useState({
    type: "amount",
    discountAmount: 0
  });

  const [taxes, updateTax] = useState([{ type: undefined, tax_percentage: 0 }]);
  const [totalTax, updateTotalTax] = useState(0);

  const [footerData, updateFooterData] = useState({
    title: undefined,
    content: undefined
  });

  const [submit, setSubmit] = useState(false);

  const [totoal, updateTotal] = useState(0);

  function base64toBlob(base64Data, contentType) {
    contentType = contentType || "";
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  const handleSubmit = () => {
    console.log("Base64: ", logo);
    // console.log( base64toBlob(logo, "jpg/png") );

    localStorage.clear();
    localStorage.setItem("billFrom", billFrom);
    localStorage.setItem("billTo", billTo);
    localStorage.setItem("invoice_no", invoice);
    localStorage.setItem("invoiceDate", invoiceDate);
    localStorage.setItem("dueDate", dueDate);
    localStorage.setItem("terms", terms);
    localStorage.setItem("dueBanalce", dueBanalce);
    localStorage.setItem("items", items);
    localStorage.setItem("logo", logo);

    setSubmit(true);
  };

  const onDrop = logo => {
    console.log("Logo Object", logo);
    let file = logo[0];

    // const objectURL = window.URL.createObjectURL(file);
    // setLogo(objectURL);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogo(reader.result);
    };
  };

  const handleRemoveItem = (e, i) => {
    e.preventDefault();

    let newItems = items.filter((item, index) => i !== index);

    setItems(newItems);
  };

  const handleAddItem = e => {
    e.preventDefault();

    const newItem = {
      name: "",
      quantity: "",
      rate: "",
      amount: 0
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

  useEffect(() => {
    let subTotalState = items.reduce((prev, next) => {
      return (prev += parseInt(next.amount));
    }, 0);

    updateSubTotal(subTotalState);
  }, [items]);

  const handleDiscountType = e => {
    updateDiscount({ ...discount, ...{ type: e.target.value } });
  };

  const handleDiscount = e => {
    let value = e.target.value;

    if (value.substring((0, value.length - 1)) === "%") {
      value = value.substring(0, value.length - 1);
    }

    updateDiscount({ ...discount, ...{ discountAmount: value } });
  };

  // Handle discount part
  useEffect(() => {
    let newSubTotal;

    if (discount.type === "amount") {
      newSubTotal = subTotal - parseInt(discount.discountAmount);
    }

    if (discount.type === "percentage") {
      newSubTotal =
        subTotal - (subTotal / 100) * parseFloat(`.${discount.discountAmount}`);
    }

    updateTotal(newSubTotal);
  }, [discount]);

  // Handle Tax Part
  const handleMultipleTaxField = e => {
    e.preventDefault();
    let newTaxField = { type: undefined, tax_percentage: 0 };
    const taxFields = [...taxes, newTaxField];

    updateTax(taxFields);
  };

  const handleRemoveTax = (e, i) => {
    e.preventDefault();

    const newFields = taxes.filter((item, index) => i !== index);

    updateTax(newFields);
  };

  const handleTaxChange = (e, index) => {
    const newTaxes = [...taxes];
    newTaxes[index] = {
      ...taxes[index],
      [e.target.name]: e.target.value
    };

    updateTax(newTaxes);
  };

  useEffect(() => {
    let totalTax = taxes.reduce((prev, next) => {
      return (prev += parseInt(next.tax_percentage));
    }, 0);

    updateTotalTax(totalTax);
  }, [taxes]);

  // calculating total
  useEffect(() => {
    let updatedTotalWithTax = subTotal + (subTotal / 100) * totalTax;
    updateTotal(updatedTotalWithTax);
  }, [subTotal, totalTax]);

  //Handle Footer
  const handleFooter = e => {
    updateFooterData({
      ...footerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Wrapper>
      <HeaderFull>
        <Container>
          <Row>
            <HalfWidthLeft>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                singleImage={true}
                buttonText={""}
                withLabel={true}
                label={"Drop Your Logo"}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </HalfWidthLeft>

            <HalfWidthRight>
              <InputWrapper className={"invoice"}>
                <InputLabel>Invoice No</InputLabel>
                <InputField
                  type="number"
                  name="invoice-id"
                  placeholder="Add Invoice No"
                  value={invoice}
                  onChange={e => setinvoice(e.target.value)}
                />
              </InputWrapper>
            </HalfWidthRight>
          </Row>
        </Container>
      </HeaderFull>

      <MainBody>
        <Container>
          <Row>
            <HalfWidthLeft>
              <InputWrapper>
                <InputLabel>From</InputLabel>
                <TextareaField
                  name="bill_to"
                  onChange={e => setBillFrom(e.target.value)}
                  placeholder="Name: X Company"
                  value={billFrom}
                ></TextareaField>
              </InputWrapper>
            </HalfWidthLeft>

            <HalfWidthRight>
              <InputWrapper>
                <InputLabel>To</InputLabel>
                <TextareaField
                  name="bill_from"
                  onChange={e => setBillTo(e.target.value)}
                  placeholder="Name: Y Company"
                  value={billTo}
                ></TextareaField>
              </InputWrapper>
            </HalfWidthRight>
          </Row>

          <Row>
            <InputWrapper>
              <InputLabel>Voucher No:</InputLabel>
              <InputField type="text" />
            </InputWrapper>

            <InputWrapper>
              <InputLabel>Transaction Date:</InputLabel>
              <InputField type="text" />
            </InputWrapper>

            <InputWrapper>
              <InputLabel>Due Date:</InputLabel>
              <DatePicker
                showPopperArrow={false}
                selected={dueDate}
                onChange={date => setDueDate(date)}
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel>Created At:</InputLabel>
              <DatePicker
                showPopperArrow={false}
                selected={invoiceDate}
                onChange={date => setinvoiceDate(date)}
              />
            </InputWrapper>
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
                        <InputField
                          name="name"
                          type="text"
                          onChange={e => handleItemChange(e, i)}
                        />
                      </td>

                      <td>
                        {" "}
                        <InputField
                          name="quantity"
                          type="text"
                          onChange={e => handleItemChange(e, i)}
                        />
                      </td>

                      <td>
                        {" "}
                        <InputField
                          name="rate"
                          type="text"
                          onChange={e => handleItemChange(e, i)}
                        />
                      </td>

                      <td>
                        {" "}
                        <InputField
                          name="amount"
                          type="text"
                          onChange={e => handleItemChange(e, i)}
                          value={item.amount > 0 ? item.amount : 0}
                        />
                      </td>

                      <td>
                        <button onClick={e => handleRemoveItem(e, i)}>X</button>
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <td className={"add_items"} colSpan="3">
                    <button onClick={e => handleAddItem(e)}>+ Line Item</button>
                  </td>
                  <td className={"subtotal_label"}>
                    <div>Sub Total</div>
                  </td>
                  <td className={"subtotal_amount"}>
                    <div>{subTotal}</div>
                  </td>
                </tr>
              </tbody>
            </TableMain>
          </Row>

          <Row>
            <HalfWidthLeft></HalfWidthLeft>
            <HalfWidthRight>
              <div className="column-to-the-right">
                <Discounts className="discount-section">
                <InputLabel>Discount</InputLabel>
                  <select onChange={e => handleDiscountType(e)}>
                    <option value="amount">Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                  <InputField type="text" onChange={e => handleDiscount(e)} />
                </Discounts>

                <div className="taxes">
                  <div className="taxes-list">
                    {taxes.map((tax, index) => {
                      return (
                        <React.Fragment key={index}>
                          <InputField
                            type="text"
                            name="type"
                            placeholder="Tax Type"
                            onChange={e => handleTaxChange(e, index)}
                            value={tax.type}
                          />
                          <InputField
                            type="number"
                            name="tax_percentage"
                            placeholder="Tax Percentage"
                            onChange={e => handleTaxChange(e, index)}
                            value={
                              tax.tax_percentage > 0 ? tax.tax_percentage : ""
                            }
                          />
                          <button onClick={e => handleRemoveTax(e, index)}>
                            x
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <button onClick={e => handleMultipleTaxField(e)}>
                    + Add Tax
                  </button>
                </div>

                <div className="total-board">
                  Total: <span>${totoal}</span>
                </div>
              </div>
            </HalfWidthRight>
          </Row>

          <Row>
            <div className="footer">
              <div>
                <label>Title: </label>
                <input
                  type="text"
                  name="title"
                  onChange={e => handleFooter(e)}
                />
              </div>
              <div>
                <label>Content: </label>
                <textarea
                  placeholder="footer content"
                  name="content"
                  onChange={e => handleFooter(e)}
                ></textarea>
              </div>
            </div>
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
        </Container>
      </MainBody>
    </Wrapper>
  );
};

export default CreateInvoice;
