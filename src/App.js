/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    PermissionsAndroid
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';


const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [locaPermission,setLocaPermission] = useState(null);

    const requestLocationPermission = async () =>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        console.log(granted);
        setLocaPermission(granted);
    }

    useEffect(()=>{
        requestLocationPermission();
    },[])


    return (
        <>
            {locaPermission==null?
                    (
                        <></>
                    )
                :
                    (locaPermission?
                                (
                                    <NavigationContainer>
                                        <AppNavigation/>
                                    </NavigationContainer>
                                )

                            :
                                (
                                    <></>
                                )

                        )

            }

        </>
    );
};


export default App;
