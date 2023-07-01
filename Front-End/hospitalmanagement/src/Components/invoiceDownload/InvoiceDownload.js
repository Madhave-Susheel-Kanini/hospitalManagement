import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    color: 'black',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: '100%',
    height: '100vh',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 14,
  },
  address: {
    fontSize: 12,
  },
  generalInfoHeading: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 11,
    marginBottom: 5,
  },
  table: {
    marginTop: 1,
    border: '1px solid #000',
    borderRadius: '5px',
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: '8px 10px',
    fontSize: 12,
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
  },
  alternateCell: {
    backgroundColor: '#f1f1f1',
  },
});

function InvoiceDownload() {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.hospitalName}>Saragunasukar Hospital</Text>
                <Text style={styles.address}>Dolakpur, Chotta Bheem, Pogo</Text>
              </View>
              <Text style={styles.invoiceNumber}>Invoice #001</Text>
              <hr />
            </View>

            <View style={styles.section}>
              <Text style={styles.generalInfoHeading}>GENERAL INFORMATION:</Text>
              <Text style={styles.infoLabel}>Customer Name: John Doe</Text>
              <Text style={styles.infoLabel}>Phone Number: 123-456-7890</Text>
              <Text style={styles.infoLabel}>Email: johndoe@example.com</Text>
              <Text style={styles.infoLabel}>Date: June 30, 2023</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.generalInfoHeading}>Invoice Details</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCell}>Serial Number</Text>
                  <Text style={styles.tableCell}>Service</Text>
                  <Text style={styles.tableCell}>Price</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>1</Text>
                  <Text style={styles.tableCell}>Service 1</Text>
                  <Text style={styles.tableCell}>$100.00</Text>
                </View>
                <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.alternateCell]}>2</Text>
                <Text style={[styles.tableCell, styles.alternateCell]}>Service 2</Text>
                <Text style={[styles.tableCell, styles.alternateCell]}>$50.00</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>2</Text>
                  <Text style={styles.tableCell}>Service 2</Text>
                  <Text style={styles.tableCell}>$50.00</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default InvoiceDownload;
