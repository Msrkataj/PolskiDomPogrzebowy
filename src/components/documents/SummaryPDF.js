import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Definiowanie stylów
const styles = StyleSheet.create({
    page: {
        padding: 50,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderBottomColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    tableCol: {
        width: '70%',
    },
    tableColPrice: {
        width: '30%',
        textAlign: 'right',
    },
    text: {
        fontSize: 12,
    },
});

const SummaryPDF = ({ items }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Podsumowanie Wybranego Zestawu</Text>
            <View style={styles.tableHeader}>
                <Text style={[styles.text, styles.tableCol]}>Nazwa</Text>
                <Text style={[styles.text, styles.tableColPrice]}>Cena</Text>
            </View>
            {items.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={[styles.text, styles.tableCol]}>{item.name}</Text>
                    <Text style={[styles.text, styles.tableColPrice]}>{item.price} PLN</Text>
                </View>
            ))}
            <Text style={{ marginTop: 20, fontSize: 14 }}>
                <Text style={{ fontWeight: 'bold' }}>Suma: </Text>
                {items.reduce((sum, item) => sum + parseFloat(item.price), 0)} PLN
            </Text>
        </Page>
    </Document>
);

export default SummaryPDF;
