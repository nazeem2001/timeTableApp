import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Layout, Spinner} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {ImageProps, StyleSheet, View, Alert} from 'react-native';
import React from 'react';
import {TopNavigationTitleShowcase} from './TopNav';
import {Button} from '@ui-kitten/components';
import {NetworkUtils, fetchFormatData, saveDataLocal} from '../commonFunctions';
import {Logo} from './logo';
import {CommonActions} from '@react-navigation/native';

export const EditLinkScreen = props => {
  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" status="control" />
    </View>
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnEnable, setBtnEnable] = useState<boolean>(false);
  const [startUp, setStartUp] = useState<boolean>(false);
  const [link, setLink] = useState<{sheetId?: string; spreadsheetId?: string}>(
    {},
  );
  function startupSync() {
    startUpFn()
      .then(() => {})
      .catch(() => {});
  }
  useEffect(startupSync, [startUp]);
  const startUpFn = async () => {
    const isNetworkAvailable = await NetworkUtils.isNetworkAvailable();
    if (!isNetworkAvailable) {
      Alert.alert('Error', 'Please Connect to Internet and Try again', [
        {
          text: 'Ok',
          onPress: () => setStartUp(!startUp),
          style: 'cancel',
        },
      ]);
    }
  };
  const editLink = async () => {
    setIsLoading(true);
    AsyncStorage.setItem('link', JSON.stringify(link))
      .then(() => {
        AsyncStorage.getItem('link').then(() => {});
      })
      .catch(() => {});
    let data = await fetchFormatData(link);
    if (data.success) {
      // data.table.shift();
      saveDataLocal(data);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      Alert.alert('Error', data.resson, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
  };
  const validateLink = val => {
    const currentVal: string = val.nativeEvent.text;
    const spreadsheetId: string[] | null = new RegExp(
      '/spreadsheets/d/([a-zA-Z0-9-_]+)',
    ).exec(currentVal);
    const sheetId: string[] | null = new RegExp('[#&]gid=([0-9]+)').exec(
      currentVal,
    );
    setBtnEnable(false);
    if (sheetId && spreadsheetId) {
      setLink({
        sheetId: sheetId[0].substring(5),
        spreadsheetId: spreadsheetId[0].substring(16),
      });
      setBtnEnable(true);
    }
  };
  return (
    <>
      <TopNavigationTitleShowcase navigation={props} />
      <Layout style={styles.container}>
        <Input label={'Google Sheets Link'} onChange={validateLink} />
        <Button
          style={styles.button}
          onPress={editLink}
          disabled={!btnEnable}
          accessoryRight={isLoading ? LoadingIndicator : () => <></>}>
          Update Link
        </Button>
      </Layout>
      <Layout style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Logo />
      </Layout>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  button: {
    marginTop: 30,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
