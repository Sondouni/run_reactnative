import * as React from 'react';
import {useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from 'react-native-geolocation-service';


export interface Props {
    navigation: any;
}

function Main({navigation}: any) {


    const [nickName,setNickName] = useState(null);
    const [tempNickName,setTempNickName] = useState('');
    const [curLoca,setCurLoca] = useState(null);

    useEffect(()=>{
        checkNickName();
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    },[]);

    const checkNickName = async () => {
        const storedNickName = await AsyncStorage.getItem('nickName');
        console.log(storedNickName);
        if(storedNickName){
            setNickName(storedNickName);
        }
    }

    const mapView = () => {
        return(
            <View style={{flex:1}}>
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        )
    }


    const needNickName = () => {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View>
                    <Text>
                        닉네임을 입력해주세요
                    </Text>
                </View>
                <View>
                    <TextInput
                        value={tempNickName}
                        onChangeText={(str)=>{
                            console.log(str);
                            setTempNickName(str);
                        }}
                        placeholder={'닉네임'}
                    />
                </View>
                <TouchableOpacity
                    onPress={async ()=>{
                        if(tempNickName!=''){
                            console.log('TEST');
                            await AsyncStorage.setItem('nickName',tempNickName);
                            setNickName(tempNickName);
                        }
                    }}
                >
                    <View style={{backgroundColor:'black',borderRadius:15,height:40,width:100,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:14}}>
                            확인
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {nickName!=null?
                    (
                        nickName==''?
                            needNickName()
                            :
                            mapView()
                    )
                :
                    (
                        <></>
                    )

            }
        </>
    );
}

export default Main;
