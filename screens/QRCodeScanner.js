import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, SafeAreaView, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import React, { Component } from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width_proportion = Dimensions.get('window').width;
const height_proportion = Dimensions.get('window').height
const width = 120;
export default class QRCodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            scanned: true,
            tableHead:
                ['Team #', 'Match #', 'Alliance',
                    'Auto Speaker Attempt', 'Auto Speaker Score', 
                    'Defense', 'Ferrying', 'Amp Attempted', 'Amp Scored', 'Speaker Attempted', 'Speaker Scored',
                    'Robot on stage?', 'Trap Attempted', 'Trap Scored',
                    'Robot Disconnect', 'Disconnect Duration', 'RSL Status', 'Notes'],
            tableBody: [],
            scouterBody: [],
            widthProp: null,
            Sheetloading: false,
            ResponseText: ""
        }
    }


    async AskForPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        this.setState({
            hasPermission: status == 'granted'
        })
    }
    

    storeData = async (value, id) => {
        try {
            jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(id, jsonValue)
        } catch (e) {
            // saving error
        }
    }


    async componentDidMount() {
        this.AskForPermission()
        this.updateItems(1)
        this.updateItems(2)
        this.setState({widthProp: Array(this.state.tableHead.length).fill(width)})
    }

    SaveData = (scan) => {
        this.setState({
            scanned: true,
        })
        var n = JSON.parse(scan)
        this.storeData(
            [...this.state.tableBody,
            [n.teamNumber, n.matchNumber, n.color,
            n.AutonSpeakerAttempt, n.AutonSpeakerComplete, n.defenseBot, n.ferryingPickup,
            n.TeleopAmpAttempt, n.TeleopAmpComplete, n.TeleopSpeakerAttempt, n.TeleopSpeakerComplete,
            n.onStageStatus, n.TrapAttempt, n.TrapComplete,
            n.robotDisconnect, n.secsStopped, n.RSLStatus, n.Notes]], 'storage').then(() => {
                this.updateItems(1)
            }).catch(err => console.log(err))
        console.log(n.color + " " + n.colorNumber)
        if (n.color != '' && n.colorNumber != ''){
            var temp = this.state.scouterBody
            var index
            if (n.color == 'R') index = parseInt(n.colorNumber)-1
            else index = index = 2 + parseInt(n.colorNumber)
            if (this.state.scouterBody[index][0] == n.name) this.state.scouterBody[index][1]++;
            else {
                this.state.scouterBody[index][0] = n.name
                this.state.scouterBody[index][1] = 1
            }

            this.storeData(temp, 'scouterInfo').then(() => {
                this.updateItems(2)
            })
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

    updateItems = (id) => {

        id == 1 ?

        AsyncStorage.getItem('storage').then((res) => {
            this.setState({ tableBody: res != null ? JSON.parse(res) : [] })
        }).catch((err) => {
            console.log(err)
        }) : 

        AsyncStorage.getItem('scouterInfo').then((res) => {
            this.setState({ scouterBody: res != null ? JSON.parse(res) : [['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]] })
        }).catch((err) => {
            console.log(err)
        })
    }

    sendToSheets = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {data: JSON.stringify(this.state.tableBody), sheet: "1L-xgC_rhqn1Cu1eS2JoRoxaTc-6-8IObcyumDpIJCfE"},
        };
        this.setState({ Sheetloading: true })
        await fetch("https://scoutingappserver.onrender.com/sheets", options)
            .then((response) => {
                var inter = ""
                if (response.status == 200){
                    inter = "Successfully Sent"
                    this.storeData([], 'storage').then(() => { this.updateItems(1) })
                }
                else
                    inter = "An error Occured"
                this.setState({ ResponseText: inter, Sheetloading: false })

            }).catch((err) => {
                this.setState({ ResponseText: "An Error Occurred: " + err })
            })
    }

    render() {
        return (
            <SafeAreaView style={this.containerStyle()}>
                <View style={styles.TopBottomBanner}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ScoutingSheet")}><Text style={styles.Title}>MidKnight Inventors Scouting App</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 0.95, justifyContent: 'flex-start', marginTop: 20 }}>
                    <ScrollView style={{}}>
                        {this.state.hasPermission != true ?
                            <View>
                                <Text>Waiting for Camera Permissions</Text>
                                <Button title='Allow Camera' onPress={() => this.AskForPermission()}></Button>
                            </View>

                            :
                            <View style={styles.BarCodeBox}>
                                <BarCodeScanner
                                    fadeIn
                                    onBarCodeScanned={(scan) => {this.state.scanned ? undefined : this.SaveData(scan.data)}}
                                    style={{ height: height_proportion * 0.6, width: width_proportion * 0.9 }}
                                />
                                {this.state.scanned && <Button title='Scan' onPress={() => this.setState({scanned: false})} />}
                            </View>

                        }
                        <View style={{alignItems: 'flex-end', justifyContent: 'center', marginTop: 10}}> 
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}} onPress={() => {this.props.navigation.navigate("ScouterInfo", {table: this.state.scouterBody, clear: this.storeData})}}  >

                                    <Text style={{ fontSize: 18 }}>Scouters</Text>
                                    <AntDesign name='arrowright' size={height_proportion * 0.03}  style={{marginLeft: 3}}/>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.state.widthProp} />
                                <Rows data={this.state.tableBody}  textStyle={styles.text} widthArr={this.state.widthProp} />
                            </Table>
                        </ScrollView>
                            <Button title='Send To Sheets (Wifi Needed)' onPress={() => this.sendToSheets()} />
                        {
                            this.state.Sheetloading == true ?
                                <ActivityIndicator size="large" color="black" />
                                :
                                <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 20 }}>{this.state.ResponseText}</Text>
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    BarCodeBox: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',


    },
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
    text: { margin: 6, alignSelf: 'center' }

});
