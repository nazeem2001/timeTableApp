import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import MYLogo from '../assrts/MyLogo.png';
import {Image} from 'react-native';

export const Logo = prop => {
  return (
    <Layout style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: '5%'}}>
      <Text category="p2">powered by</Text>
      <Image source={MYLogo} />
    </Layout>
  );
};
