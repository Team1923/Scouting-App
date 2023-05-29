import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, SafeAreaView, TextInput, Button, Alert, KeyboardAvoidingView } from 'react-native';
import React, { Component } from "react"
import { RadioButton, Divider, Checkbox } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { AntDesign } from '@expo/vector-icons';
const width_proportion = Dimensions.get('window').width;
const height_proportion = Dimensions.get('window').height;
const font = Dimensions.get('window').fontScale

global.Path = []

export default class ScoutingSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            teamNumber: '',
            matchNumber: '',
            color: '',
            crossCommunity: 0,
            chargeAttemptedAuton: 0,
            chargeRecievedAuton: '',
            chargeAttemptedEndgame: 0, 
            chargeRecievedAEndgame: '',
            numberRobotsChargingEndgame: '0',
            retrieveCargo: '',
            defenseBot: 0,
            ferryingPickup: 0,
            linkNumber: '0',
            coopertitonBonus: 0,
            robotDisconnect: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',
            colorNumber: '',

            GenerateQrCode: false,

            AutonCubeHigh: 0,
            AutonCubeMid: 0,
            AutonCubeLow: 0,
            AutonCubeDrop: 0,
            
            AutonConeHigh: 0,
            AutonConeMid: 0,
            AutonConeLow: 0,
            AutonConeDrop: 0,

            TeleopCubeHigh: 0,
            TeleopCubeMid: 0,
            TeleopCubeLow: 0,
            TeleopCubeDropped: 0,

            TeleopConeHigh: 0,
            TeleopConeMid: 0,
            TeleopConeLow: 0,
            TeleopConeDropped: 0,
            currQRCode: JSON.stringify({ })

        }
    }

    createTwoButtonAlert = () =>
        Alert.alert(
            "Start New Match?",
            "This will clear everything in the form",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.RESET() }
            ]
        );


    QRCODE = ({ value }) => {
        return (
            <QRCode
                value={value}
                size={250}
                color="black"
                backgroundColor="white"
            />
        )
    }

    RESET = function () {
        this.setState({
            teamNumber: '',
            matchNumber: '',
            crossCommunity: 0,
            chargeAttemptedAuton: 0,
            chargeRecievedAuton: '',
            chargeAttemptedEndgame: 0,
            chargeRecievedAEndgame: '',
            numberRobotsChargingEndgame: '0',
            retrieveCargo: '',
            defenseBot: 0,
            ferryingPickup: 0,
            linkNumber: '0',
            coopertitonBonus: 0,
            robotDisconnect: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',

            GenerateQrCode: false,

            AutonCubeHigh: 0,
            AutonCubeMid: 0,
            AutonCubeLow: 0,
            AutonCubeDrop: 0,
            
            AutonConeHigh: 0,
            AutonConeMid: 0,
            AutonConeLow: 0,
            AutonConeDrop: 0,

            TeleopCubeHigh: 0,
            TeleopCubeMid: 0,
            TeleopCubeLow: 0,
            TeleopCubeDropped: 0,

            TeleopConeHigh: 0,
            TeleopConeMid: 0,
            TeleopConeLow: 0,
            TeleopConeDropped: 0,



        })
        global.Path = []
    }

    containerStyle = function (options) {
        return {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            marginTop: StatusBar.currentHeight
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={this.containerStyle()} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.TopBottomBanner}>
                    <View style={{ flex: 0.9, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.Title}>MidKnight Inventors Scouting App</Text>
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.props.navigation.navigate("QrCodeScanner")}><AntDesign name='qrcode' size={height_proportion * 0.04} /></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.MainContent}>
                    <ScrollView>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'column', width: width_proportion * 0.95, marginLeft: 20, marginTop: 10 }}>

                                <Text style={{ fontSize: 22 }}>Names</Text>
                                <View style={styles.InputView}>
                                    <TextInput
                                        style={styles.InfoInput}
                                        value={this.state.name}
                                        onChangeText={(Name) => { this.setState({ name: Name }) }}
                                    >
                                    </TextInput>
                                </View>

                                <Text style={styles.ArgText}>Team #</Text>
                                <View style={styles.InputView}>
                                    <TextInput
                                        style={styles.InfoInput}
                                        keyboardType='numeric'
                                        value={this.state.teamNumber}
                                        onChangeText={(Number) => { this.setState({ teamNumber: Number }) }}
                                    >
                                    </TextInput>
                                </View>
                                <Text style={styles.ArgText}>Match #</Text>
                                <View style={styles.InputView}>
                                    <TextInput
                                        style={styles.InfoInput}
                                        keyboardType='numeric'
                                        value={this.state.matchNumber}
                                        onChangeText={(Number) => { this.setState({ matchNumber: Number }) }}
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 7, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22 }}>Team Color:</Text>
                                    <View style={styles.TeamColor}>
                                        <RadioButton.Android
                                            value="R"
                                            status={this.state.color === 'R' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ color: 'R' })}
                                            color='red'
                                        />
                                        <Text style={{ fontSize: 20, color: 'red' }} >Red</Text>
                                    </View>

                                    <View style={styles.TeamColor}>
                                        <RadioButton.Android
                                            value="B"
                                            status={this.state.color === 'B' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ color: 'B' })}
                                            color='blue'
                                        />
                                        <Text style={{ fontSize: 20, color: 'blue' }}>Blue</Text>
                                    </View>
                                </View>
                                {this.state.color != '' && 
                                <View style={{flexDirection: 'row'}}>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="1"
                                        status={this.state.colorNumber === '1' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ colorNumber: '1' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >1</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="2"
                                        status={this.state.colorNumber === '2' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ colorNumber: '2' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >2</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="3"
                                        status={this.state.colorNumber === '3' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ colorNumber: '3' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >3</Text>
                                </View>
                                

                                </View>}
                                


                                {/* AUTON STARTS HERE*/}

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -10}}>
                                <Text style={{ fontSize: 25, marginTop: 10 }}>Auton</Text>
                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 12, marginRight: 20}} onPress={() => {this.props.navigation.navigate("AutonCanvas")}}  >
                                    <Text style={{ fontSize: 20,  }}>Draw Path</Text>
                                    <AntDesign name='arrowright' size={height_proportion * 0.04}  style={{marginLeft: 3}}/>
                                </TouchableOpacity>
                                </View>
                                <Divider style={{ marginTop: 5 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Cross Community Line</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.crossCommunity == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.crossCommunity == 1 ? this.setState({ crossCommunity: 0 }) : this.setState({ crossCommunity: 1 })}

                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Attempted Charging Station</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.chargeAttemptedAuton == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.chargeAttemptedAuton == 1 ? this.setState({ chargeAttemptedAuton: 0, chargeRecievedAuton: '' }) : this.setState({ chargeAttemptedAuton: 1 })}
                                        />
                                    </View>
                                </View>
                                {this.state.chargeAttemptedAuton == 1 &&
                                    <View style={{ flexDirection: 'column', marginTop: 2 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Docked"
                                                    status={this.state.chargeRecievedAuton === 'Docked' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ chargeRecievedAuton: 'Docked' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Docked</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Engaged"
                                                    status={this.state.chargeRecievedAuton === 'Engaged' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ chargeRecievedAuton: 'Engaged' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Engaged</Text>
                                            </View>

                                    
                                        </View>
                                    </View>
                                }
                                <View style={styles.CounterView}>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center' }}>Cube Upper</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeHigh: Math.max(0, this.state.AutonCubeHigh - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonCubeHigh}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeHigh: this.state.AutonCubeHigh + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center'  }}>Cone Upper</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeHigh: Math.max(0, this.state.AutonConeHigh - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonConeHigh}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeHigh: this.state.AutonConeHigh + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Middle</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeMid: Math.max(this.state.AutonCubeMid - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonCubeMid}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeMid: this.state.AutonCubeMid + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center' }}>Cone Middle</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeMid: Math.max(this.state.AutonConeMid - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonConeMid}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeMid: this.state.AutonConeMid + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Lower</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeLow: Math.max(this.state.AutonCubeLow - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonCubeLow}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeLow: this.state.AutonCubeLow + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cone Lower</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeLow: Math.max(this.state.AutonConeLow - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonConeLow}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeLow: this.state.AutonConeLow + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Drop</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeDrop: Math.max(this.state.AutonCubeDrop - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonCubeDrop}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonCubeDrop: this.state.AutonCubeDrop + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cone Drop</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeDrop: Math.max(this.state.AutonConeDrop - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonConeDrop}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonConeDrop: this.state.AutonConeDrop + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/* TELEOP STARTS HERE*/}
                                
                                

                                <Text style={{ fontSize: 25, marginTop: 10 }}>Teleop</Text>

                                

                                <Divider style={{ marginTop: 5 }} />

                                <Text style={{fontSize: 21, marginTop: 10}}>Cargo Retrieval Location</Text>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Single"
                                        status={this.state.retrieveCargo.includes('Single') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.retrieveCargo.includes('Single ') ? this.setState({ retrieveCargo: this.state.retrieveCargo.replace("Single ", "") }) 
                                        : this.setState({ retrieveCargo: this.state.retrieveCargo += "Single " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Single</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Double"
                                        status={this.state.retrieveCargo.includes('Double') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.retrieveCargo.includes('Double ') ? this.setState({ retrieveCargo: this.state.retrieveCargo.replace("Double ", "") }) 
                                        : this.setState({ retrieveCargo: this.state.retrieveCargo += "Double " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Double</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="On Field"
                                        status={this.state.retrieveCargo.includes('On Field') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.retrieveCargo.includes('On Field ') ? this.setState({ retrieveCargo: this.state.retrieveCargo.replace("On Field ", "") }) 
                                        : this.setState({ retrieveCargo: this.state.retrieveCargo += "On Field " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >On Field</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="N/A"
                                        status={this.state.retrieveCargo.includes('N/A') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.retrieveCargo.includes('N/A ') ? this.setState({ retrieveCargo: this.state.retrieveCargo.replace("N/A ", "") }) 
                                        : this.setState({ retrieveCargo: this.state.retrieveCargo += "N/A " })}
                                        

                                    />
                                    <Text style={{ fontSize: 20 }} >N/A</Text>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Defense Bot</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.defenseBot == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.defenseBot == 1 ? this.setState({ defenseBot: 0 }) : this.setState({ defenseBot: 1 })}

                                        />
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Ferrying/Pickup Bot</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.ferryingPickup == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.ferryingPickup == 1 ? this.setState({ ferryingPickup: 0 }) : this.setState({ ferryingPickup: 1 })}

                                        />
                                    </View>

                                </View>

                                <View style={styles.CounterView}>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{ fontSize: 19, alignSelf: 'center' }}>Cube Upper</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeHigh: Math.max(0, this.state.TeleopCubeHigh - 1) }) }}>
                                            <Text style={styles.ArgText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopCubeHigh}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeHigh: this.state.TeleopCubeHigh + 1 }) }}>
                                            <Text style={styles.ArgText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{ fontSize: 19, alignSelf: 'center'  }}>Cone Upper</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeHigh: Math.max(0, this.state.TeleopConeHigh - 1) }) }}>
                                            <Text style={styles.ArgText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopConeHigh}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeHigh: this.state.TeleopConeHigh + 1 }) }}>
                                            <Text style={styles.ArgText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                </View>

                                <View style={styles.CounterView}>
                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Middle</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeMid: Math.max(this.state.TeleopCubeMid - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopCubeMid}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeMid: this.state.TeleopCubeMid + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center' }}>Cone Middle</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeMid: Math.max(this.state.TeleopConeMid - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopConeMid}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeMid: this.state.TeleopConeMid + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                                </View>

                                <View style={styles.CounterView}>
                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Lower</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeLow: Math.max(this.state.TeleopCubeLow - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopCubeLow}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeLow: this.state.TeleopCubeLow + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cone Lower</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeLow: Math.max(this.state.TeleopConeLow - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopConeLow}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeLow: this.state.TeleopConeLow + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                                </View>
                                <View style={styles.CounterView}>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cube Drop</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeDropped: Math.max(this.state.TeleopCubeDropped - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopCubeDropped}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopCubeDropped: this.state.TeleopCubeDropped + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.InnerCounterView}>
                                    <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Cone Drop</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeDropped: Math.max(this.state.TeleopConeDropped - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                        <Text style={styles.ArgText}>{this.state.TeleopConeDropped}</Text>
                                        <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopConeDropped: this.state.TeleopConeDropped + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                                </View>

                              

                                

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                                    <Text style={{ maxWidth: width_proportion * 0.7, fontSize: 20 }}>Did the Robot Disconnect</Text>
                                    <View style={{ marginLeft: 4 }}>
                                        <Checkbox.Android
                                            status={this.state.robotDisconnect == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.robotDisconnect == 1 ? this.setState({ robotDisconnect: 0, secsStopped: '0' }) : this.setState({ robotDisconnect: 1 })}
                                        />
                                    </View>
                                </View>
                                {this.state.robotDisconnect == 1 &&
                                <View>
                                    <View style={{ flexDirection: 'row', marginTop: 4, marginLeft: 7 }}>
                                        <Text style={{ fontSize: 19 }}>How long(seconds):</Text>
                                        <View style={styles.SameLineInputView}>
                                            <TextInput d
                                                style={styles.InfoInput}
                                                keyboardType='numeric'
                                                value={this.state.secsStopped}
                                                onChangeText={(Number) => { this.setState({ secsStopped: Number }) }}
                                            >
                                            </TextInput>
                                        </View>
                                    </View>
                                <Text style={{fontSize: 21, marginTop: 3}}>RSL Status</Text>
                                <View style={{flexDirection: 'column'}}>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Blinking"
                                        status={this.state.RSLStatus === 'Blinking' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Blinking' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Blinking</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Off"
                                        status={this.state.RSLStatus === 'Off' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Off' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Off</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Solid"
                                        status={this.state.RSLStatus === 'Solid' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Solid' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Solid</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="N/A"
                                        status={this.state.RSLStatus === 'N/A' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'N/A' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >N/A</Text>
                                </View>

                                </View>
                                </View>
                                }

                                

                                {/* ENGAME STARTS HERE*/}


                                <Text style={{ fontSize: 25, marginTop: 10 }}>Endgame</Text>
                                <Divider style={{ marginTop: 5 }} />
                                
                                <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Attempted Charging Station</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.chargeAttemptedEndgame == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.chargeAttemptedEndgame == 1 ? this.setState({ chargeAttemptedEndgame: 0, chargeRecievedAEndgame: '' }) : this.setState({ chargeAttemptedEndgame: 1 })}
                                        />
                                    </View>
                                </View>
                                {this.state.chargeAttemptedEndgame == 1 &&
                                    <View style={{ flexDirection: 'column', marginTop: 2 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Parked"
                                                    status={this.state.chargeRecievedAEndgame === 'Parked' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ chargeRecievedAEndgame: 'Parked' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Parked</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Docked"
                                                    status={this.state.chargeRecievedAEndgame === 'Docked' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ chargeRecievedAEndgame: 'Docked' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Docked</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Engaged"
                                                    status={this.state.chargeRecievedAEndgame === 'Engaged' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ chargeRecievedAEndgame: 'Engaged' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Engaged</Text>
                                            </View>
                                    
                                        </View>
                                    </View>
                                }
                                
                                <View style={{ flexDirection: 'row', marginTop: 9 }}>
                                        <Text style={{ fontSize: 20 }}># of Robots Charging</Text>
                                        <View style={styles.SameLineInputView}>
                                            <TextInput
                                                style={styles.InfoInput}
                                                keyboardType='numeric'
                                                value={this.state.numberRobotsChargingEndgame}
                                                onChangeText={(Number) => { this.setState({ numberRobotsChargingEndgame: Number }) }}
                                            >
                                            </TextInput>
                                        </View>
                                 </View>
                                
                                <Text style={{ fontSize: 19, marginTop: 7 }}>Additional Notes</Text>
                                <View style={styles.InputView2}>
                                    <TextInput
                                        style={styles.InfoInput}
                                        value={this.state.Notes}
                                        onChangeText={(Text) => { this.setState({ Notes: Text }) }}
                                        multiline={true}
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.Submit}
                                        onPress={() => {
                                            this.setState({

                                                currQRCode: JSON.stringify({

                                                    name: this.state.name,
                                                    colorNumber: this.state.colorNumber,                                                
                                                    teamNumber: this.state.teamNumber,
                                                    matchNumber: this.state.matchNumber,
                                                    color: this.state.color,
                                                    crossCommunity: this.state.crossCommunity,
                                                    chargeAttemptedAuton: this.state.chargeAttemptedAuton,
                                                    chargeRecievedAuton: this.state.chargeRecievedAuton,
                                                    chargeAttemptedEndgame: this.state.chargeAttemptedEndgame,
                                                    chargeRecievedAEndgame: this.state.chargeRecievedAEndgame,
                                                    numberRobotsChargingEndgame: this.state.numberRobotsChargingEndgame,
                                                    retrieveCargo: this.state.retrieveCargo,
                                                    defenseBot: this.state.defenseBot,
                                                    ferryingPickup: this.state.ferryingPickup,
                                                    
                                                    robotDisconnect: this.state.robotDisconnect,
                                                    secsStopped: this.state.secsStopped,
                                                    RSLStatus: this.state.RSLStatus,
                                                    Notes: this.state.Notes,

                                                    AutonCubeHigh: this.state.AutonCubeHigh,
                                                    AutonCubeMid: this.state.AutonCubeMid,
                                                    AutonCubeLow: this.state.AutonCubeLow,
                                                    AutonCubeDropped: this.state.AutonCubeDrop,

                                                    AutonConeHigh: this.state.AutonConeHigh,
                                                    AutonConeMid: this.state.AutonConeMid,
                                                    AutonConeLow: this.state.AutonConeLow,
                                                    AutonConeDropped: this.state.AutonConeDrop,

                                                    TeleopCubeHigh: this.state.TeleopCubeHigh,
                                                    TeleopCubeMid: this.state.TeleopCubeMid,
                                                    TeleopCubeLow: this.state.TeleopCubeLow,
                                                    TeleopCubeDropped: this.state.TeleopCubeDropped,

                                                    TeleopConeHigh: this.state.TeleopConeHigh,
                                                    TeleopConeMid: this.state.TeleopConeMid,
                                                    TeleopConeLow: this.state.TeleopConeLow,
                                                    TeleopConeDropped: this.state.TeleopConeDropped,

                                                }),
                                                GenerateQrCode: true

                                            })
                                        }}>
                                        <Text style={{ fontSize: 22 }}>SUBMIT</Text>

                                    </TouchableOpacity>

                                </View>
                                {this.state.GenerateQrCode &&
                                    <View style={{ alignSelf: 'center', marginTop: 15, alignItems: 'center' }}>
                                         <this.QRCODE
                                            value={this.state.currQRCode}
                                        />
                                        <TouchableOpacity onPress={() => { this.createTwoButtonAlert() }} style={styles.Reset}>
                                            <Text>New Match?</Text>
                                        </TouchableOpacity>
                                    </View>
                                   
                                
                                }
                            </View>
                        </ScrollView>
                    </ScrollView>

                </View>
                </SafeAreaView>

                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    InnerCounterView: {
        justifyContent: 'flex-end'
    },
    CounterView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 7,
        width: Math.max(width_proportion * 0.8, 340),
    },
    InnerCounterView: {
        justifyContent: 'flex-end', width: 120 
    },
    Submit: {
        marginTop: 10,
        width: 200,
        height: 40,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    Reset: {
        marginTop: 10,
        width: 200,
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    ArgText: {
        fontSize: 22,
        marginTop: 10,
    },
    CheckboxText: {
        fontSize: 20
    },
    TeamColor: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    TeamClimb: {
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    TopBottomBanner: {
        backgroundColor: 'grey',
        flex: 0.05,
        alignItems: 'center',
        flexDirection: 'row',
    },
    Title: {
        fontSize: height_proportion * 0.02,
        fontWeight: 'bold',
    },
    MainContent: {
        flex: 0.95,
    },
    InputView: {
        borderColor: 'grey',
        width: Math.max(width_proportion * 0.7, 300),
        borderWidth: 1,
        height: 35,
        borderRadius: 3,
        marginTop: 10
    },
    SameLineInputView: {
        borderColor: 'grey',
        borderWidth: 1,
        width: 70,
        height: 28,
        borderRadius: 3,
        marginLeft: 7,
        marginBottom: 1

    },
    InputView2: {
        borderColor: 'grey',
        width: Math.max(width_proportion * 0.7, 300),
        borderWidth: 1,
        height: 100,
        borderRadius: 3,
        marginTop: 10
    },
    InfoInput: {
        fontSize: 20
    }
});
