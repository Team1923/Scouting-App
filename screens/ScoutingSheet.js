import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, SafeAreaView, TextInput, Button } from 'react-native';
import React, { Component } from "react"
import { RadioButton, Divider, Checkbox } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { AntDesign } from '@expo/vector-icons';

const width_proportion = Dimensions.get('window').width;

export default class ScoutingSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {

            teamNumber: '',
            matchNumber: '',
            color: '',
            crossTarmac: 0,
            climbAttempted: 0,
            primaryScoringLocation: '',
            climbLevel: '0',
            stopForMoreThan10Secs: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',
            GenerateQrCode: false,

            AutonuppHubAtt: 0,
            AutonuppHubComp: 0,
            AutonlowerHubAtt: 0,
            AutonlowerHubComp: 0,

            TeleopuppHubAtt: 0,
            TeleopuppHubComp: 0,
            TeleoplowerHubAtt: 0,
            TeleoplowerHubComp: 0,

            currQRCode: JSON.stringify({ h: 3 })

        }
    }


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
            color: '',
            crossTarmac: 0,
            climbAttempted: 0,
            primaryScoringLocation: '',
            climbLevel: '0',
            stopForMoreThan10Secs: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',

            AutonuppHubAtt: 0,
            AutonuppHubComp: 0,
            AutonlowerHubAtt: 0,
            AutonlowerHubComp: 0,

            TeleopuppHubAtt: 0,
            TeleopuppHubComp: 0,
            TeleoplowerHubAtt: 0,
            TeleoplowerHubComp: 0,

        })
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
            <SafeAreaView style={this.containerStyle()}>
                <View style={styles.TopBottomBanner}>
                    <Text style={styles.Title}>MidKnight Inventors Scouting App</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("QrCodeScanner")}><AntDesign name='qrcode' size={30} /></TouchableOpacity>
                </View>
                <View style={styles.MainContent}>
                    <ScrollView>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'column', width: width_proportion * 0.95 }}>

                                <Text style={{ fontSize: 22 }}>Team #</Text>
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


                                {/* AUTON STARTS HERE*/}


                                <Text style={{ fontSize: 25, marginTop: 10 }}>Auton</Text>
                                <Divider style={{ marginTop: 5 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Cross Tarmac</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.crossTarmac == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.crossTarmac == 1 ? this.setState({ crossTarmac: 0 }) : this.setState({ crossTarmac: 1 })}

                                        />
                                    </View>

                                </View>

                                <View style={styles.CounterView}>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Upper Attempted</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonuppHubAtt: Math.max(0, this.state.AutonuppHubAtt - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonuppHubAtt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonuppHubAtt: this.state.AutonuppHubAtt + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Upper Completed</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonuppHubComp: Math.max(0, this.state.AutonuppHubComp - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonuppHubComp}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonuppHubComp: this.state.AutonuppHubComp + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Lower Attempted</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonlowerHubAtt: Math.max(this.state.AutonlowerHubAtt - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonlowerHubAtt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonlowerHubAtt: this.state.AutonlowerHubAtt + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Lower Completed</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonlowerHubComp: Math.max(this.state.AutonlowerHubComp - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonlowerHubComp}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonlowerHubComp: this.state.AutonlowerHubComp + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                                {/* TELEOP STARTS HERE*/}


                                <Text style={{ fontSize: 25, marginTop: 10 }}>Teleop</Text>
                                <Divider style={{ marginTop: 5 }} />

                                <View style={styles.CounterView}>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Upper Attempted</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopuppHubAtt: Math.max(0, this.state.TeleopuppHubAtt - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopuppHubAtt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopuppHubAtt: this.state.TeleopuppHubAtt + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Upper Completed</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopuppHubComp: Math.max(0, this.state.TeleopuppHubComp - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopuppHubComp}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopuppHubComp: this.state.TeleopuppHubComp + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Lower Attempted</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleoplowerHubAtt: Math.max(0, this.state.TeleoplowerHubAtt - 1) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleoplowerHubAtt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleoplowerHubAtt: this.state.TeleoplowerHubAtt + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: 18 }}>Lower Completed</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleoplowerHubComp: Math.max(0, this.state.TeleoplowerHubComp - 1) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleoplowerHubComp}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleoplowerHubComp: this.state.TeleoplowerHubComp + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 19, marginTop: 7 }}>Primary Teleop Scoring Location</Text>
                                <View style={styles.InputView2}>
                                    <TextInput
                                        style={styles.InfoInput}
                                        value={this.state.primaryScoringLocation}
                                        onChangeText={(Text) => { this.setState({ primaryScoringLocation: Text }) }}
                                        multiline={true}
                                    >
                                    </TextInput>
                                </View>


                                {/* ENGAME STARTS HERE*/}


                                <Text style={{ fontSize: 25, marginTop: 10 }}>Endgame</Text>
                                <Divider style={{ marginTop: 5 }} />
                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    <Text style={styles.CheckboxText}>Attempted Climb</Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Checkbox.Android
                                            status={this.state.climbAttempted == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.climbAttempted == 1 ? this.setState({ climbAttempted: 0, climbLevel: '0' }) : this.setState({ climbAttempted: 1 })}
                                        />
                                    </View>
                                </View>
                                {this.state.climbAttempted == 1 &&
                                    <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>Climb Level:</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="0"
                                                    status={this.state.climbLevel === '0' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ climbLevel: '0' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >0</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="1"
                                                    status={this.state.climbLevel === '4' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ climbLevel: '4' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >1</Text>
                                            </View>

                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="2"
                                                    status={this.state.climbLevel === '6' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ climbLevel: '6' })}
                                                />
                                                <Text style={{ fontSize: 20 }}>2</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="3"
                                                    status={this.state.climbLevel === '10' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ climbLevel: '10' })}
                                                />
                                                <Text style={{ fontSize: 20 }}>3</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="2"
                                                    status={this.state.climbLevel === '15' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ climbLevel: '15' })}
                                                />
                                                <Text style={{ fontSize: 20 }}>T</Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ maxWidth: width_proportion * 0.7, fontSize: 18 }}>Did the Robot Stop moving for more than 10 secs?</Text>
                                    <View style={{ marginLeft: 4 }}>
                                        <Checkbox.Android
                                            status={this.state.stopForMoreThan10Secs == 1 ? 'checked' : 'unchecked'}
                                            onPress={() => this.state.stopForMoreThan10Secs == 1 ? this.setState({ stopForMoreThan10Secs: 0, secsStopped: '0' }) : this.setState({ stopForMoreThan10Secs: 1 })}
                                        />
                                    </View>
                                </View>
                                {this.state.stopForMoreThan10Secs == 1 &&
                                    <View style={{ flexDirection: 'row', marginTop: 9 }}>
                                        <Text style={{ fontSize: 19 }}>How long(seconds):</Text>
                                        <View style={styles.SameLineInputView}>
                                            <TextInput
                                                style={styles.InfoInput}
                                                keyboardType='numeric'
                                                value={this.state.secsStopped}
                                                onChangeText={(Number) => { this.setState({ secsStopped: Number }) }}
                                            >
                                            </TextInput>
                                        </View>
                                    </View>
                                }
                                <Text style={styles.ArgText}>RSL Status</Text>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Blinking Orange"
                                        status={this.state.RSLStatus === 'Blinking Orange' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Blinking Orange' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Blinking Orange</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Solid Orange"
                                        status={this.state.RSLStatus === 'Solid Orange' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Solid Orange' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Solid Orange</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="No Lit"
                                        status={this.state.RSLStatus === 'No Lit' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'No Lit' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >No Lit</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <RadioButton.Android
                                        value="Not Visible"
                                        status={this.state.RSLStatus === 'Not Visible' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ RSLStatus: 'Not Visible' })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Not Visible</Text>
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
                                <TouchableOpacity style={styles.Submit}
                                    onPress={() => {
                                        this.setState({

                                            currQRCode: JSON.stringify({

                                                teamNumber: this.state.teamNumber,
                                                matchNumber: this.state.matchNumber,
                                                color: this.state.color,
                                                crossTarmac: this.state.crossTarmac,
                                                climbAttempted: this.state.climbAttempted,
                                                primaryScoringLocation: this.state.primaryScoringLocation,
                                                climbLevel: this.state.climbLevel,
                                                stopForMoreThan10Secs: this.state.stopForMoreThan10Secs,
                                                secsStopped: this.state.secsStopped,
                                                RSLStatus: this.state.RSLStatus,
                                                Notes: this.state.Notes,

                                                AutonuppHubAtt: this.state.AutonuppHubAtt,
                                                AutonuppHubComp: this.state.AutonuppHubComp,
                                                AutonlowerHubAtt: this.state.AutonlowerHubAtt,
                                                AutonlowerHubComp: this.state.AutonlowerHubComp,

                                                TeleopuppHubAtt: this.state.TeleopuppHubAtt,
                                                TeleopuppHubComp: this.state.TeleopuppHubComp,
                                                TeleoplowerHubAtt: this.state.TeleoplowerHubAtt,
                                                TeleoplowerHubComp: this.state.TeleoplowerHubComp


                                            }),
                                            GenerateQrCode: true

                                        })
                                        this.RESET()
                                    }}>
                                    <Text style={{ fontSize: 22 }}>SUBMIT</Text>
                                </TouchableOpacity>
                                {this.state.GenerateQrCode &&
                                    <View style={{ alignSelf: 'center', marginTop: 15 }}>
                                        <this.QRCODE
                                            value={this.state.currQRCode}
                                        />
                                    </View>
                                }
                            </View>
                        </ScrollView>
                    </ScrollView>

                </View>
            </SafeAreaView>
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
        marginTop: 7
    },
    Submit: {
        alignSelf: 'center',
        marginTop: 10,
        width: 200,
        height: 40,
        backgroundColor: 'green',
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    Title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    MainContent: {
        flex: 0.95,
        padding: 10
    },
    InputView: {
        borderColor: 'grey',
        width: width_proportion * 0.8,
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
        width: width_proportion * 0.8,
        borderWidth: 1,
        height: 100,
        borderRadius: 3,
        marginTop: 10
    },
    InfoInput: {
        fontSize: 20
    }
});
