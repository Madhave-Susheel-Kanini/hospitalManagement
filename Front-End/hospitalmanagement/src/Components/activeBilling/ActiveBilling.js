import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from './apollo-hospitals-logo.png'

function ActiveBilling() {

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            color: 'black',
        },
        hospitalName:{
            fontSize: '15px'
        },
        logo: {
            width: '50px',
            height: 'auto',
            marginBottom: '10px',
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
            fontSize: 10,
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

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Billings')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleViewInvoice = (id) => {
        setSelectedId(id);
        const selectedCustomer = getCustomerData(id);
        if (selectedCustomer) {
            console.log('Selected ID:', id);
            console.log('Selected Customer Name:', selectedCustomer.patientFirstName);
            console.log('Selected Customer Name:', selectedCustomer.service);
            console.log('Selected Customer Services:', selectedCustomer.service.split(','));
            // Add additional console logs for other properties if needed
        }
    };

    const getCustomerData = (id) => {
        return data.find((item) => item.id === id);
    };


    return (
        <div>
            <h2>PATIENT LIST</h2>
            <div className="card-container">
                {data.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-header">
                            <div className="card-header-item">
                                <span className="card-label">ID:</span>
                                <span>{item.id}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Name:</span>
                                <span>{item.patientFirstName}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Email:</span>
                                <span>{item.patientEmail}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-body-item">
                                <span className="card-label">Service:</span>
                                <span>{item.service}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Total:</span>
                                <span>{item.total}</span>
                            </div>
                        </div>
                        <div className="card-buttons">
                            <button className="approve-button" onClick={() => handleViewInvoice(item.id)}> View Invoice </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedId && (
                <PDFViewer style={styles.viewer}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <View>
                                    <Image style={styles.logo} src={logo} />
                                        <Text style={styles.hospitalName}>APOLLO HOSPITAL</Text>
                                        <Text style={styles.address}>Schezhwanton, Paris</Text>
                                        <Text style={styles.address}>Email: mail@apollohospitals.com</Text>
                                        <Text style={styles.address}>Website: www.apollohospitals.com</Text>
                                        <Text style={styles.address}>Fax: +102-182-210</Text>
                                        <Text style={styles.address}>Phone: +102-182-210</Text>
                                    </View>
                                    <Text style={styles.invoiceNumber}>Invoice #SNG00{getCustomerData(selectedId).id}</Text>
                                    <hr />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.generalInfoHeading}>GENERAL INFORMATION:</Text>
                                    {getCustomerData(selectedId) && (
                                        <View>
                                            <Text style={styles.infoLabel}>Customer Name: {getCustomerData(selectedId).patientFirstName}</Text>
                                            <Text style={styles.infoLabel}>Phone Number: {getCustomerData(selectedId).patientEmail}</Text>
                                            <Text style={styles.infoLabel}>Email: {getCustomerData(selectedId).patientEmail}</Text>
                                            <Text style={styles.infoLabel}>Date: June 30, 2023</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.generalInfoHeading}>Invoice Details</Text>
                                    <View style={styles.table}>
                                        <View style={styles.tableHeader}>
                                            <Text style={styles.tableCell}>Serial Number</Text>
                                            <Text style={styles.tableCell}>Service</Text>
                                            <Text style={styles.tableCell}>Price</Text>
                                        </View>
                                        {getCustomerData(selectedId) && getCustomerData(selectedId).service.split(',').map((service, index) => (
                                            <View key={index} style={styles.tableRow}>
                                                <Text style={styles.tableCell}>{index + 1}</Text>
                                                <Text style={styles.tableCell}>{service.trim()}</Text>
                                                <Text style={styles.tableCell}>Rs. 100.00</Text>
                                            </View>
                                        ))}
                                        <View style={styles.tableRow}>
                                            <Text style={[styles.tableCell, styles.alternateCell]}></Text>
                                            <Text style={[styles.tableCell, styles.alternateCell]}>Total</Text>
                                            <Text style={[styles.tableCell, styles.alternateCell]}>Rs. {getCustomerData(selectedId).total}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            )}

        </div>


    )
}

export default ActiveBilling