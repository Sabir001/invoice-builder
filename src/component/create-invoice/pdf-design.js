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

const invoiceValues = {
  logo: "https://localhost/images/logo",
  invoice_no: "fdalfhahfdafddf",
  from:
    "name : X Company address : X Company city : X Company country : X Company",
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
    maxHeight: "120px",
    minHeight: "50px",
    margin: "20px"
  },
  Title: {
    fontSize: "14",
    fontweight: "900",
    color: "#42486a"
  },
  AddressBlock: {
    textAlign: "left",
    width: "45%",
    marginRight: "5%"
  },

  AddressValue: {
    backgroundColor: "#eff2fa",
    marginTop: "5%",
    minHeight: "10px",
    padding: "10px",
    borderRadius: "5",
    fontSize: "12"
  },

  VoucherInfo: {
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "50px",
    margin: "20px"
  },
<<<<<<< HEAD

  ColumnFour: {
    width: "22%",
    marginRight: "3%"
  },

  TableView: {
    margin: "20px",
    width: "90%"
  },
  TableCell: {
    padding: "5px",
    fontSize: "12"
  },

  InvoiceSummary: {
    marginRight: "30px",
    marginBottom: "5px",
    alignItems: "flex-end"
=======
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
>>>>>>> 4085ab33680dd61d2793aa89ac93ef2181c5c200
  },

  InvoiceTax: {
    marginLeft: "auto",
    marginRight: "30px",
    marginBottom: "5px",
    marginTop: "10px",
    alignItems: "flex-end",
    width: "50%",
    borderTop: "1"
  },
  TaxTableCell: {
    padding: "5px",
    fontSize: "12",
  },

  FinalTotal: {    
    backgroundColor: "#485195",
    padding: "10px",
    marginTop: "10px",
    textAlign: "right",
    width: "50%",
    fontSize: "14",
    color: "#fff",
    borderRadius: "5"
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

<<<<<<< HEAD
=======
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

>>>>>>> 4085ab33680dd61d2793aa89ac93ef2181c5c200
// Create Document Component
const PDFDisplay = () => (
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
              src="https://de-professionals.nl/wp-content/uploads/2017/10/logo-dummy.png"
            />
          </View>

          <View style={styles.Invoice}>
            <Text>Invoice No: #0000000000</Text>
          </View>
        </View>

        <View style={styles.BodyHead}>
          <View style={styles.AddressBlock}>
            <Text style={styles.Title}>From</Text>
            <Text style={styles.AddressValue}>{invoiceValues.from}</Text>
          </View>

          <View style={styles.AddressBlock}>
            <Text style={styles.Title}>TO</Text>
            <Text style={styles.AddressValue}>{invoiceValues.to}</Text>
          </View>
        </View>

        <View style={styles.VoucherInfo}>
          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Voucher No</Text>
            <Text style={styles.AddressValue}>{invoiceValues.voucher_no}</Text>
          </View>

          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Transaction Date</Text>
            <Text style={styles.AddressValue}>
              {invoiceValues.transaction_date}
            </Text>
          </View>
          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Due Date</Text>
            <Text style={styles.AddressValue}>{invoiceValues.due_date}</Text>
          </View>

          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Created Date</Text>
            <Text style={styles.AddressValue}>{invoiceValues.createdAt}</Text>
          </View>
        </View>

        <View style={styles.TableView}>
          <Table data={invoiceValues.items}>
            <TableHeader>
              <TableCell style={styles.TableCell}>No</TableCell>
              <TableCell style={styles.TableCell}>Item Name</TableCell>
              <TableCell style={styles.TableCell}>Unit Price</TableCell>
              <TableCell style={styles.TableCell}>Quantity</TableCell>
              <TableCell style={styles.TableCell}>Amount</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.serial_number}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.product}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.unit_price}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.quantity}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.Amount}
              />
            </TableBody>
          </Table>
        </View>

        <View style={styles.InvoiceSummary}>
          <Text style={styles.Title}>
            Sub Total: {invoiceValues.sub_totoal}
          </Text>
        </View>
        <View style={styles.InvoiceSummary}>
          <Text style={styles.Title}>
            Discount: {invoiceValues.discount.type}:{" "}
            {invoiceValues.discount.amount}
          </Text>
        </View>

        <View style={styles.InvoiceTax}>
          <Table data={invoiceValues.taxes}>
            <TableBody style={styles.TaxTableBody}>
              <TableCell style={styles.TaxTableCell}>Taxes</TableCell>
              <DataTableCell style={styles.TaxTableCell} getContent={r => r} />
            </TableBody>
          </Table>
        </View>
        <View style={styles.InvoiceSummary}>
          <Text style={styles.FinalTotal}>
            Total: 100
          </Text>
        </View>

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

export default PDFDisplay;
