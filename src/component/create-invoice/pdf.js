import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
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
      {console.log("props", localStorage.getItem("items"))}
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
    flexGrow: 1,
  },
  image: {
    width: "60px",
    padding: 0,
    backgroundColor: "grey"
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.image} debug={true} src={localStorage.getItem("logo")} />
        <Text>Bill From: {localStorage.getItem("billFrom")}</Text>
        <Text>Bill To: {localStorage.getItem("billTo")}</Text>
      </View>
      <View style={styles.section}>
        <Text>Invoice No: {localStorage.getItem("invoice_no")}</Text>
        <Text>Invoice Date: {localStorage.getItem("invoiceDate")}</Text>
        <Text>Due Date: {localStorage.getItem("dueDate")}</Text>
        <Text>Invoice Terms: {localStorage.getItem("terms")}</Text>
        <Text>Due Balance: {localStorage.getItem("dueBanalce")}</Text>
      </View>
    </Page>
  </Document>
);
