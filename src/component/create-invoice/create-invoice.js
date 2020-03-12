import React, { useState, useEffect } from "react";
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
  Discounts,
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

  const onDrop = picture => {
    setLogo(picture);
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
    // console.log(totalTax);
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
              <td colSpan="3">
                <button onClick={e => handleAddItem(e)}>+ Line Item</button>
              </td>
              <td>
                <div className="sub-total">Sub Total: {subTotal}</div>
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
              <div className="title">Discount: </div>
              <select onChange={e => handleDiscountType(e)}>
                <option value="amount">Amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input type="text" onChange={e => handleDiscount(e)} />
            </Discounts>

            <div className="taxes">
              <div className="taxes-list">
                {taxes.map((tax, index) => {
                  return (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        name="type"
                        placeholder="Tax Type"
                        onChange={e => handleTaxChange(e, index)}
                        value={tax.type}
                      />
                      <input
                        type="number"
                        name="tax_percentage"
                        placeholder="Tax Percentage"
                        onChange={e => handleTaxChange(e, index)}
                        value={tax.tax_percentage > 0 ? tax.tax_percentage : ""}
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
            <input type="text" name="title" onChange={e => handleFooter(e)} />
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
    </Wrapper>
  );
};

export default CreateInvoice;
