import {
  Button,
  Card,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Alert, ToastAndroid, StyleSheet, View} from 'react-native';
import {TopNavigationTitleShowcase} from './TopNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  NetworkUtils,
  fetchFormatData,
  getLocalData,
  removeDuplicate,
  saveDataLocal,
} from '../commonFunctions';
import {useScrollToTop} from '@react-navigation/native';
import {Col, Grid, Row} from 'react-native-easy-grid';

export const HomeScreen = props => {
  const [Load, _] = useState<boolean>(false);
  const [SubmitEnable, setSubmitEnable] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [data, SetData] = useState<any[]>([]);
  const [coueseList, SetCoueseList] = useState<string[]>([]);
  const [coueseIndex, SetCoueseIndex] = useState<IndexPath | undefined>();
  const [brachList, SetBrachList] = useState<string[]>([]);
  const [brachIndex, SetBrachIndex] = useState<IndexPath | undefined>();
  const [YearList, SetYearList] = useState<string[]>([]);
  const [YearIndex, SetYearIndex] = useState<IndexPath | undefined>();
  const [TimeList, SetTimeList] = useState<string[]>([]);
  const [TimeIndex, SetTimeIndex] = useState<IndexPath | undefined>();
  const [RoomNoList, SetRoomNoList] = useState<string[]>([]);
  const [RoomNoIndex, SetRoomNoIndex] = useState<IndexPath | undefined>();
  const [VenueList, SetVenueList] = useState<string[]>([]);
  const [VenueIndex, SetVenueIndex] = useState<IndexPath | undefined>();
  const [DayList, SetDayList] = useState<string[]>([]);
  const [DayIndex, SetDayIndex] = useState<IndexPath | undefined>();
  const [result, SetResult] = useState<{label: string; value: string}[]>([]);
  const [mode, Setmode] = useState<number>();

  const ref = React.useRef(null);
  const startUp = async () => {
    const link = await AsyncStorage.getItem('link');
    if (link) {
      const isNetworkAvailable = await NetworkUtils.isNetworkAvailable();
      const linkJSON = JSON.parse(link);
      if (isNetworkAvailable) {
        const Data = await fetchFormatData(linkJSON);
        await saveDataLocal(Data);
      } else {
        ToastAndroid.show(
          'Data may not be up to date as no device has no internet',
          ToastAndroid.LONG,
        );
        // await AsyncStorage.clear();
      }
      const ldata = await getLocalData();

      const LDataJson = JSON.parse(ldata);
      console.log(LDataJson[1]);
      SetData(LDataJson);
      SetCoueseList(removeDuplicate(LDataJson.map(v => v.course)));
      SetBrachList(removeDuplicate(LDataJson.map(v => v.branch)));
      SetDayList(removeDuplicate(LDataJson.map(v => v.day)));
      SetRoomNoList(removeDuplicate(LDataJson.map(v => v.rNo)));
      SetTimeList(removeDuplicate(LDataJson.map(v => v.timings)));
      SetYearList(removeDuplicate(LDataJson.map(v => v.year)));
      SetVenueList(removeDuplicate(LDataJson.map(v => v.venue)));
      // SetCoueseList(data.mao)
    } else {
      Alert.alert('Error', 'no google sheet link available please update now', [
        {
          text: 'Ok',
          onPress: () => props.navigation.navigate('editLink'),
        },
      ]);
    }
  };

  function clearAll(): void {
    Setmode(0);
    SetBrachIndex(undefined);
    SetCoueseIndex(undefined);
    SetRoomNoIndex(undefined);
    SetDayIndex(undefined);
    SetYearIndex(undefined);
    SetTimeIndex(undefined);
    SetVenueIndex(undefined);
    setShowResult(false);
    // useScrollToTop(ref);
  }
  useEffect(validateInput, [
    mode,
    brachIndex,
    coueseIndex,
    RoomNoIndex,
    DayIndex,
    YearIndex,
    TimeIndex,
    VenueIndex,
  ]);

  function validateInput(): void {
    setSubmitEnable(false);
    console.log({DayIndex, TimeIndex});
    if (DayIndex && TimeIndex) {
      if (YearIndex || brachIndex || coueseIndex) {
        if (mode == 2) {
          ToastAndroid.show('camnot use both', ToastAndroid.LONG);
          SetYearIndex(undefined);
          SetBrachIndex(undefined);
        } else {
          if (YearIndex && brachIndex && coueseIndex) {
            setSubmitEnable(true);
            Setmode(1);
          }
        }
      }
      if (RoomNoIndex || VenueIndex) {
        if (mode == 1) {
          ToastAndroid.show('camnot use both', ToastAndroid.LONG);
          SetRoomNoIndex(undefined);
        } else {
          if (RoomNoIndex && VenueIndex) {
            setSubmitEnable(true);
            Setmode(2);
          }
        }
      }
    }
  }
  function startupSync() {
    startUp()
      .then(() => {})
      .catch(() => {});
  }
  useEffect(startupSync, [Load]);
  function submit() {
    if (mode == 0) return;
    if (mode == 1) {
      let Rdata = data.find(
        v =>
          v.course === coueseList[coueseIndex?.row] &&
          v.day === DayList[DayIndex?.row] &&
          v.timings === TimeList[TimeIndex?.row] &&
          v.year === YearList[YearIndex?.row] &&
          v.branch === brachList[brachIndex?.row],
      );
      console.log(
        Rdata,
        coueseList[coueseIndex?.row],
        DayList[DayIndex?.row],
        TimeList[TimeIndex?.row],
        YearList[YearIndex?.row],
        brachList[brachIndex?.row],
      );
      SetResult([
        {label: 'Subject', value: Rdata?.subjectName ?? 'No Class'},
        {label: 'Faculty Member', value: Rdata?.facultyName ?? 'No Class'},
        {label: 'Room No', value: Rdata?.rNo ?? 'No Class'},
        {label: 'Venue', value: Rdata?.venue ?? 'No Class'},
      ]);
      setShowResult(true);
      try {
        useScrollToTop(useRef({scrollToTop: ref.current?.scrollToEnd(true)}));
      } catch {}
    }
    if (mode == 2) {
      let Rdata = data.find(
        v =>
          v.venue === VenueList[VenueIndex?.row] &&
          v.day === DayList[DayIndex?.row] &&
          v.timings === TimeList[TimeIndex?.row] &&
          v.rNo === RoomNoList[RoomNoIndex?.row],
      );
      SetResult([
        {label: 'Subject', value: Rdata?.subjectName ?? 'No Class'},
        {label: 'Faculty Member', value: Rdata?.facultyName ?? 'No Class'},
        {label: 'Year', value: Rdata?.year ?? 'No Class'},
        {label: 'Branch', value: Rdata?.branch ?? 'No Class'},
        {label: 'Course', value: Rdata?.course ?? 'No Class'},
      ]);
      setShowResult(true);
      try {
        useScrollToTop(useRef({scrollToTop: ref.current?.scrollToEnd(true)}));
      } catch {}
    }
  }
  return (
    <>
      <TopNavigationTitleShowcase navigation={props} />
      <ScrollView ref={ref}>
        <Layout style={styles.container}>
          <Card style={styles.card}>
            <Layout style={styles.card}>
              <Select
                style={{width: '50%', paddingRight: '5%'}}
                placeholder={'Day'}
                label={'Select Day'}
                value={DayIndex ? DayList[DayIndex.row] : undefined}
                onSelect={i => {
                  SetDayIndex(i);
                }}
                selectedIndex={DayIndex}>
                {DayList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
              <Select
                style={{width: '60%'}}
                placeholder={'Timing'}
                label={'Select Timing'}
                value={TimeIndex ? TimeList[TimeIndex.row] : undefined}
                onSelect={i => {
                  SetTimeIndex(i);
                }}
                selectedIndex={TimeIndex}>
                {TimeList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
            </Layout>
          </Card>
          <Card style={styles.card}>
            <Layout style={styles.card}>
              <Select
                style={{width: '55%', paddingRight: '5%'}}
                placeholder={'Year'}
                label={'Select Year'}
                value={YearIndex ? YearList[YearIndex.row] : undefined}
                onSelect={i => {
                  SetYearIndex(i);
                }}
                selectedIndex={YearIndex}>
                {YearList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
              <Select
                style={{width: '55%'}}
                placeholder={'Branch'}
                label={'Select Branch'}
                value={brachIndex ? brachList[brachIndex.row] : undefined}
                onSelect={i => {
                  SetBrachIndex(i);
                }}
                selectedIndex={brachIndex}>
                {brachList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
            </Layout>
            <Select
              style={{width: '100%', marginTop: 20, marginBottom: 21}}
              placeholder={'Course'}
              label={'Select Course'}
              value={coueseIndex ? coueseList[coueseIndex.row] : undefined}
              onSelect={i => {
                SetCoueseIndex(i);
              }}
              selectedIndex={coueseIndex}>
              {coueseList.map((c, k) => (
                <SelectItem title={c} key={k} />
              ))}
            </Select>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
            <Layout style={styles.card}>
              <Select
                style={{width: '55%', paddingRight: '5%'}}
                placeholder={'Room.No'}
                label={'Select Room.No'}
                value={RoomNoIndex ? RoomNoList[RoomNoIndex.row] : undefined}
                onSelect={i => {
                  SetRoomNoIndex(i);
                }}
                selectedIndex={RoomNoIndex}>
                {RoomNoList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
              <Select
                style={{width: '60%', paddingRight: '5%'}}
                placeholder={'Venue'}
                label={'Select Venue'}
                value={VenueIndex ? VenueList[VenueIndex.row] : undefined}
                onSelect={i => {
                  SetVenueIndex(i);
                }}
                selectedIndex={VenueIndex}>
                {VenueList.map((c, k) => (
                  <SelectItem title={c} key={k} />
                ))}
              </Select>
            </Layout>
          </Card>
          <Layout style={styles.buttonContainer}>
            <Button
              style={styles.submitBtn}
              disabled={!SubmitEnable}
              onPress={() => {
                submit();
              }}>
              Submit
            </Button>
            <Button status="danger" onPress={clearAll}>
              Clear All
            </Button>
          </Layout>
          {showResult ? (
            <Card style={styles.resultContainer}>
              <Grid>
                {result.map((t, i) => (
                  <Row key={i} style={{marginBottom: '2%'}}>
                    <Col>
                      <Text>{t.label}</Text>
                    </Col>
                    <Col>
                      <Text>{t.value}</Text>
                    </Col>
                  </Row>
                ))}
              </Grid>
            </Card>
          ) : (
            <></>
          )}
        </Layout>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  submitBtn: {
    marginLeft: '5%',
  },
  resultContainer: {
    width: '90%',
    marginBottom: '40%',
  },
  buttonContainer: {
    width: '90%',
    marginTop: '10%',
    marginBottom: '20%',
    flex: 1,
    flexDirection: 'row-reverse',
    alignContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  card: {
    flex: 1,
    marginTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    width: '90%',
    height: '90%',
  },
  or: {
    alignContent: 'center',
    textAlign: 'center',
  },
});
