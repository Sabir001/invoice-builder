import React from "react";

import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell
} from "@david.kucsai/react-pdf-table";

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: "#fff"
  },
  Mainheader: {
    backgroundColor: "#485195",
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "100px",
    justifyContent: "space-between"
  },
  Image: {
    width: "100px",
    height: "50px",
    margin: "auto",
    marginLeft: "20px",
    textAlign: "left",
    verticalAlign: "middle",
    backgroundColor: "grey"
  },
  ImageDiv: {
    // padding: "20px",
    width: "50%"
  },
  Invoice: {
    color: "#fffef5",
    fontweight: "bold",
    margin: "auto",
    textAlign: "center",
    width: "50%",
    verticalAlign: "middle"
  },
  BodyHead: {
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "200px",
    margin: "20px"
  },
  VoucherInfo: {
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "30px",
    margin: "20px"
  },
  FromDiv: {
    height: "100%",
    textAlign: "left",
    width: "47%",
    marginRight: "3%",
  },

  toDiv: {
    backgroundColor: "#eff2fa",
    minHeight: "10px",
    padding: "10px",
    marginTop: "10px",
    boxSizing: "border-box",
  },

  Row4: {
    width: "25%"
  },

  Row5: {
    width: "20%"
  },
  FromAddress: {
    width: "100%",
    maxHeight: "120px",
    boxSizing: "border-box",
    border: "0",
    borderRadius: "5px",
    padding: "12px 20px",
    color: "#485195"
  }
});

const invoiceValues = {
  logo: "https://localhost/images/logo",
  invoice_no: "fdalfhahfdafddf",
  from:
    "name : X Company \naddress : X Company city : X Company country : X Company",
  to:
    "name : X Company address : X Company city : X Company country : X Company",
  voucher_no: "121354",
  transaction_date: "23-02-2020",
  due_date: "23-02-2020",
  createdAt: "23-02-2020",
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
const MyDocument = () => (
  <PDFViewer
    style={{
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%"
    }}
  >
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.Mainheader}>
          <View style={styles.ImageDiv}>
            <Image
              style={styles.Image}
              src="https://pixabay.com/illustrations/head-the-dummy-avatar-man-tie-659652/"
            />
          </View>

          <View style={styles.Invoice}>
            <Text>Invoice No: #0000000000</Text>
          </View>
        </View>

        <View style={styles.BodyHead}>
          <View style={styles.FromDiv}>
            <Text sty={{ fontweight: "bold", color: "#42486a" }}>From</Text>
            <Text style={styles.toDiv}>{invoiceValues.from}</Text>
          </View>

          <View style={styles.FromDiv}>
            <Text>TO</Text>
            <Text style={styles.toDiv}>{invoiceValues.to}</Text>
          </View>
        </View>

        <View style={styles.VoucherInfo}>
          <View style={styles.Row4}>
            <Text sty={{ fontweight: "bold", color: "#42486a" }}>
              Voucher No
            </Text>
            <Text style={styles.toDiv}>{invoiceValues.voucher_no}</Text>
          </View>

          <View style={styles.Row4}>
            <Text>Transaction Date</Text>
            <Text style={styles.toDiv}>{invoiceValues.transaction_date}</Text>
          </View>
          <View style={styles.Row4}>
            <Text sty={{ fontweight: "bold", color: "#42486a" }}>Due Date</Text>
            <Text style={styles.toDiv}>{invoiceValues.due_date}</Text>
          </View>

          <View style={styles.Row4}>
            <Text>Created Date</Text>
            <Text style={styles.toDiv}>{invoiceValues.createdAt}</Text>
          </View>
        </View>

        <Table data={invoiceValues.items}>
          <TableHeader>
            <TableCell>No</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Amount</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell getContent={r => r.serial_number} />
            <DataTableCell getContent={r => r.product} />
            <DataTableCell getContent={r => r.unit_price} />
            <DataTableCell getContent={r => r.quantity} />
            <DataTableCell getContent={r => r.Amount} />
          </TableBody>
        </Table>
        <View style={{ alignItems: "flex-end" }}>
          <Text>Sub Total: {invoiceValues.sub_totoal}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text>
            Discount: {invoiceValues.discount.type} ->{" "}
            {invoiceValues.discount.amount}
          </Text>
        </View>
        <Table
          data={invoiceValues.taxes}
          style={{ width: "50px", alignItems: "flex-end" }}
        >
          <TableBody>
            <TableCell>Taxes</TableCell>
            <DataTableCell getContent={r => r} />
          </TableBody>
        </Table>
        {invoiceValues.footer_data.length > 0 && (
          <View style={styles.BodyHead}>
            <Text>{invoiceValues.footer_data.title}</Text>
            <Text>{invoiceValues.footer_data.content}</Text>
          </View>
        )}
      </Page>
    </Document>
  </PDFViewer>
);

export default MyDocument;
