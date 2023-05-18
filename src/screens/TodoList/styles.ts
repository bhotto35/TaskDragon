import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchBar:{
        position:'absolute',
        height:50
    },
    listBackGround:{
        backgroundColor: '#212121',
        flex:1,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    emptyMessage:{
        marginTop:50,
        backgroundColor: 'rgb(80,80,100)',
        padding:10,
        borderRadius:5,
        color:'white'
    },
    listContainer: {
        backgroundColor: '#212121',
        paddingVertical: 3,
        paddingHorizontal:3,
        display:'flex',
        width:'99%',
        borderRadius:12,
        alignSelf:"center"
        /*justifyContent:'center',
        alignItems:'center'*/
    },
    containerStyle:{
        display:'flex',
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'center'
    },
    doneIcon:{
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6,
        flex:1,
        // backgroundColor:'white',
        paddingLeft:5,
        paddingRight:0,
        alignItems:'center',
        justifyContent:'center'
    },
    listTextBox:{
        flex:7,
        backgroundColor:'white',
        paddingVertical:0,
        paddingRight:5,
        justifyContent:'center'
    },
    doneBox:{
        backgroundColor:'rgb(100,100,100)',
        color:'rgb(250,250,250)'
    },
    doneText:{
        textDecorationLine:'line-through',
        color:'rgb(250,250,250)'
    },
    listText: {
        fontSize: 18,
        flex:1,
        color:'black'
    },
    dateMessage: {
        fontSize: 15,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    deleteOpacity:{
        backgroundColor:'rgb(242,87,95)',
        //borderTopRightRadius:6,
        //borderBottomRightRadius:6,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        padding:5
    },
    moveOpacity:{
        // backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderColor:'lightgray',
        borderWidth:1,
        padding:5
    },
    moveUp:{
        borderTopRightRadius:6,
        borderBottomColor:'white'
    },
    moveUpInactive:{
        borderTopRightRadius:6,
        borderBottomColor:'white'
    },
    moveDown:{
        borderTopColor:'white',
        borderBottomRightRadius:6,
    },
    moveDownInactive:{
        borderTopRightRadius:6,
        borderBottomColor:'white'
    },
    actionOpacity:{
        borderTopRightRadius:6,
        borderBottomRightRadius:6,
        //alignItems:'center',
        justifyContent:'center',
        flex:1,
        display:'flex',
        flexDirection:'column',
    }
});