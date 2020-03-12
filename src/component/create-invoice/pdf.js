import React from "react";
import moment from "moment";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

const PDFDisplay = () => {
  return (
    <PDFViewer
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%"
      }}
    >
      {console.log("props", localStorage.getItem("billFrom"))}
      <MyDocument />
    </PDFViewer>
  );
};

export default PDFDisplay;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const invoiceValues = {
  logo: "https://localhost/images/logo",
  invoice_no: "fdalfhahfdafddf",
  from:
    "name : X Company address : X Company city : X Company country : X Company",
  to:
    "name : X Company address : X Company city : X Company country : X Company",
  voucher_no: "",
  transaction_date: "",
  due_date: "",
  createdAt: "",
  items: [
    {
      serial_number: "01",
      product: "NX",
      unit_price: "$5",
      quantity: "2",
      Amount: "$10"
    },
    {
      serial_number: "01",
      product: "NX",
      unit_price: "$5",
      quantity: "2",
      Amount: "$10"
    },
    {
      serial_number: "01",
      product: "NX",
      unit_price: "$5",
      quantity: "2",
      Amount: "$10"
    }
  ],
  sub_totoal: "30",
  discount: {
    type: "amount",
    amount: "10"
  },
  taxes: [".3", ".5", ".2"],
  total: "400",
  footer_data: {
    title: "Terms and Conditions",
    content: "blah blah blah"
  }
};

// Create Document Component
const MyDocument = () => {
  console.log("hi");
  console.log(invoiceValues);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Bill From: {localStorage.getItem("billFrom")}</Text>
          <Text>Bill To: {localStorage.getItem("billTo")}</Text>
        </View>
        <View style={styles.section}>
          <Text>Invoice No: {localStorage.getItem("invoice_no")}</Text>
          <Text>
            Invoice Date:{" "}
            {moment(localStorage.getItem("invoiceDate")).format("DD-MM-YYYY")}
          </Text>
          <Text>
            Due Date:{" "}
            {moment(localStorage.getItem("dueDate")).format("DD-MM-YYYY")}
          </Text>
          <Text>Invoice Terms: {localStorage.getItem("terms")}</Text>
          <Text>Due Balance: {localStorage.getItem("dueBanalce")}</Text>
          {console.log(invoiceValues.items)}
          {invoiceValues.items.map((item, key) => (
            <View key={key}>
              <Text>Serial Number {item.serial_number}</Text>
              <Text>Product {item.product}</Text>
              <Text>quantity {item.quantity}</Text>
              <Text>Amount {item.Amount}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
