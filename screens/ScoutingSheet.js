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
            shootingLocation: '',
            pickupLocation: '',
            defenseBot: 0,
            ferryingPickup: 0,
            robotDisconnect: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',
            colorNumber: '',
            onStageStatus: '',

            GenerateQrCode: false,

            AutonAmpAttempt: 0,
            AutonSpeakerAttempt: 0,
            
            AutonAmpComplete: 0,
            AutonSpeakerComplete: 0,

            TeleopAmpAttempt: 0,
            TeleopSpeakerAttempt: 0,

            TeleopAmpComplete: 0,
            TeleopSpeakerComplete: 0,

            TrapAttempt: 0,
            TrapComplete: 0,

            Spotlit: 0,
            
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
            name: '',
            teamNumber: '',
            matchNumber: '',
            color: '',
            shootingLocation: '',
            pickupLocation: '',
            defenseBot: 0,
            ferryingPickup: 0,
            robotDisconnect: 0,
            secsStopped: '0',
            RSLStatus: '',
            Notes: '',
            colorNumber: '',
            onStageStatus: '',
            
            GenerateQrCode: false,

            AutonAmpAttempt: 0,
            AutonSpeakerAttempt: 0,
            
            AutonAmpComplete: 0,
            AutonSpeakerComplete: 0,

            TeleopAmpAttempt: 0,
            TeleopSpeakerAttempt: 0,

            TeleopAmpComplete: 0,
            TeleopSpeakerComplete: 0,

            TrapAttempt: 0,
            TrapComplete: 0,

            Spotlit: 0,

        })
        global.Path = []
    }

    containerStyle = function (options) {
        return {
            flex: 1,
            flexDirection: 'column',
            marginTop: StatusBar.currentHeight,
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
                                    {/* Driver Station */}
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
                                        </View>
                                    }
                                

                                {/* AUTON STARTS HERE*/}


                                <Divider style={{ marginTop: 5 }} />            
                                
                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center' }}>Amp Attempt</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonAmpAttempt: Math.max(0, this.state.AutonAmpAttempt - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonAmpAttempt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonAmpAttempt: this.state.AutonAmpAttempt + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center'  }}>Amp Complete</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonAmpComplete: Math.max(0, this.state.AutonAmpComplete - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonAmpComplete}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonAmpComplete: this.state.AutonAmpComplete + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Speaker Attempt</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonSpeakerAttempt: Math.max(this.state.AutonSpeakerAttempt - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonSpeakerAttempt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonSpeakerAttempt: this.state.AutonSpeakerAttempt + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center' }}>Speaker Complete</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonSpeakerComplete: Math.max(this.state.AutonSpeakerComplete - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.AutonSpeakerComplete}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ AutonSpeakerComplete: this.state.AutonSpeakerComplete + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                                {/* TELEOP STARTS HERE*/}

                                <Text style={{ fontSize: 25, marginTop: 10 }}>Teleop</Text>

                                <Divider style={{ marginTop: 5 }} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: '15%', marginLeft: '10%' }}>
                                        <Text style={styles.CheckboxText}>Defense Bot</Text>
                                        <View>
                                            <Checkbox.Android
                                                status={this.state.defenseBot == 1 ? 'checked' : 'unchecked'}
                                                onPress={() => this.state.defenseBot == 1 ? this.setState({ defenseBot: 0 }) : this.setState({ defenseBot: 1 })}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: '15%', marginLeft: '10%' }}>
                                        <Text style={styles.CheckboxText}>Ferrying</Text>
                                        <View>
                                            <Checkbox.Android
                                                status={this.state.ferryingPickup == 1 ? 'checked' : 'unchecked'}
                                                onPress={() => this.state.ferryingPickup == 1 ? this.setState({ ferryingPickup: 0 }) : this.setState({ ferryingPickup: 1 })}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center' }}>Amp Attempt</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopAmpAttempt: Math.max(0, this.state.TeleopAmpAttempt - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopAmpAttempt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopAmpAttempt: this.state.TeleopAmpAttempt + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{ fontSize: 19, alignSelf: 'center'  }}>Amp Complete</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopAmpComplete: Math.max(0, this.state.TeleopAmpComplete - 1) }) }}>
                                                <Text style={styles.ArgText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopAmpComplete}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopAmpComplete: this.state.TeleopAmpComplete + 1 }) }}>
                                                <Text style={styles.ArgText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.CounterView}>
                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Speaker Attempt</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopSpeakerAttempt: Math.max(this.state.TeleopSpeakerAttempt - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopSpeakerAttempt}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopSpeakerAttempt: this.state.TeleopSpeakerAttempt + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.InnerCounterView}>
                                        <Text style={{  fontSize: 19, alignSelf: 'center' }}>Speaker Complete</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopSpeakerComplete: Math.max(this.state.TeleopSpeakerComplete - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                            <Text style={styles.ArgText}>{this.state.TeleopSpeakerComplete}</Text>
                                            <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TeleopSpeakerComplete: this.state.TeleopSpeakerComplete + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <Text style={{fontSize: 21, marginTop: 10}}>Shooting Location</Text>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Subwoofer"
                                        status={this.state.shootingLocation.includes('Subwoofer') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.shootingLocation.includes('Subwoofer ') ? this.setState({ shootingLocation: this.state.shootingLocation.replace("Subwoofer ", "") }) 
                                        : this.setState({ shootingLocation: this.state.shootingLocation += "Subwoofer " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Subwoofer</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Between subwoofer and podium"
                                        status={this.state.shootingLocation.includes('Between subwoofer and podium') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.shootingLocation.includes('Between subwoofer and podium ') ? this.setState({ shootingLocation: this.state.shootingLocation.replace("Between subwoofer and podium ", "") }) 
                                        : this.setState({ shootingLocation: this.state.shootingLocation += "Double " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Between subwoofer and podium</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Podium"
                                        status={this.state.shootingLocation.includes('Podium') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.shootingLocation.includes('Podium ') ? this.setState({ shootingLocation: this.state.shootingLocation.replace("Podium ", "") }) 
                                        : this.setState({ shootingLocation: this.state.shootingLocation += "Podium " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Podium</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="N/A"
                                        status={this.state.shootingLocation.includes('Community Line') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.shootingLocation.includes('Community Line ') ? this.setState({ shootingLocation: this.state.shootingLocation.replace("Community Line ", "") }) 
                                        : this.setState({ shootingLocation: this.state.shootingLocation += "Community Line " })}
                                        

                                    />
                                    <Text style={{ fontSize: 20 }} >Community Line</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="HalfCourt"
                                        status={this.state.shootingLocation.includes('Half-court') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.shootingLocation.includes('Half-court ') ? this.setState({ shootingLocation: this.state.shootingLocation.replace("Half-court ", "") }) 
                                        : this.setState({ shootingLocation: this.state.shootingLocation += "Half-court " })}
                                        

                                    />
                                    <Text style={{ fontSize: 20 }} >Half-court</Text>
                                </View>

                                
                                <Text style={{fontSize: 21, marginTop: 10}}>Pickup Location</Text>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Ground Intake"
                                        status={this.state.pickupLocation.includes('Ground Intake') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.pickupLocation.includes('Ground Intake ') ? this.setState({ pickupLocation: this.state.pickupLocation.replace("Ground Intake ", "") }) 
                                        : this.setState({ pickupLocation: this.state.pickupLocation += "Ground Intake " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Ground Intake</Text>
                                </View>
                                <View style={styles.TeamClimb}>
                                    <Checkbox.Android
                                        value="Human player from source"
                                        status={this.state.pickupLocation.includes('Human player from source') ? 'checked' : 'unchecked'}
                                        onPress={() => this.state.pickupLocation.includes('Human player from source ') ? this.setState({ pickupLocation: this.state.pickupLocation.replace("Human player from source ", "") }) 
                                        : this.setState({ pickupLocation: this.state.pickupLocation += "Human player from source " })}
                                    />
                                    <Text style={{ fontSize: 20 }} >Human player from source</Text>
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
                                
                                <Text style={{fontSize: 21, marginTop: 10}}>On-stage status</Text>

                                    <View style={{ flexDirection: 'column', marginTop: 2 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Hanging"
                                                    status={this.state.onStageStatus === 'Hanging' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ onStageStatus: 'Hanging' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Hanging</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Parked"
                                                    status={this.state.onStageStatus === 'Parked' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ onStageStatus: 'Parked' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Parked</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="N/A"
                                                    status={this.state.onStageStatus === 'N/A' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ onStageStatus: 'N/A' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >N/A</Text>
                                            </View>
                                    
                                        </View>
                                    </View>
                                
                                 <View>
                                     <View style={styles.CounterView}>
                                        <View style={styles.InnerCounterView}>
                                            <Text style={{  fontSize: 19, alignSelf: 'center'  }}>Trap Attempt</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TrapAttempt: Math.max(this.state.TrapAttempt - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                                <Text style={styles.ArgText}>{this.state.TrapAttempt}</Text>
                                                <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TrapAttempt: this.state.TrapAttempt + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={styles.InnerCounterView}>
                                            <Text style={{  fontSize: 19, alignSelf: 'center' }}>Trap Complete</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TrapComplete: Math.max(this.state.TrapComplete - 1, 0) }) }}><Text style={styles.ArgText}>-</Text></TouchableOpacity>
                                                <Text style={styles.ArgText}>{this.state.TrapComplete}</Text>
                                                <TouchableOpacity hitSlop={{ top: 18, bottom: 20, right: 20, left: 20 }} onPress={() => { this.setState({ TrapComplete: this.state.TrapComplete + 1 }) }}><Text style={styles.ArgText}>+</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                
                                <Text style={{fontSize: 21, marginTop: 10}}>Were they spotlit?</Text>

                                    <View style={{ flexDirection: 'column', marginTop: 2 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="Yes"
                                                    status={this.state.Spotlit === 'Yes' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ Spotlit: 'Yes' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >Yes</Text>
                                            </View>
                                            <View style={styles.TeamClimb}>
                                                <RadioButton.Android
                                                    value="No"
                                                    status={this.state.Spotlit === 'No' ? 'checked' : 'unchecked'}
                                                    onPress={() => this.setState({ Spotlit: 'No' })}
                                                />
                                                <Text style={{ fontSize: 20 }} >No</Text>
                                            </View>
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
                                                    teamNumber: this.state.teamNumber,
                                                    matchNumber: this.state.matchNumber,
                                                    color: this.state.color,
                                                    shootingLocation: this.state.shootingLocation,
                                                    pickupLocation: this.state.pickupLocation,
                                                    defenseBot: this.state.defenseBot,
                                                    ferryingPickup: this.state.ferryingPickup,
                                                    robotDisconnect: this.state.robotDisconnect,
                                                    secsStopped: this.state.secsStopped,
                                                    RSLStatus: this.state.RSLStatus,
                                                    Notes: this.state.Notes,
                                                    colorNumber: this.state.colorNumber,
                                                    onStageStatus: this.state.onStageStatus,

                                                    AutonAmpAttempt: this.state.AutonAmpAttempt,
                                                    AutonSpeakerAttempt: this.state.AutonSpeakerAttempt,
                                                    
                                                    AutonAmpComplete: this.state.AutonAmpComplete,
                                                    AutonSpeakerComplete: this.state.AutonSpeakerComplete,

                                                    TeleopAmpAttempt: this.state.TeleopAmpAttempt,
                                                    TeleopSpeakerAttempt: this.state.TeleopSpeakerAttempt,

                                                    TeleopAmpComplete: this.state.TeleopAmpComplete,
                                                    TeleopSpeakerComplete: this.state.TeleopSpeakerComplete,

                                                    TrapAttempt: this.state.TrapAttempt,
                                                    TrapComplete: this.state.TrapComplete,

                                                    Spotlit: this.state.Spotlit,

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
        justifyContent: 'flex-end', width: 160 
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
