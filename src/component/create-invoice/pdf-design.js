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

// PDF styles
const styles = StyleSheet.create({
  page: {
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
    maxHeight: "100px",
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
  },

  FinalTotal: {
    backgroundColor: "#485195",
    padding: "10px",
    textAlign: "right",
    width: "50%",
    fontSize: "14",
    color: "#fff",
    borderRadius: "5"
  },
  FooterData: {
    margin: "20px",
    marginBottom: "5px",
    backgroundColor: "#eff2fa",
    padding: "20px",
    borderRadius: "5"
  },
  FooterDataTitle: {
    fontSize: "12",
    marginBottom: "10px"
  },
  FooterDataText: {
    fontSize: "11"
  },

  BottomLine: {
    height: "30px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "0",
    backgroundColor: "#485195"
  },
  Summary: {
    flexGrow: 1,
    flexDirection: "row",
    fontSize: "12",
    margin: "0px 20px",
  },
  SummaryLeft: {
    width: "50%"
  },
  SummaryRight: {
    width: "50%"
  },
  SummaryRightRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: "5px"
  },
  summeryTitle: {
    margin: "0 0 0 auto"
  },
  summeryAmount: {
    width: "100px",
    textAlign: "right"
  }
});

const data = localStorage.getItem("InvoiceData");
const invoiceData = JSON.parse(data);
console.log("invoiceData", invoiceData);

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
            { invoiceData.logo && (<Image style={styles.Image} src={invoiceData.logo} />) }            
          </View>

          <View style={styles.Invoice}>
            <Text>Invoice No: {invoiceData.invoice_no}</Text>
          </View>
        </View>

        <View style={styles.BodyHead}>
          <View style={styles.AddressBlock}>
            <Text style={styles.Title}>From</Text>
            <Text style={styles.AddressValue}>{invoiceData.from}</Text>
          </View>

          <View style={styles.AddressBlock}>
            <Text style={styles.Title}>TO</Text>
            <Text style={styles.AddressValue}>{invoiceData.to}</Text>
          </View>
        </View>

        <View style={styles.VoucherInfo}>
          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Voucher No</Text>
            <Text style={styles.AddressValue}>{invoiceData.voucher_no}</Text>
          </View>

          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Transaction Date</Text>
            <Text style={styles.AddressValue}>
              {invoiceData.transaction_date}
            </Text>
          </View>
          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Due Date</Text>
            <Text style={styles.AddressValue}>{invoiceData.due_date}</Text>
          </View>

          <View style={styles.ColumnFour}>
            <Text style={styles.Title}>Created Date</Text>
            <Text style={styles.AddressValue}>{invoiceData.createdAt}</Text>
          </View>
        </View>

        <View style={styles.TableView}>
          <Table data={invoiceData.items}>
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
                getContent={r => r.name}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.rate}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.quantity}
              />
              <DataTableCell
                style={styles.TableCell}
                getContent={r => r.amount}
              />
            </TableBody>
          </Table>
        </View>

        <View style={styles.Summary}>
          <View style={styles.SummaryLeft}></View>

          <View style={styles.SummaryRight}>
            <View style={styles.SummaryRightRow}>
              <Text style={styles.summeryTitle}>Sub Total</Text>
              <Text style={styles.summeryAmount}>
                {invoiceData.currency}
                {invoiceData.sub_totoal}
              </Text>
            </View>

            <View style={styles.SummaryRightRow}>
              <Text style={styles.summeryTitle}>
                Discount (
                {invoiceData.discount.type == "fixed"
                  ? "fixed"
                  : invoiceData.discount.type == "percentage"
                  ? invoiceData.discount.discountAmount + "%"
                  : "fixed"}
                )
              </Text>
              <Text style={styles.summeryAmount}>
                {invoiceData.currency}
                {invoiceData.discount.discountTotal}
              </Text>
            </View>

            {invoiceData.taxes.map((item, i) => {
              return (
                <View style={styles.SummaryRightRow}>
                  <Text style={styles.summeryTitle}>
                    {item.type} ({item.tax_percentage + "%"})
                  </Text>
                  <Text style={styles.summeryAmount}>
                    {invoiceData.currency}
                    {item.total}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.InvoiceSummary}>
          <Text style={styles.FinalTotal}>Total: {invoiceData.total}</Text>
        </View>

        <View style={styles.FooterData}>
          <Text style={styles.FooterDataTitle}>
            {invoiceData.footer_data.title}
          </Text>
          <Text style={styles.FooterDataText}>
            {invoiceData.footer_data.content}
          </Text>
        </View>

        <View style={styles.BottomLine}></View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFDisplay;
