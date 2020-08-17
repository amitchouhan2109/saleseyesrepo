import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet, Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API, } from '../../../Config';
import { mainStyle, images, sty, colors } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import AsyncStorage from '@react-native-community/async-storage';
import InfoCart from '../ContentType/InfoCart/InfoCart';
import { setTasks } from "../../../Redux/Actions/TaskAction"
import { large } from '../../../Theme/FontSizes';
import Loader from '../../Custom/Loader/Loader'
import { StackActions, CommonActions } from "@react-navigation/native";


const Tasks = (props) => {
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [task, settask] = useState([]);
    const [arrayholder, setarrayHolder] = useState([]);
    const [loading, setloading] = useState(false)
    const [TaskLoader, setTaskLoader] = useState(true)
    const [search, setsearch] = useState(false)

    const signoutHandler = () => {
        signout()
    }

    const signout = async () => {
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    AsyncStorage.removeItem('userAuthDetails');
                    AsyncStorage.removeItem('token');
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'LogIn' },
                            ],
                        })
                    );
                    // AsyncStorage.removeItem('userName');
                    // AsyncStorage.removeItem('password');
                    // props.navigation.navigate('LogIn')
                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 200);
                },
                complete: () => {
                    setloading(false)
                },
            };
            setloading(true)
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);
        } else {
            props.navigation.navigate('LogIn')
        }

    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getTasks();
        });
        return unsubscribe;
    }, [props.navigation])


    const getTasks = async () => {
        let cb = {
            success: async (res) => {
                dispatch(setTasks({ res }))
                setTaskLoader(false)
                // console.log({ res })
                const TaskList = res[0].tasks
                TaskList.sort(function (a, b) {
                    return (b.id - a.id)

                })
                // const sorted = TaskList.reverse();
                // console.log("sor", sorted)
                settask(TaskList)
                setarrayHolder(res[0].tasks)
            },
            error: (err) => {
                setTaskLoader(false)
                if (err.type === 'AUTHORIZATION' || err.message === 'Not logged in / Wrong password or username / Token expired') {
                    setTimeout(() => {
                        Alert.alert(" Error ", err.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        // signout()
                                        props.navigation.navigate('LogIn')
                                    }
                                },
                            ])
                    }, 100)
                }
                else {
                    setTimeout(() => {
                        Alert.alert(err.message)
                    }, 100)
                }
            },

            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let userAuthdetails = await helpers.userAuthdetails();
        let data = {
            "user_id": userAuthdetails.user_id,
            "token": userAuthdetails.token,
            "portal_user": userAuthdetails.portal_user,
            "api_key": globals.API_KEY
        };
        API.getAllTasks(data, cb, header);
    }



    const taskRender = (a) => {
        return (
            <View style={styles.infoCartWrapper}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Task', { task: a })}>
                    <InfoCart localize={localize} tasks={a} />
                </TouchableOpacity>
            </View >
        )
    }
    const searchFilterFunction = text => {
        const newData = arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.object ? item.object.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        if (newData.length == 0) {
            Alert.alert('search not found')
        }
        else {
            settask(newData)
        }
    }


    const _keyExtractor = (item, index) => "tasks" + index.toString();
    return (
        <>
            {
                <View style={[mainStyle.rootView, styles.container]}>
                    <Loader
                        loading={loading} />
                    <_Header header={helpers.getLocale(localize, "tasks", "tasks")}
                        rightIcon={images.menu} rightcb
                        onPress={() => props.navigation.navigate('ChangePassord')}
                        onPress_signout={() => signoutHandler()}
                    />
                    <View >
                        <_InputText
                            style={styles.TextInput}
                            placeholder={helpers.getLocale(localize, "tasks", "search")}
                            editable={false}
                        // onChangeText={value =>
                        //     setsearch(value)
                        //     // searchFilterFunction(value)
                        // }
                        />
                    </View>
                    <View style={styles.tasksListWrapper}>
                        {TaskLoader ? <ActivityIndicator size={large} /> :
                            <>
                                {task.length === 0 &&
                                    <Text style={styles.emptyDataText}> {helpers.getLocale(localize, "tasks", "empty_task")}</Text>}
                                <FlatList
                                    data={task}
                                    renderItem={taskRender}
                                    keyExtractor={_keyExtractor}
                                    removeClippedSubviews={Platform.OS == "android" ? true : false}
                                    scrollToIndex={1}
                                /></>}

                    </View>
                    <View style={[styles.signUpWrapper, { borderWidth: 0 }]}>
                        <View style={styles.signUpView}>
                            <_Button
                                btnTxt={helpers.getLocale(localize, "tasks", "add_task")}
                                callback={() => props.navigation.navigate('NewTask')} />
                        </View>
                    </View>
                </View >}
        </>

    );
};

export default MainHoc(Tasks)

