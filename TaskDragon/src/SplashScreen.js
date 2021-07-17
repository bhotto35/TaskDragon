import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  //Text,
  Image
} from 'react-native'
import * as Animatable from 'react-native-animatable';
//import Icon from 'react-native-vector-icons/FontAwesome';
const Splash = ()=>{
    return(
        <View style={style.container}>
            <Image
                style={style.image}
                source={require('./assets/taskdragon_icon.png')}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#212121'
    },
    image: {
        width: 150,
        height: 150,
        borderColor: 'rgb(177,116,222)',
        borderWidth: 2,
        borderRadius: 100,
    }
})
export default Splash;