import React, { Component, useState } from "react";
import { View, Text, Button, Image, ImageBackground, TouchableOpacity, Dimensions, StatusBar, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


import Ionicons from 'react-native-vector-icons/Ionicons'



const currentHeight = Dimensions.get('window').height
const currentWidth = Dimensions.get('window').width

export default class ScouterInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            path: [],
            link: '',
            tableHead: ['Robot', 'Names', '# Scouted'],
            tableTitle: ['R1', 'R2', 'R3', 'B1', 'B2', 'B3'],
            tableData: [
                []
            ]
        }
    }

    containerStyle = function (options) {
        return {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            marginTop: StatusBar.currentHeight,
        }
    }   
    
    async componentDidMount() {
        this.setState({tableData: this.props.route.params.table})
    }

    render(){
        return (
            <SafeAreaView style={this.containerStyle()}>
                <View style={styles.TopBottomBanner}>
                    <TouchableOpacity onPress={() => this.props.navigation.replace("QrCodeScanner")}><Text style={styles.Title}>MidKnight Inventors Scouting App</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 0.95, justifyContent: 'flex-start' }}>
                    <ScrollView style={{}}>
                        <Table borderStyle={{borderWidth: 1}}>
                            <Row data={this.state.tableHead} flexArr={[1, 2, 1]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Col data={this.state.tableTitle} flexArr={[1]} heightArr={Array(6).fill(32)} textStyle={styles.text}/>
                                <Rows data={this.state.tableData} flexArr={[2, 1]} heightArr={Array(6).fill(32)} textStyle={styles.text}/>
                            </TableWrapper>
                        </Table>
                        <Button title="Clear Table" onPress={() => {this.props.route.params.clear([['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]], 'scouterInfo').then(() => {this.setState({tableData: [['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]]})})}}/>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    BarCodeBox: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',


    },
    wrapper: { flexDirection: 'row' },

    TopBottomBanner: {
        backgroundColor: 'grey',
        flex: 0.05,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    Title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    head: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0',
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
});
