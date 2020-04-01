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
    maxHeight: "90px",
    justifyContent: "space-between"
  },
  Image: {
    width: "auto",
    height: "60px",
    margin: "auto",
    marginLeft: "30px",
    textAlign: "left",
    verticalAlign: "middle",
  },
  ImageDiv: {
    width: "50%"
  },
  Invoice: {
    color: "#fffef5",
    fontweight: "bold",
    margin: "auto",
    marginRight: "30px",
    textAlign: "right",
    width: "50%",
    verticalAlign: "middle"
  },
  BodyHead: {
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "100px",
    minHeight: "50px",
    margin: "20px 30px"
  },
  Title: {
    fontSize: "14",
    fontweight: "900",
    color: "#42486a"
  },
  AddressBlock1: {
    textAlign: "left",
    width: "48%",
    marginRight: "2%"
  },
  AddressBlock2: {
    textAlign: "left",
    width: "48%",
    marginLeft: "2%"
  },

  AddressValue: {
    backgroundColor: "#eff2fa",
    marginTop: "5%",
    minHeight: "10px",
    padding: "10px 15px",
    borderRadius: "5",
    fontSize: "12"
  },

  VoucherInfo: {
    padding: "0",
    flexGrow: 1,
    flexDirection: "row",
    maxHeight: "50px",
    margin: "30px"
  },

  ColumnFour: {
    width: "22%",
    marginRight: "3%"
  },

  TableView: {
    margin: "10px 5%",
    width: "90%"
  },
  TableCell: {
    padding: "5px",
    fontSize: "12",
    width: "auto"
  },
  TableCellSerial: {
    padding: "5px",
    fontSize: "12",
    maxWidth: "50px"
  },
  TableCellDesc: {
    padding: "5px",
    fontSize: "12",
    minWidth: "150px"
  },

  Summary: {
    flexGrow: 1,
    flexDirection: "row",
    fontSize: "12",
    margin: "10px 30px",
    maxHeight: "180px,"
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
    marginBottom: "10px"
  },
  SummaryRightRowSub: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: "10px",
    borderTop: "1",
    paddingTop: "10px"
  },
  summeryTitle: {
    margin: "0 0 0 auto"
  },
  summeryAmount: {
    width: "100px",
    textAlign: "right"
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
    margin: "10px 30px",
    marginBottom: "5px",
    backgroundColor: "#eff2fa",
    padding: "15px",
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
  }
});

const data = localStorage.getItem("InvoiceData");
const invoiceData = JSON.parse(data);

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
            {invoiceData.logo && (
              <Image style={styles.Image} src={invoiceData.logo} />
            )}
          </View>

          <View style={styles.Invoice}>
            <Text>Invoice No: {invoiceData.invoice_no}</Text>
          </View>
        </View>

        <View style={styles.BodyHead}>
          <View style={styles.AddressBlock1}>
            <Text style={styles.Title}>From</Text>
            <Text style={styles.AddressValue}>{invoiceData.from}</Text>
          </View>

          <View style={styles.AddressBlock2}>
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
              <TableCell style={styles.TableCellSerial}>No</TableCell>
              <TableCell style={styles.TableCellDesc}>Item Name</TableCell>
              <TableCell style={styles.TableCell}>Unit Price</TableCell>
              <TableCell style={styles.TableCell}>Quantity</TableCell>
              <TableCell style={styles.TableCell}>Amount</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={styles.TableCellSerial}
                getContent={r => r.serial_number}
              />
              <DataTableCell
                style={styles.TableCellDesc}
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
                {invoiceData.currency} &nbsp;
                {invoiceData.sub_totoal}
              </Text>
            </View>

            {invoiceData.discount.discountAmount > 0 && (
              <View style={styles.SummaryRightRow}>
                <Text style={styles.summeryTitle}>
                  Discount (
                  {invoiceData.discount.type === "fixed"
                    ? "fixed"
                    : invoiceData.discount.type === "percentage"
                    ? invoiceData.discount.discountAmount + "%"
                    : "fixed"}
                  )
                </Text>
                <Text style={styles.summeryAmount}>
                  - {invoiceData.currency} &nbsp;
                  {invoiceData.discount.discountTotal}
                </Text>
              </View>
            )}

            {invoiceData.discount.discountAmount > 0 && (
              <View style={styles.SummaryRightRowSub}>
                <Text style={styles.summeryTitle}>
                  Sub Total after Discount
                </Text>
                <Text style={styles.summeryAmount}>
                  {invoiceData.currency} &nbsp;
                  {invoiceData.sub_totoal_after_discount}
                </Text>
              </View>
            )}

            {console.log("Tax", invoiceData.taxes)}
            {invoiceData.taxes.map((item, i) => {
              return (
                <React.Fragment>
                  {item.total > 0 && (
                    <View style={styles.SummaryRightRow}>
                      <Text style={styles.summeryTitle}>
                        {item.type} ({item.tax_percentage + "%"})
                      </Text>
                      <Text style={styles.summeryAmount}>
                        {invoiceData.currency} &nbsp;
                        {item.total}
                      </Text>
                    </View>
                  )}
                </React.Fragment>
              );
            })}

            {invoiceData.total_tax > 0 && (
              <View style={styles.SummaryRightRowSub}>
                <Text style={styles.summeryTitle}>Total Tax</Text>
                <Text style={styles.summeryAmount}>
                  {invoiceData.currency} &nbsp;
                  {invoiceData.total_tax}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.InvoiceSummary}>
          <Text style={styles.FinalTotal}>
            Net Total:&nbsp;&nbsp;&nbsp; {invoiceData.currency} &nbsp;
            {invoiceData.total}
          </Text>
        </View>

        {(invoiceData.footer_data.title || invoiceData.footer_data.content) && (
          <View style={styles.FooterData}>
            <Text style={styles.FooterDataTitle}>
              {invoiceData.footer_data.title}
            </Text>
            <Text style={styles.FooterDataText}>
              {invoiceData.footer_data.content}
            </Text>
          </View>
        )}

        <View style={styles.BottomLine}></View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFDisplay;
