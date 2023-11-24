import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import MYLogo from '../assrts/MyLogo.png';
import {Image} from 'react-native';

export const Logo = prop => {
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        paddingBottom: '6%',
      }}>
      <Text category="p2">powered by</Text>
      <Image source={MYLogo} style={{height: 20, resizeMode: 'contain'}} />
    </Layout>
  );
};
