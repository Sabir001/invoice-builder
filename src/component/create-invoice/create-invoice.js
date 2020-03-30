import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CurrencyData from "../currency/currency";
import Select from "react-select";
import DateLogo from "../../assets/image/datepicker-icon.png";

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
  FooterRow
} from "../../style/create-style";

const CreateInvoice = () => {
  const [logo, setLogo] = useState();
  const [hasLogo, setHasLogo] = useState(false);
  const [invoice, setinvoice] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billTo, setBillTo] = useState("");
  const [voucherNumber, setVoucherNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());
  const history = useHistory();

  const [items, setItems] = useState([
    { serial_number: 1, name: "", quantity: 1, rate: 0, amount: 0 }
  ]);

  const [currency, setCurrency] = useState("USD"); //Currency

  const [subTotal, updateSubTotal] = useState(0); //Sub Total

  const [discount, updateDiscount] = useState({
    type: "fixed",
    discountAmount: 0,
    discountTotal: 0
  });
  const [subTotalAfterDiscount, updateSubTotalAfterDiscount] = useState(0); //Sub Total After Discount

  const [taxes, updateTax] = useState([
    { type: undefined, tax_percentage: 0, total: 0 }
  ]);
  const [totalTax, updateTotalTax] = useState(0); //Total Tax

  const [totoal, updateTotal] = useState(0); //Total Amount #Final

  const [footerData, updateFooterData] = useState({
    title: undefined,
    content: undefined
  });

  const [numberType, setNumberType] = useState("round"); //Number Type: Decimal or Round

  // Handle Currency
  const handleCurrency = selectedOption => {
    setCurrency(selectedOption.value);
  };

  // Handle Number Type
  const handleNumberType = selectedOption => {
    setNumberType(selectedOption.value);
  };

  //Function to Convert Number into Appropiate Number Type
  const handleNumber = number => {
    // console.log(" - ",number);
    // if (numberType === "round") {
    //   number = Math.floor(number);
    // } else if (numberType === "decimal") {
    //   number = number.toFixed(2);
    // } else {
    //   number = number;
    // }
    return number;
  };

  //Preview Button Handle
  const handlePreview = e => {
    handleSave();
    window.open("/pdf");
  };

  //Save All Data
  const handleSave = e => {
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
      currency: currency
    };
    localStorage.setItem("InvoiceData", JSON.stringify(finalData));

    const data = localStorage.getItem("InvoiceData");
    const invoiceData = JSON.parse(data);
    console.log(invoiceData);
  };

  //Uploading Logo Handle
  const onDrop = logo => {
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

  //Add Item on Items list
  const handleAddItem = e => {
    e.preventDefault();

    const newItem = {
      name: "",
      quantity: 1,
      rate: 0,
      amount: 0
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
    }

    if (e.target.name == "rate" || e.target.name == "quantity") {
      newItems[index].amount = handleNumber(
        newItems[index].rate * newItems[index].quantity
      );
    }

    setItems(newItems);
  };

  //Calculate Subtotal
  useEffect(() => {
    let subTotalState = items.reduce((prev, next) => {
      return (prev += next.amount);
    }, 0);

    updateSubTotal(handleNumber(subTotalState));
  }, [items]);

  //Function to Calculate Discount
  const calculateDiscount = (type, amount) => {
    let totalDiscount = 0;

    if (type === "fixed") {
      totalDiscount = amount;
    } else if (type === "percentage") {
      totalDiscount = subTotal * (amount / 100);
    }
    return totalDiscount;
  };

  //Handle Discount Type
  const handleDiscountType = e => {
    let total = calculateDiscount(e.target.value, discount.discountAmount);
    updateDiscount({
      ...discount,
      ...{ type: e.target.value, discountTotal: total }
    });
  };

  //Handle Discount Amount
  const handleDiscount = e => {
    let value = e.target.value;
    let total = calculateDiscount(discount.type, value);
    updateDiscount({
      ...discount,
      ...{ discountAmount: value, discountTotal: total }
    });
  };

  //Calculate Sub Total After Discount
  useEffect(() => {
    let total;
    total = calculateDiscount(discount.type, discount.discountAmount);
    updateDiscount({
      ...discount,
      ...{ discountTotal: total }
    });
  }, [subTotal]);

  useEffect(() => {
    let total;

    total = subTotal - discount.discountTotal;
    updateSubTotalAfterDiscount(total);
  }, [discount, subTotal]);

  // Handle Tax Fields
  const handleMultipleTaxField = e => {
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
  const calculateTax = amount => {
    let totalTax = subTotalAfterDiscount * (amount / 100);
    return totalTax;
  };

  //Handle Tax Change
  const handleTaxChange = (e, index) => {
    const taxData = [...taxes];
    taxData[index] = {
      ...taxes[index],
      [e.target.name]: e.target.value
    };

    if (e.target.name == "tax_percentage") {
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
        total: itemTax
      };
    });
    updateTax(taxArray);
  }, [subTotalAfterDiscount, items]);

  //Calculate Total Tax
  useEffect(() => {
    let totalTax = taxes.reduce((prev, next) => {
      return (prev += next.total);
    }, 0);

    updateTotalTax(totalTax);
  }, [taxes]);

  // calculating Net total
  useEffect(() => {
    let updatedTotalWithTax = subTotalAfterDiscount + totalTax;
    updateTotal(updatedTotalWithTax);
  }, [subTotalAfterDiscount, totalTax]);

  //Handle Footer
  const handleFooter = e => {
    updateFooterData({
      ...footerData,
      [e.target.name]: e.target.value
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
                <InputWrapper className={"invoice"}>
                  <InputLabel>Invoice No</InputLabel>
                  <InputField
                    type="text"
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
                <button onClick={e => handlePreview(e)}>Preview</button>
                <button onClick={e => handleSave(e)}>Save</button>
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
                  <InputField
                    type="text"
                    placeholder="Voucher No"
                    value={voucherNumber}
                    onChange={e => setVoucherNumber(e.target.value)}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Created Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={true}
                    selected={createdAt}
                    onChange={date => setCreatedAt(date)}
                  />
                  <img className={"dateicon"} src={DateLogo} />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Transaction Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={false}
                    selected={transactionDate}
                    onChange={date => setTransactionDate(date)}
                  />
                  <img className={"dateicon"} src={DateLogo} />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Due Date:</InputLabel>
                  <DatePicker
                    showPopperArrow={false}
                    selected={dueDate}
                    onChange={date => setDueDate(date)}
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
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="rate"
                              type="text"
                              placeholder="0"
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <InputField
                              name="quantity"
                              type="text"
                              placeholder="1"
                              onChange={e => handleItemChange(e, i)}
                            />
                          </td>

                          <td>
                            <span>
                              {currency} {item.amount}
                            </span>
                            <button onClick={e => handleRemoveItem(e, i)}>
                              X
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td className={"add_items"} colSpan="2">
                        <button onClick={e => handleAddItem(e)}>
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
                          <select onChange={e => handleDiscountType(e)}>
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                          </select>
                          <InputField
                            type="text"
                            placeholder={discount.discountAmount}
                            onChange={e => handleDiscount(e)}
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
                                  onChange={e => handleTaxChange(e, index)}
                                  value={tax.type}
                                />

                                <InputField
                                  type="number"
                                  name="tax_percentage"
                                  placeholder="Amount (%)"
                                  onChange={e => handleTaxChange(e, index)}
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
                                  onClick={e => handleRemoveTax(e, index)}
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
                        <button onClick={e => handleMultipleTaxField(e)}>
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
                  <InputLabel>Additional Info</InputLabel>
                  <InputField
                    name="title"
                    onChange={e => handleFooter(e)}
                    placeholder="Title"
                  />

                  <TextareaField
                    name="content"
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
                <Select
                  value={currency}
                  placeholder={currency}
                  onChange={e => handleCurrency(e)}
                  options={CurrencyData.map(item => {
                    return {
                      value: item.cc,
                      label: item.name
                    };
                  })}
                />
              </InputWrapper>

              {/* <InputWrapper>
                <InputLabel>Number Type</InputLabel>
                <Select
                  placeholder={"round"}
                  onChange={e => handleNumberType(e)}
                  options={[
                    { value: "round", label: "Round (00)" },
                    { value: "decimal", label: "Decimal (00.00)" }
                  ]}
                />
              </InputWrapper> */}
            </ContentRight>
          </Row>
        </Container>
      </MainBody>
    </Wrapper>
  );
};

export default CreateInvoice;
