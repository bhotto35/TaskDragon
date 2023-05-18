import React, { useEffect } from "react";
import { todo } from "../../../utils/global-interfaces"
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../styles";
import { useDispatch } from "react-redux";
import { deleteTodo, moveDown, moveUp, toggleTodo } from "../../../actions/todo";

interface propTypes {

    item: todo,
    index: number,
    searchKey: string,
    navigation: any,
    dummyVar:boolean,
    setDummyVar: React.Dispatch<React.SetStateAction<boolean>>
}

function timeDiff(dc_as_date: Date, suffix?: string) {
    try {
        let curr_date = new Date()
        let date_diff = curr_date.getTime() - dc_as_date.getTime();
        const max_diffs = [
            { diff: 365 * 24 * 60 * 60 * 1000, unit: "year" },
            { diff: 30 * 24 * 60 * 60 * 1000, unit: "month" },
            { diff: 7 * 24 * 60 * 60 * 1000, unit: "week" },
            { diff: 24 * 60 * 60 * 1000, unit: "day" },
            { diff: 60 * 60 * 1000, unit: "hour" },
            { diff: 60 * 1000, unit: "minute" }
        ]
        for (let i = 0; i < max_diffs.length; i++) {
            let curr_diff = date_diff / max_diffs[i].diff
            // console.log(curr_diff, max_diffs[i].unit)
            if (Math.abs(curr_diff) >= 1) {
                let curr_diff_to_show = Math.ceil(Math.abs(curr_diff))
                suffix = !suffix ? date_diff > 0 ? "past" : "left" : "old"
                return `${curr_diff_to_show} ${max_diffs[i].unit}${curr_diff_to_show > 1 ? 's' : ''} ${suffix}`
            }
        }
        return date_diff > 0 ? "Just now" : "Soon"
    }
    catch (err: any) {
        console.log(err.message)
        return "Hmm"
    }
}

const keyFound = (item: todo, searchKey: string) => {

    let itemName = item.name.toUpperCase();
    let searchItem = searchKey.toUpperCase();
    if (itemName.includes(searchItem)) {
        //console.log('found');
        return 'flex';
    }
    else {
        //console.log('not found');
        return 'none';
    }

}

const isTimeLeft = (deadline: Date) => {
    try {
        let curr_date = new Date()
        let date_diff = curr_date.getTime() - deadline.getTime();
        return date_diff > 0 ? "red" : "green"
    }
    catch (err: any) {
        console.log(err.message)
        return "Hmm"
    }
}

const RenderItem = ({ item, index, searchKey, navigation, dummyVar, setDummyVar }: propTypes) => {
    const dispatch = useDispatch();

    const deleteCurrent = (key: number) => {
        Alert.alert(
            "Delete Task",
            "Proceed?",
            [
                {
                    text: "No, Go Back",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => dispatch(deleteTodo(key)) }
            ]
        );
    }

    const moveUpCurrent = (index: number) => {
        dispatch(moveUp(index));
        setDummyVar(!dummyVar)
    }
    const moveDownCurrent = (index: number) => {
        dispatch(moveDown(index));
        setDummyVar(!dummyVar)
    }
    const toggleCurrent = (key: number) => {
        dispatch(toggleTodo(key))
        setDummyVar(!dummyVar)
    };
    return (
        <View style={[styles.listContainer, { display: keyFound(item, searchKey), backgroundColor: item.doneState ? "rgb(100,100,100)" : "white" }]}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.doneIcon]} onPress={() => { toggleCurrent(item.key) }}>
                    {
                        item.doneState ?
                            <Icon name="check-circle-o" color="rgb(141,255,15)" size={25} />
                            :
                            <IconM name="radio-button-off" color="rgb(200,200,200)" size={25} />
                    }
                </TouchableOpacity>
                <View style={[styles.listTextBox, item.doneState === false ? null : styles.doneBox]}>
                    <TouchableOpacity onPress={() => navigation.navigate('TodoEdit', { index: index })}>
                        <Text style={[styles.listText, !item.doneState ? null : styles.doneText]}>{item.name}</Text>
                        <View style={styles.dateMessage}>
                            <Text style={[{ color: 'gray', marginRight: 5 }, !item.doneState ? null : styles.doneText]}>
                                {timeDiff(new Date(item.dateCreated), "old")}
                            </Text>
                            <Icon name="circle" color="gray" size={8} />
                            {item.hasDeadline && !item.doneState ?
                                <Text style={{ color: isTimeLeft(new Date(item.deadline)), marginLeft: 5 }}>
                                    {timeDiff(new Date(item.deadline))}
                                </Text> : null
                            }
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.actionOpacity}>
                    <TouchableOpacity onPress={() => { moveUpCurrent(index) }}
                        style={[styles.moveOpacity, styles.moveUp]}>
                        <Icon name="angle-up" color="black" size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteCurrent(item.key)}
                        style={styles.deleteOpacity}>
                        <Icon name="trash" color="white" size={19} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { moveDownCurrent(index) }}
                        style={[styles.moveOpacity, styles.moveDown]}>
                        <Icon name="angle-down" color="black" size={15} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default RenderItem