import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const PDFDisplay = (props) => {
  console.log({props});

    // return(
    //   <PDFViewer style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%' }}>

    //   { console.log("props", props) }
    //   <MyDocument />
    // </PDFViewer>
    // )

    return <div></div>
}

export default PDFDisplay;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// // Create Document Component
const MyDocument = (props) => {
  console.log(props);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}