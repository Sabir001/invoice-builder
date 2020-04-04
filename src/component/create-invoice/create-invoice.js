import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CurrencyData from "../currency/currency";
import Select from "react-select";
import DateLogo from "../../assets/image/datepicker-icon.png";
// import ReactPDF from "@react-pdf/renderer";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PDFDisplay from "./pdf-design";

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
  TableMain,
  Discounts,
  SendButton,
  ActionButtons,
  TaxRow,
  FinalTotal,
  FooterRow,
  ShowError,
} from "../../style/create-style";

const CreateInvoice = () => {
  const [logo, setLogo] = useState("");
  const [hasLogo, setHasLogo] = useState(false);
  const [invoice, setinvoice] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billTo, setBillTo] = useState("");
  const [voucherNumber, setVoucherNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());

  const [items, setItems] = useState([
    { serial_number: 1, name: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  const [currency, setCurrency] = useState("USD"); //Currency

  const [subTotal, updateSubTotal] = useState(0); //Sub Total

  const [discount, updateDiscount] = useState({
    type: "fixed",
    discountAmount: 0,
    discountTotal: 0,
  });
  const [subTotalAfterDiscount, updateSubTotalAfterDiscount] = useState(0); //Sub Total After Discount

  const [taxes, updateTax] = useState([
    { type: undefined, tax_percentage: 0, total: 0 },
  ]);
  const [totalTax, updateTotalTax] = useState(0); //Total Tax

  const [totoal, updateTotal] = useState(0); //Total Amount #Final

  const [footerData, updateFooterData] = useState({
    title: undefined,
    content: undefined,
  });

  const [roundNumber, setRoundNumber] = useState("netRound"); //Number Type: Decimal or Round

  const [errors, setError] = useState({
    logo: "",
    invoiceNo: "",
    billFrom: "",
    billTo: "",
    createdDate: "",
    transactionDate: "",
    dueDate: "",
  });

  // Handle Currency
  const handleCurrency = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  // Handle Number Type
  const handleroundNumber = (selectedOption) => {
    setRoundNumber(selectedOption.value);
  };

  //Empty Validation Function
  const isEmpty = (value) => {
    if (!value) {
      value = 0;
    }
    if (value.length > 0) {
      return false;
    }
    return true;
  };

  //Function to Convert Number into Appropiate Number Type
  const handleNumber = (number) => {
    if (!number) {
      number = 0;
    }

    if (roundNumber === "round") {
      number = Math.floor(number);
    } else {
      number = parseFloat(number).toFixed(2);
    }
    return number;
  };

  //Preview Button Handle
  const handlePreview = (e) => {
    handleSave();
    window.open("/pdf");
  };

  //Save All Data
  const handleSave = (e) => {
    let errorNum = 0;
    if (isEmpty(logo)) {
      errorNum++;
      var logoError = ["Please Upload a Logo/ Brand Image"];
    }
    if (isEmpty(invoice)) {
      errorNum++;
      var InvoiceError = ["Please Write Invoice Number"];
    }
    if (isEmpty(billFrom)) {
      errorNum++;
      var billFromError = ["Please provide Billing Information"];
    }
    if (isEmpty(billTo)) {
      errorNum++;
      var billToError = ["Please provide Billing Information"];
    }

    setError({
      logo: logoError,
      invoiceNo: InvoiceError,
      billFrom: billFromError,
      billTo: billToError,
    });

    if (isEmpty(voucherNumber)) {
      setVoucherNumber("N/A");
    }

    console.log("Error Number", errorNum);
    localStorage.removeItem("InvoiceData");
    const finalData = {
      logo: logo,
      invoice_no: invoice,
      from: billFrom,
      to: billTo,
      voucher_no: voucherNumber,
      transaction_date: moment(transactionDate).format("MMMM DD, YYYY"),
      due_date: moment(dueDate).format("MMMM DD, YYYY"),
      createdAt: moment(createdAt).format("MMMM DD, YYYY"),
      items: items,
      sub_totoal: subTotal,
      sub_totoal_after_discount: subTotalAfterDiscount,
      discount: discount,
      taxes: taxes,
      total_tax: totalTax,
      total: totoal,
      footer_data: footerData,
      currency: currency,
    };
    localStorage.setItem("InvoiceData", JSON.stringify(finalData));
  };

  //Uploading Logo Handle
  const onDrop = (logo) => {
    let file = logo[0];

    let reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      setLogo(file ? reader.result : logo);
      setHasLogo(file ? true : false);
    };
  };

  console.log("Errors", errors);

  //Add Item on Items list
  const handleAddItem = (e) => {
    e.preventDefault();

    const newItem = {
      name: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    setItems([...items, newItem]);
  };

  //Remove Item from Items list
  const handleRemoveItem = (e, i) => {
    e.preventDefault();
    const newItems = items.filter((_, index) => i !== index);
    setItems(newItems);
  };

  ////Handle Change Item on Items list
  const handleItemChange = (e, index) => {
    const newItems = [...items];

    newItems[index].serial_number = index + 1;

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

      default:
        return false;
    }

    if (e.target.name === "rate" || e.target.name === "quantity") {
      let amount = newItems[index].rate * newItems[index].quantity;
      newItems[index].amount = handleNumber(amount);
    }

    setItems(newItems);
  };

  //Calculate Subtotal
  useEffect(() => {
    let subTotalState = items.reduce((prev, next) => {
      return parseFloat(prev) + parseFloat(next.amount);
    }, 0);
    updateSubTotal(handleNumber(subTotalState));
  }, [items, roundNumber]);

  //Function to Calculate Discount
  const calculateDiscount = (type, amount) => {
    let totalDiscount = 0;

    if (type === "fixed") {
      totalDiscount = amount;
    } else if (type === "percentage") {
      totalDiscount = subTotal * (amount / 100);
    }
    return handleNumber(totalDiscount);
  };

  //Handle Discount Type
  const handleDiscountType = (e) => {
    let total = calculateDiscount(e.target.value, discount.discountAmount);
    updateDiscount({
      ...discount,
      ...{ type: e.target.value, discountTotal: total },
    });
  };

  //Handle Discount Amount
  const handleDiscount = (e) => {
    let value = e.target.value;
    let total = calculateDiscount(discount.type, value);
    updateDiscount({
      ...discount,
      ...{ discountAmount: value, discountTotal: total },
    });
  };

  //Calculate Sub Total After Discount
  useEffect(() => {
    let total;
    total = calculateDiscount(discount.type, discount.discountAmount);
    updateDiscount({
      ...discount,
      ...{ discountTotal: total },
    });
  }, [subTotal, roundNumber]);

  //
  useEffect(() => {
    let total;

    total = subTotal - discount.discountTotal;
    updateSubTotalAfterDiscount(handleNumber(total));
  }, [discount, subTotal, roundNumber]);

  // Handle Tax Fields
  const handleMultipleTaxField = (e) => {
    e.preventDefault();
    let newTaxField = { type: undefined, tax_percentage: 0 };
    const taxFields = [...taxes, newTaxField];

    updateTax(taxFields);
  };

  //Handle Remove Tax Row
  const handleRemoveTax = (e, i) => {
    e.preventDefault();

    const newFields = taxes.filter((item, index) => i !== index);

    updateTax(newFields);
  };

  //Function to Calculate Tax Amount
  const calculateTax = (amount) => {
    let totalTax = subTotalAfterDiscount * (amount / 100);
    return handleNumber(totalTax);
  };

  //Handle Tax Change
  const handleTaxChange = (e, index) => {
    const taxData = [...taxes];
    taxData[index] = {
      ...taxes[index],
      [e.target.name]: e.target.value,
    };

    if (e.target.name === "tax_percentage") {
      taxData[index].total = calculateTax(taxData[index].tax_percentage);
    }

    updateTax(taxData);
  };

  // calculating Each Tax Item
  useEffect(() => {
    let taxArray = [];
    taxes.map((item, i) => {
      let itemTax = calculateTax(item.tax_percentage);
      taxArray[i] = {
        type: item.type,
        tax_percentage: item.tax_percentage,
        total: itemTax,
      };
    });
    updateTax(taxArray);
  }, [subTotalAfterDiscount, items, roundNumber]);

  //Calculate Total Tax
  useEffect(() => {
    let totalTax = taxes.reduce((prev, next) => {
      return parseFloat(prev) + parseFloat(next.total);
    }, 0);

    updateTotalTax(handleNumber(totalTax));
  }, [taxes, roundNumber]);

  // calculating Net total
  useEffect(() => {
    let updatedTotalWithTax =
      parseFloat(subTotalAfterDiscount) + parseFloat(totalTax);
    if (roundNumber === "round" || roundNumber === "netRound") {
      updatedTotalWithTax = Math.floor(updatedTotalWithTax);
    } else {
      updatedTotalWithTax = parseFloat(updatedTotalWithTax).toFixed(2);
    }

    updateTotal(updatedTotalWithTax);
  }, [subTotalAfterDiscount, totalTax, roundNumber]);

  //Handle Footer
  const handleFooter = (e) => {
    updateFooterData({
      ...footerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper className="wrapper">
      {/* Header Part */}
      <MainHeader>
        <Container>
          <Row className={"row"}>
            <ContentLeft>
              <InnerRow>
                <InputWrapper className="invoice_logo">
                  <ImageUploader
                    className={hasLogo ? "uploaded" : ""}
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
                  { !logo && errors.logo.length > 0 && (
                    <ShowError className="error">
                      <ul>
                        {errors.logo.map((error) => (
                          <li>{error}</li>
                        ))}
                      </ul>
                    </ShowError>
                  )}
                </InputWrapper>
                <InputWrapper className={"invoice"}>
                  <InputLabel>Invoice No</InputLabel>
                  <InputField
                    type="text"
                    name="invoice-id"
                    placeholder="Add Invoice No"
                    value={invoice}
                    onChange={(e) => setinvoice(e.target.value)}
                  />
                  { !invoice && errors.invoiceNo.length > 0 && (
                    <ShowError className="error">
                      <ul>
                        {errors.invoiceNo.map((error) => (
                          <li>{error}</li>
                        ))}
                      </ul>
                    </ShowError>
                  )}
                </InputWrapper>
              </InnerRow>
            </ContentLeft>

            <ContentRight className={"header_buttons"}>
              <SendButton>Send Invoice</SendButton>
              <ActionButtons>
                {/* <button onClick={e => handlePreview(e)}>Preview</button> */}
                <button onClick={(e) => handleSave(e)}>Save</button>
                <button onClick={(e) => handlePreview(e)}>Download</button>
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
                      name="bill_from"
                      onChange={(e) => setBillFrom(e.target.value)}
                      placeholder="Name: X Company"
                      value={billFrom}
                    ></TextareaField>
                    { !billFrom && errors.billFrom.length > 0 && (
                    <ShowError className="error">
                      <ul>
                        {errors.billFrom.map((error) => (
                          <li>{error}</li>
                        ))}
                      </ul>
                    </ShowError>
                  )}
                  </InputWrapper>
                </FormLeft>

                <FormRight>
                  <InputWrapper>
                    <InputLabel>To</InputLabel>
                    <TextareaField
                      name="bill_to"
                      onChange={(e) => setBillTo(e.target.value)}
                      placeholder="Name: Y Company"
                      value={billTo}
                    ></TextareaField>
                    { !billTo && errors.billTo.length > 0 && (
                    <ShowError className="error">
                      <ul>
                        {errors.billTo.map((error) => (
                          <li>{error}</li>
                        ))}
                      </ul>
                    </ShowError>
                  )}
                  </InputWrapper>
                </FormRight>
              </InnerRow>

              <InnerRow className={"infoform"}>
                <InputWrapper>
                  <InputLabel>Voucher No:</InputLabel>
                  <InputField
                    type="text"
                    placeholder="Voucher No"
                    value={voucherNumber}
                    onChange={(e) => setVoucherNumber(e.target.value)}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Created Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={true}
                    selected={createdAt}
                    onChange={(date) => setCreatedAt(date)}
                  />
                  <img className={"dateicon"} src={DateLogo} />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Transaction Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={false}
                    selected={transactionDate}
                    onChange={(date) => setTransactionDate(date)}
                  />
                  <img className={"dateicon"} src={DateLogo} />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Due Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={false}
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                  />
                  <img className={"dateicon"} src={DateLogo} />
                </InputWrapper>
              </InnerRow>

              <InnerRow>
                <TableMain>
                  <thead>
                    <tr>
                      <th>Serial No</th>
                      <th className="item_name">Item Name</th>
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

                          <td className="item_name">
                            <InputField
                              name="name"
                              type="text"
                              placeholder="Write Item Name"
                              onChange={(e) => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="rate"
                              type="text"
                              placeholder="0"
                              onChange={(e) => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="quantity"
                              type="text"
                              placeholder="1"
                              onChange={(e) => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <span>
                              {currency} {item.amount}
                            </span>
                            <button onClick={(e) => handleRemoveItem(e, i)}>
                              X
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td className={"add_items"} colSpan="2">
                        <button onClick={(e) => handleAddItem(e)}>
                          + Line Item
                        </button>
                      </td>
                      <td className={"subtotal_label"} colSpan="2">
                        <div>Sub Total</div>
                      </td>
                      <td className={"subtotal_amount"}>
                        <div>
                          {currency} {subTotal}
                        </div>
                      </td>
                    </tr>

                    <tr className="calculation">
                      <td className={"blank"} colSpan="2"></td>
                      <td className={"discount"} colSpan="2">
                        <Discounts>
                          <InputLabel>Discount</InputLabel>
                          <select onChange={(e) => handleDiscountType(e)}>
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                          </select>
                          <InputField
                            type="text"
                            placeholder={discount.discountAmount}
                            onChange={(e) => handleDiscount(e)}
                          />
                        </Discounts>
                      </td>
                      <td>
                        <InputLabel className="discount_amount">
                          <span>
                            {discount.discountAmount > 0 ? "-" : null}
                          </span>{" "}
                          {currency} {discount.discountTotal}
                        </InputLabel>
                      </td>
                    </tr>

                    {discount.discountTotal > 0 && (
                      <tr className="after_calc_subtotal calculation">
                        <td className={"blank"} colSpan="2"></td>
                        <td colSpan="2">
                          <InputLabel>Sub Total after Discount</InputLabel>
                        </td>
                        <td>
                          <InputLabel>
                            {currency} {subTotalAfterDiscount}
                          </InputLabel>
                        </td>
                      </tr>
                    )}

                    {taxes.map((tax, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="tax calculation">
                            <td className={"blank"} colSpan="2"></td>
                            <td className={"tax"} colSpan="2">
                              <TaxRow>
                                <InputField
                                  className="tax_type"
                                  placeholder="Name of The Tax"
                                  type="text"
                                  name="type"
                                  onChange={(e) => handleTaxChange(e, index)}
                                  value={tax.type}
                                />

                                <InputField
                                  type="number"
                                  name="tax_percentage"
                                  placeholder="Amount (%)"
                                  onChange={(e) => handleTaxChange(e, index)}
                                  value={
                                    tax.tax_percentage > 0
                                      ? tax.tax_percentage
                                      : ""
                                  }
                                  className="tax_amount"
                                />
                              </TaxRow>
                            </td>
                            <td>
                              <InputLabel className="tax_amount">
                                {currency} {tax.total}
                                <button
                                  onClick={(e) => handleRemoveTax(e, index)}
                                >
                                  X
                                </button>
                              </InputLabel>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}

                    <tr className="add_tax_calc calculation">
                      <td className={"blank"} colSpan="2"></td>
                      <td className={"add_tax"} colSpan="3">
                        <button onClick={(e) => handleMultipleTaxField(e)}>
                          <span>+</span> Add Tax
                        </button>
                      </td>
                    </tr>

                    {totalTax > 0 && (
                      <tr className="after_calc_subtotal calculation">
                        <td className={"blank"} colSpan="2"></td>
                        <td colSpan="2">
                          <InputLabel>Total Tax Amount</InputLabel>
                        </td>
                        <td>
                          <InputLabel>
                            {currency} {totalTax}
                          </InputLabel>
                        </td>
                      </tr>
                    )}

                    <tr className="net_total calculation">
                      <td className={"blank"} colSpan="2"></td>
                      <td className={"summary"} colSpan="3">
                        <FinalTotal>
                          <InputLabel>Net Total</InputLabel>
                          <InputLabel>
                            {currency} {totoal}
                          </InputLabel>
                        </FinalTotal>
                      </td>
                    </tr>
                  </tbody>
                </TableMain>
              </InnerRow>

              <AdditionalRow>
                <InputWrapper>
                  <InputLabel>Additional Info (Optional)</InputLabel>
                  <InputField
                    name="title"
                    onChange={(e) => handleFooter(e)}
                    placeholder="Title"
                  />

                  <TextareaField
                    name="content"
                    onChange={(e) => setBillFrom(e.target.value)}
                    placeholder="Additional Info"
                    onChange={(e) => handleFooter(e)}
                  ></TextareaField>
                </InputWrapper>
              </AdditionalRow>

              <FooterRow></FooterRow>
            </ContentLeft>

            <ContentRight className={"bodySideControls"}>
              <InputWrapper>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  placeholder={currency}
                  onChange={(e) => handleCurrency(e)}
                  options={CurrencyData.map((item) => {
                    return {
                      value: item.cc,
                      label: item.name,
                    };
                  })}
                />
              </InputWrapper>

              <InputWrapper>
                <InputLabel>Number Type</InputLabel>
                <Select
                  placeholder={"Round Net Total"}
                  onChange={(e) => handleroundNumber(e)}
                  options={[
                    { value: "netRound", label: "Round Net Total" },
                    { value: "round", label: "Round Each Amount" },
                    { value: "decimal", label: "Decimal (00.00)" },
                  ]}
                />
              </InputWrapper>
            </ContentRight>
          </Row>
        </Container>
      </MainBody>
    </Wrapper>
  );
};

export default CreateInvoice;
