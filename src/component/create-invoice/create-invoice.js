import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
// import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Wrapper,
  Row,
  InnerRow,
  AdditionalRow,
  MainHeader,
  Container,
  ContentLeft,
  ContentRight,
  MainBody,
  FormLeft,
  FormRight,
  InputField,
  InputWrapper,
  InputLabel,
  TextareaField,
  // InlineInputLabel,
  // InlineInputField,
  TableMain,
  Discounts,
  // SubmitRow,
  SendButton,
  ActionButtons,
  // SubmitButton,
  TaxRow,
  FinalTotal,
  FooterRow
} from "../../style/create-style";
// import styled from "styled-components";

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
      quantity: 0,
      rate: 0,
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
    console.log("Logo Object", logo[0]);
    let file = logo[0];

    // const objectURL = window.URL.createObjectURL(file);
    // setLogo(objectURL);

    let reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      setLogo(file ? reader.result : logo);
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
      quantity: 0,
      rate: 0,
      amount: 0
    };

    setItems([...items, newItem]);
  };

  const handleItemChange = (e, index) => {
    const newItems = [...items];

    switch (e.target.name) {
      case "rate":
        newItems[index].rate = e.target.value;
        break;

      case "quantity":
        newItems[index].quantity = e.target.value;
        break;

      case "name":
        newItems[index].name = e.target.value;
        break;
    }

    if (e.target.name == "rate" || e.target.name == "quantity") {
      newItems[index].amount =
        parseInt(newItems[index].rate) * parseInt(newItems[index].quantity);
    }

    setItems(newItems);
  };

  useEffect(() => {
    let subTotalState = items.reduce((prev, next) => {
      return (prev += parseInt(next.amount));
    }, 0);

    updateSubTotal(subTotalState);
  }, [items]);

  // Handle Discount
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

  useEffect(() => {
    let newSubTotal;

    if (discount.type === "amount") {
      newSubTotal = subTotal - parseInt(discount.discountAmount);
    }

    if (discount.type === "percentage") {
      let discountInPercentage = subTotal * (discount.discountAmount / 100);
      newSubTotal = subTotal - discountInPercentage;
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
      {/* Header Part */}
      <MainHeader>
        <Container>
          <Row className={"row"}>
            <ContentLeft>
              <InnerRow>
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
              </InnerRow>
            </ContentLeft>

            <ContentRight className={"header_buttons"}>
              <SendButton>Send Invoice</SendButton>
              <ActionButtons>
                <button>Preview</button>
                <button onClick={e => handleSubmit()}>Save</button>
                <button>Download</button>
              </ActionButtons>
            </ContentRight>
          </Row>
        </Container>
      </MainHeader>

      {/* Body Part */}
      <MainBody>
        <Container>
          <Row>
            <ContentLeft>
              <InnerRow>
                <FormLeft>
                  <InputWrapper>
                    <InputLabel>From</InputLabel>
                    <TextareaField
                      name="bill_to"
                      onChange={e => setBillFrom(e.target.value)}
                      placeholder="Name: X Company"
                      value={billFrom}
                    ></TextareaField>
                  </InputWrapper>
                </FormLeft>

                <FormRight>
                  <InputWrapper>
                    <InputLabel>To</InputLabel>
                    <TextareaField
                      name="bill_from"
                      onChange={e => setBillTo(e.target.value)}
                      placeholder="Name: Y Company"
                      value={billTo}
                    ></TextareaField>
                  </InputWrapper>
                </FormRight>
              </InnerRow>

              <InnerRow className={"infoform"}>
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
              </InnerRow>

              <InnerRow>
                <TableMain>
                  <thead>
                    <tr>
                      <th>Serial No</th>
                      <th>Item Name</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>

                          <td>
                            <InputField
                              name="name"
                              type="text"
                              placeholder="Write Item Name"
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="quantity"
                              type="text"
                              placeholder="0"
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="rate"
                              type="text"
                              placeholder="1"
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <span> {item.amount} </span>
                            <button onClick={e => handleRemoveItem(e, i)}>
                              X
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td className={"add_items"} colSpan="3">
                        <button onClick={e => handleAddItem(e)}>
                          + Line Item
                        </button>
                      </td>
                      <td className={"subtotal_label"}>
                        <div>Sub Total</div>
                      </td>
                      <td className={"subtotal_amount"}>
                        <div>{subTotal}</div>
                      </td>
                    </tr>

                    <tr className="calculation">
                      <td className={"blank"} colSpan="3"></td>
                      <td className={"discount"} colSpan="2">
                        <Discounts>
                          <InputLabel>Discount</InputLabel>
                          <select onChange={e => handleDiscountType(e)}>
                            <option value="amount">Amount</option>
                            <option value="percentage">Percentage</option>
                          </select>
                          <InputField
                            type="text"
                            onChange={e => handleDiscount(e)}
                          />
                        </Discounts>
                      </td>
                    </tr>

                    {taxes.map((tax, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="calculation">
                            <td className={"blank"} colSpan="3"></td>
                            <td className={"tax"} colSpan="2">
                              <TaxRow>
                                <InputField
                                  className="tax_type"
                                  placeholder="Tax Type"
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
                                    tax.tax_percentage > 0
                                      ? tax.tax_percentage
                                      : ""
                                  }
                                  className="tax_amount"
                                />
                                <button
                                  onClick={e => handleRemoveTax(e, index)}
                                >
                                  X
                                </button>
                              </TaxRow>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}

                    <tr className="calculation">
                      <td className={"blank"} colSpan="3"></td>
                      <td className={"add_tax"} colSpan="2">
                        <button onClick={e => handleMultipleTaxField(e)}>
                          <span>+</span> Add Tax
                        </button>
                      </td>
                    </tr>

                    <tr className="calculation">
                      <td className={"blank"} colSpan="3"></td>
                      <td className={"summary"} colSpan="2">
                        <FinalTotal>
                          <InputLabel>Total</InputLabel>
                          <InputLabel>${totoal}</InputLabel>
                        </FinalTotal>
                      </td>
                    </tr>
                  </tbody>
                </TableMain>
              </InnerRow>

              <AdditionalRow>
                <InputWrapper>
                  <InputLabel>Additional Info</InputLabel>
                  <InputField
                    name="footer_title"
                    onChange={e => handleFooter(e)}
                    placeholder="Title"
                  />

                  <TextareaField
                    name="bill_to"
                    onChange={e => setBillFrom(e.target.value)}
                    placeholder="Additional Info"
                    onChange={e => handleFooter(e)}
                  ></TextareaField>
                </InputWrapper>
              </AdditionalRow>

              <FooterRow></FooterRow>
            </ContentLeft>

            <ContentRight className={"bodySideControls"}>
              <InputWrapper>
                <InputLabel>Currency</InputLabel>
                <select onChange={e => handleDiscountType(e)}>
                  <option value="amount">BDT</option>
                  <option value="percentage">USD</option>
                </select>
              </InputWrapper>
            </ContentRight>
          </Row>
        </Container>
      </MainBody>
    </Wrapper>
  );
};

export default CreateInvoice;
