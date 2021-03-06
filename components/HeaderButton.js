import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Platform from 'react-native';
import React from 'react';


const CustomHeaderButton = props => {
    return (<HeaderButton {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === 'ios' ? Colors.primary : 'white'}

    />
    );
};
export default CustomHeaderButton;