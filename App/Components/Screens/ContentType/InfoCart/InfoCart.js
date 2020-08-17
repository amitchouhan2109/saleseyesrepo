import React, { Component, useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, } from '../../../../Config';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
// import { mainLayoutHoc } from '../../../../../hoc';
import { mainStyle, images, sty } from '../../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../../Config/Libs/globals';
import MainHoc from '../../../Hoc/MainHoc';
import _Button from '../../../Custom/Button/_Button';
import _Header from '../../../Custom/Header/_Header';


const InfoCart = (props) => {
    const localize = useSelector(state => state.localize);
    // const [taskno, settaskno] = useState("");
    // const [userName, setuserName] = useState("");
    // const [address, setaddress] = useState("");
    // const [title, settitle] = useState("");
    // const [status, setstatus] = useState("");
    // const [taskDate, settaskDate] = useState("");

    const Tasks = props.tasks.item
    const date = Tasks.start_date
    const Date = date.split(' ')[0]
    const name = Tasks.object.split(',')[0]
    const taskno = Tasks.id
    const status = Tasks.status
    const userName = name
    const address = Tasks.address
    const title = Tasks.title
    const taskDate = Date





    const infoRow = (tag, value, fontStyle = {}) => {
        return (
            <View style={{ ...sty.fRow, }}>
                <View style={styles.column1Wrapper}>
                    <Text allowFontScaling={false} style={[styles.column1Text]}>{helpers.getLocale(props.localize, "task", tag) + ":"}</Text>
                </View >
                <View style={styles.column2Wrapper}>
                    <Text allowFontScaling={false} style={[
                        styles.column2Text
                        , fontStyle]}>{value}</Text>
                </View >
            </View>
        )
    }

    return (
        <View style={[styles.container, { paddingVertical: 5, borderWidth: 0 }]}>
            {infoRow("task_no", taskno, { fontWeight: "bold", fontFamily: "MyriadPro-Semibold" })}
            {infoRow("name", userName)}
            {infoRow("address", address)}
            {infoRow("title", title)}
            {infoRow("status", status, { color: "blue" })}
            {infoRow("task_date", taskDate)}
            {/* {infoRow("description", "Test")} */}

        </View >

    );

};

export default InfoCart;

