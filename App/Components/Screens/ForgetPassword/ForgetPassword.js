import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { globals, helpers, validators, API, } from '../../../Config';
import { mainStyle, images, sty } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import Loader from '../../Custom/Loader/Loader'
import { validation } from '../../../Config/Libs/helpers';



const ForgetPassword = (props) => {
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    const [checked, setchecked] = useState(false);
    const [loading, setloading] = useState(false);
    const [userNameValid, setuserNameValid] = useState("");

    useEffect(() => {

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    const getEndPoint = () => {
        let cb = {
            success: async (res) => {
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    forgetPassword()
                } else {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert('Error in fetch end Point', 'Authentication failed');
                    }, 200)
                }
            },
            error: (err) => {
                setloading(false)
                setTimeout(() => {
                    Alert.alert(err.message);
                }, 100)
            },
            complete: () => {
                setloading(false)
            },
        };

        let header = helpers.buildHeader({});
        let data = {
            company_code: "app"
        };
        API.getEndPoint(data, cb, header);
    };


    const forgetPassword = async () => {
        if (userName) {
            const emailerr = validation("email", userName)
            if (!emailerr) {
                Alert.alert(helpers.getLocale(localize, "forgetPassword", "validation_err"))
            }
            else {
                setloading(true)
                const baseUrl = await AsyncStorage.getItem("baseUrl");
                if (baseUrl && baseUrl !== undefined) {
                    let cb = {
                        success: async (res) => {
                            // console.log("success res:", res)
                            setloading(false)
                            setTimeout(() => {
                                Alert.alert(
                                    'Success',
                                    helpers.getLocale(localize, "forgetPassword", "onSubmitSuccess"),
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                props.navigation.navigate('LogIn')
                                            }
                                        },
                                    ]
                                );
                            }, 200)
                        },
                        error: (err) => {
                            setloading(false)
                            setTimeout(() => {
                                Alert.alert(err.message)
                            }, 100)
                        },
                        complete: () => {
                            setloading(false)

                        },
                    };

                    let header = helpers.buildHeader();
                    let data = {
                        "username": userName,
                        "api_key": globals.API_KEY
                    };
                    API.forgetPassword(data, cb, header);

                }
                else {
                    getEndPoint()
                }
            }
        }
        else {
            Alert.alert(helpers.getLocale(localize, "forgetPassword", "onSubmit"))
        }

    }

    const signinHandler = () => {
        // console.log("signInHandler")
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <_Header header={helpers.getLocale(localize, "forgetPassword", "forget_password")} />
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "forgetPassword", "userName")}
                    onChangeText={value => { setuserName(value) }}
                    value={userName}

                />
            </View>
            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "forgetPassword", "send")}
                        callback={forgetPassword} />
                </View>
            </View>
        </View >

    );
};

export default MainHoc(ForgetPassword)

