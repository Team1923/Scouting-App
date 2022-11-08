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
            scanned: false,
            tableHead:
                ['Team #', 'Match #', 'Alliance', 'Cross Tarmac',
                    'Auto Upp Hub Att', 'Auto Upp Hub Comp', 'Auto Lower Hub Att', 'Auto Lower Hub Comp',
                    'Teleop Upp Hub Att', 'Teleop Upp Hub Comp', 'Teleop Lower Hub Att', 'Teleop Lower Hub Comp',
                    'Teleop Scoring Location', 'Att Climb', 'Climb', 'Stop moving for >10 sec', 'how long', 'RSL status', 'Notes'],
            tableBody: [],
            widthProp: Array(19).fill(width),
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

    storeData = async (value) => {
        try {
            jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('storage', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    async componentDidMount() {
        this.AskForPermission()
        this.updateItems()
    }

    SaveData = (scan) => {
        this.setState({
            scanned: true,
        })

        n = JSON.parse(scan)
        this.storeData(
            [...this.state.tableBody,
            [n.teamNumber, n.matchNumber, n.color, n.crossTarmac,
            n.AutonuppHubAtt, n.AutonuppHubComp, n.AutonlowerHubAtt, n.AutonlowerHubComp,
            n.TeleopuppHubAtt, n.TeleopuppHubComp, n.TeleoplowerHubAtt, n.TeleoplowerHubComp,
            n.primaryScoringLocation, n.climbAttempted, n.climbLevel, n.stopForMoreThan10Secs, n.secsStopped, n.RSLStatus, n.Notes]]).then(() => {
                this.updateItems()
            })


    }

    containerStyle = function (options) {
        return {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            marginTop: StatusBar.currentHeight,
        }
    }

    updateItems = () => {
        AsyncStorage.getItem('storage').then((res) => {
            this.setState({ tableBody: res != null ? JSON.parse(res) : [] })
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
            body: JSON.stringify(this.state.tableBody),
        };
        this.setState({ Sheetloading: true })
        await fetch("https://fdd0-96-235-182-224.ngrok.io", options)
            .then((response) => {
                this.setState({ ResponseText: "Successfully Sent", Sheetloading: false })
            }).catch((err) => {
                this.setState({ ResponseText: "An Error Occurred: " + err })
            })
        this.storeData([]).then(() => { this.updateItems() })
    }

    render() {
        return (

            <SafeAreaView style={this.containerStyle()}>
                <View style={styles.TopBottomBanner}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ScoutingSheet")}><AntDesign name='arrowleft' size={30} /></TouchableOpacity>
                    <Text style={styles.Title}>MidKnight Inventors Scouting App</Text>
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
                                    onBarCodeScanned={(scan) => this.state.scanned ? undefined : this.SaveData(scan.data)}
                                    style={{ height: 400, width: width_proportion * 0.9, borderRadius: 10 }}
                                />
                                {this.state.scanned && <Button title='Scan Again' onPress={() => this.setState({ scanned: false })} />}
                            </View>

                        }

                        <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.state.widthProp} />
                                <Rows data={this.state.tableBody} textStyle={styles.text} widthArr={this.state.widthProp} />
                            </Table>
                        </ScrollView>
                        <Button title='Send To Sheets (Wifi Needed)' onPress={() => this.sendToSheets()} />
                        {
                            this.state.Sheetloading == true ?
                                <ActivityIndicator size="large" color="black" />
                                :
                                <Text>{this.state.ResponseText}</Text>
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
        justifyContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center'

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
