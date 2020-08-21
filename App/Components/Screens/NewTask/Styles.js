import { StyleSheet, Platform } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';

export default styles = StyleSheet.create({

    container: {
        // backgroundColor: "#fff",
        // ...sty.flex1
        marginHorizontal: 15
    },
    TextInput: {
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        fontFamily: fonts.fontFamily.Regular
    },
    TextInput1: {
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        fontFamily: fonts.fontFamily.Regular,


    },
    signUpWrapper: {
        flex: 1,
        paddingBottom: 20,
        ...sty.jEnd,
        ...sty.aCenter
    },
    signUpView: {
        borderWidth: 0,
        marginTop: 20,
        width: "100%"
    },
    signUp: {
        ...sty.fRow,
        paddingTop: 0,
        paddingLeft: 0,
        borderWidth: 0,
        width: "60%",
        ...sty.aCenter,
        borderWidth: 0
    },
    signUpText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold",
        fontFamily: fonts.fontFamily.Regular
    },
    uploadDocWrapper: {
        paddingVertical: 3,
        paddingHorizontal: 15,
    },
    text: {
        color: colors.text,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: fonts.fontFamily.Regular

    },
    pairButton: {
        borderTopWidth: 0,
        paddingVertical: 2
    },
    pairButtonIcon: {
        height: 35, width: 35
    }


});
