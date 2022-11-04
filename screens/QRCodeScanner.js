import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import React, { Component } from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';



const width_proportion = Dimensions.get('window').width;
const height_proportion = Dimensions.get('window').height

export default class QRCodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            scanned: false,
            text: 'Nothing Scanned'
        }
    }

    async AskForPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        this.setState({
            hasPermission: status == 'granted'
        })
    }

    async componentDidMount() {
        this.AskForPermission()
    }

    containerStyle = function (options) {
        return {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            marginTop: StatusBar.currentHeight,
        }
    }

    render() {
        return (

            <SafeAreaView style={this.containerStyle()}>
                <View style={styles.TopBottomBanner}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ScoutingSheet")}><AntDesign name='arrowleft' size={30} /></TouchableOpacity>
                    <Text style={styles.Title}>MidKnight Inventors Scouting App</Text>
                </View>
                <View style={{ flex: 0.95, justifyContent: 'flex-start', marginTop: 20 }}>
                    {this.state.hasPermission != true ?
                        <View>
                            <Text>Waiting for Camera Permissions</Text>
                            <Button title='Allow Camera' onPress={() => this.AskForPermission()}></Button>
                        </View>

                        :
                        <View style={styles.BarCodeBox}>
                            <BarCodeScanner
                                onBarCodeScanned={(scan) => this.state.scanned ? undefined : this.setState({ text: scan.data, scanned: true })}
                                style={{ height: 400, width: 300 }}
                            />
                            <Text style={{ marginTop: 10, fontSize: 22 }}>{this.state.text}</Text>
                            {this.state.scanned && <Button title='Scan Again' onPress={() => this.setState({ scanned: false, text: 'Nothing Scanned' })} />}
                        </View>

                    }
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    BarCodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
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
});
