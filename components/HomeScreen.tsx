import {Button, IndexPath, Layout, Text} from '@ui-kitten/components';
import {
  Alert,
  ToastAndroid,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
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
import {Logo} from './logo';
import InvalidLogo from '../assrts/InvalidLink.png';
import SelectComponent from './SelectComp';
import {ResultT1} from './ResultT1';
import {Form1} from './Form1';
import {FacultyResultType, formNames} from '../constants';
import {Form2} from './Form2';
import {PageProps} from '../App';

export const HomeScreen = (props: PageProps<'Home'>) => {
  const [Load, _] = useState<boolean>(false);
  const [SubmitEnable, setSubmitEnable] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [data, SetData] = useState<any[]>([]);
  const [courseList, SetCourseList] = useState<string[]>([]);
  const [courseIndex, SetCourseIndex] = useState<IndexPath | undefined>();
  const [branchList, SetBranchList] = useState<string[]>([]);
  const [semList, SetSemList] = useState<string[]>([]);
  const [semIndex, SetSemIndex] = useState<IndexPath | undefined>();
  const [accYearList, SetAccYearList] = useState<string[]>([]);
  const [accYearIndex, SetAccYearIndex] = useState<IndexPath | undefined>();
  const [branchIndex, SetBranchIndex] = useState<IndexPath | undefined>();
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
  const [logoLink, setLogoLink] = useState<string>('');
  const [logo, setLogo] = useState<ImageSourcePropType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [FacultyList, SetFacultyList] = useState<string[]>([]);
  const [FacultyIndex, SetFacultyIndex] = useState<IndexPath | undefined>();
  const [FormIndex, setFormIndex] = useState<IndexPath | undefined>(
    new IndexPath(0),
  );
  const [FormList, setFormList] = useState<string[]>(formNames);
  let opt = FormIndex?.row;
  useEffect(() => {
    opt = FormIndex?.row;
    if (opt == 1) {
      Setmode(3);
    } else {
      Setmode(1);
    }
  }, [FormIndex]);
  const ref = React.useRef(null);
  useEffect(() => {
    setAccYearDefault();
  }, [accYearList]);
  const startUp = async () => {
    const link = await AsyncStorage.getItem('link');
    if (link) {
      const isNetworkAvailable = await NetworkUtils.isNetworkAvailable();
      const linkJSON = JSON.parse(link);
      await setOptions();
      if (isNetworkAvailable) {
        setIsLoading(true);
        const Data = await fetchFormatData(linkJSON);

        await saveDataLocal(Data);
      } else {
        ToastAndroid.show(
          'Data may not be up to date as no device has no internet',
          ToastAndroid.LONG,
        );
        // await AsyncStorage.clear();
      }
      await setOptions();
      setIsLoading(false);
      // SetCoueseList(data.mao)
    } else {
      Alert.alert('Error', 'no google sheet link available please update now', [
        {
          text: 'Ok',
          onPress: () => props.navigation.navigate('editLink'),
        },
      ]);
    }

    async function setOptions() {
      const ldata = await getLocalData();

      const LDataJson = JSON.parse(ldata);
      console.log(LDataJson[1]);
      SetData(LDataJson);
      setLogoLink(
        removeDuplicate(LDataJson.map(v => v.logoLink)).find(v => !!v) ?? '',
      );
      setLogo(
        {
          uri: removeDuplicate(LDataJson.map(v => v.logoLink)).find(v => !!v),
        } ?? {uri: ''},
      );
      console.log(logoLink);
      SetCourseList(removeDuplicate(LDataJson.map(v => v.course)));
      SetBranchList(removeDuplicate(LDataJson.map(v => v.branch)).sort());
      SetDayList(removeDuplicate(LDataJson.map(v => v.day)));
      SetRoomNoList(removeDuplicate(LDataJson.map(v => v.rNo)).sort());
      SetTimeList(removeDuplicate(LDataJson.map(v => v.timings)));
      SetYearList(removeDuplicate(LDataJson.map(v => v.year)));
      SetVenueList(removeDuplicate(LDataJson.map(v => v.venue)).sort());
      SetSemList(removeDuplicate(LDataJson.map(v => v.sem)));
      SetAccYearList(removeDuplicate(LDataJson.map(v => v.ay)));
      SetFacultyList(
        removeDuplicate(
          LDataJson.map(v => v.facultyName)
            .map((v: string) => v?.split('/').map(v => v.trim()))
            .flat(),
        ).sort(),
      );
    }
  };

  function clearAll(): void {
    Setmode(0);
    SetBranchIndex(undefined);
    SetCourseIndex(undefined);
    SetRoomNoIndex(undefined);
    SetDayIndex(undefined);
    SetYearIndex(undefined);
    SetTimeIndex(undefined);
    SetVenueIndex(undefined);
    SetAccYearIndex(undefined);
    SetSemIndex(undefined);
    SetFacultyIndex(undefined);
    setShowResult(false);
    setAccYearDefault();
    // useScrollToTop(ref);
  }
  useEffect(validateInput, [
    mode,
    branchIndex,
    courseIndex,
    RoomNoIndex,
    DayIndex,
    YearIndex,
    TimeIndex,
    accYearIndex,
    semIndex,
    VenueIndex,
    FacultyIndex,
  ]);

  function validateInput(): void {
    setSubmitEnable(false);
    console.log({
      DayIndex,
      TimeIndex,
      accYearIndex,
      YearIndex,
      brachIndex: branchIndex,
      coueseIndex: courseIndex,
      RoomNoIndex,
      semIndex,
      VenueIndex,
      FacultyIndex,
      mode,
    });
    if (DayIndex && TimeIndex && accYearIndex && semIndex) {
      if (YearIndex || branchIndex || courseIndex) {
        if (mode === 2) {
          ToastAndroid.show('camnot use both', ToastAndroid.LONG);
          SetYearIndex(undefined);
          SetBranchIndex(undefined);
          console.log('no m1');
        } else {
          if (YearIndex && branchIndex && courseIndex) {
            setSubmitEnable(true);
            Setmode(1);
            console.log('m1');
          }
        }
      }
      if (RoomNoIndex || VenueIndex) {
        if (mode === 1) {
          ToastAndroid.show('Cannot use both', ToastAndroid.LONG);
          SetRoomNoIndex(undefined);
          SetVenueIndex(undefined);
          console.log('no m2');
        } else {
          if (RoomNoIndex && VenueIndex) {
            setSubmitEnable(true);
            Setmode(2);
            console.log('m2');
          }
        }
      }
    }
    if (mode === 3 && accYearIndex && semIndex && FacultyIndex) {
      setSubmitEnable(true);
      console.log('m3');
    }
  }
  function startupSync() {
    startUp()
      .then(() => {})
      .catch(() => {});
  }
  useEffect(startupSync, [Load]);
  function submit() {
    if (mode === 0) {
      return;
    }
    console.log(mode);
    if (mode == 1) {
      let Rdata = data.find(
        v =>
          v.course === courseList[courseIndex?.row] &&
          v.day === DayList[DayIndex?.row] &&
          v.timings === TimeList[TimeIndex?.row] &&
          v.year === YearList[YearIndex?.row] &&
          v.ay === accYearList[accYearIndex?.row] &&
          v.sem === semList[semIndex?.row] &&
          v.branch === branchList[branchIndex?.row],
      );
      console.log(
        Rdata,
        courseList[courseIndex?.row],
        DayList[DayIndex?.row],
        TimeList[TimeIndex?.row],
        YearList[YearIndex?.row],
        branchList[branchIndex?.row],
      );
      SetResult([
        {label: 'Subject', value: Rdata?.subjectName ?? 'No Class'},
        {label: 'Faculty', value: Rdata?.facultyName ?? 'No Class'},
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
          v.ay === accYearList[accYearIndex?.row] &&
          v.sem === semList[semIndex?.row] &&
          v.timings === TimeList[TimeIndex?.row] &&
          v.rNo === RoomNoList[RoomNoIndex?.row],
      );
      SetResult([
        {label: 'Subject', value: Rdata?.subjectName ?? 'No Class'},
        {label: 'Faculty', value: Rdata?.facultyName ?? 'No Class'},
        {label: 'Year', value: Rdata?.year ?? 'No Class'},
        {label: 'Branch', value: Rdata?.branch ?? 'No Class'},
        {label: 'Course', value: Rdata?.course ?? 'No Class'},
      ]);
      setShowResult(true);
      try {
        useScrollToTop(useRef({scrollToTop: ref.current?.scrollToEnd(true)}));
      } catch {}
    }
    if (mode === 3) {
      let Rdata = data.filter(
        v =>
          v.ay === accYearList[accYearIndex?.row] &&
          v.sem === semList[semIndex?.row] &&
          (v.facultyName as string)
            ?.toLowerCase()
            .includes(FacultyList[FacultyIndex?.row].toLowerCase()),
      );
      console.log(Rdata);
      if (!Rdata.length) {
        Alert.alert('Error', 'No Classes Found', [
          {
            text: 'Ok',
            onPress: () => clearAll(),
          },
        ]);
        return;
      }
      let dataNav: FacultyResultType = [];
      const tempList = [];
      tempList.push('null');
      for (let j = 0; j < TimeList.length; j++) {
        tempList.push(`P-${j + 1}`);
      }
      dataNav.push(tempList);
      for (let i = 0; i < DayList.length; i++) {
        const list = [];
        list.push(DayList[i].slice(0, 3));
        console.log(TimeList);
        for (let j = 0; j < TimeList.length; j++) {
          list.push('null');
        }
        dataNav.push(list);
      }
      Rdata.forEach(iteam => {
        dataNav[DayList.indexOf(iteam.day) + 1][
          TimeList.indexOf(iteam.timings) + 1
        ] = {
          time: iteam.timings,
          subject: iteam.subjectName,
          venue: iteam.venue,
          roomNo: iteam.rNo,
          day: iteam.day,
        };
      });
      console.log(dataNav);
      props.navigation.navigate('result2', {
        data: dataNav,
        FacultyName: FacultyList[FacultyIndex?.row],
      });
    }
  }
  function fallBackImage(): void {
    setLogo(InvalidLogo);
  }
  function renderForm(input: number): React.JSX.Element {
    switch (input) {
      case 1:
        return (
          <Form2
            FacultyIndex={FacultyIndex}
            FacultyList={FacultyList}
            SetAccYearIndex={SetAccYearIndex}
            SetFacultyIndex={SetFacultyIndex}
            SetSemIndex={SetSemIndex}
            accYearIndex={accYearIndex}
            accYearList={accYearList}
            logovisible={!!logoLink}
            semIndex={semIndex}
            semList={semList}
          />
        );

      case 0:
      default:
        return (
          <Form1
            logovisible={!!logoLink}
            DayIndex={DayIndex}
            DayList={DayList}
            RoomNoIndex={RoomNoIndex}
            RoomNoList={RoomNoList}
            SetAccYearIndex={SetAccYearIndex}
            SetBranchIndex={SetBranchIndex}
            SetCourseIndex={SetCourseIndex}
            SetDayIndex={SetDayIndex}
            SetRoomNoIndex={SetRoomNoIndex}
            SetSemIndex={SetSemIndex}
            SetTimeIndex={SetTimeIndex}
            SetVenueIndex={SetVenueIndex}
            SetYearIndex={SetYearIndex}
            TimeIndex={TimeIndex}
            TimeList={TimeList}
            VenueIndex={VenueIndex}
            VenueList={VenueList}
            YearIndex={YearIndex}
            YearList={YearList}
            accYearIndex={accYearIndex}
            accYearList={accYearList}
            branchIndex={branchIndex}
            branchList={branchList}
            courseIndex={courseIndex}
            courseList={courseList}
            semIndex={semIndex}
            semList={semList}
          />
        );
    }
  }
  function setAccYearDefault() {
    let maxV: number = 0;
    for (let i = 0; i < accYearList.length; i++) {
      if (accYearList[i] > accYearList[maxV]) {
        maxV = i;
      }
    }
    SetAccYearIndex(new IndexPath(maxV));
  }

  return (
    <>
      <TopNavigationTitleShowcase navigation={props} isLoading={isLoading} />
      <ScrollView ref={ref}>
        <Layout style={styles.container}>
          {!!logoLink && (
            <Image
              source={logo}
              style={{
                width: '100%',
                height: 110,
                resizeMode: 'contain',
                marginTop: 10,
              }}
              onError={fallBackImage}
            />
          )}
          <Layout
            style={{
              flex: 1,
              alignItems: 'flex-start',
              width: '90%',
              paddingBottom: '2%',
              marginTop: logoLink ? 20 : styles.card.marginTop,
            }}>
            <Text category="h6">Select Option</Text>
          </Layout>
          <SelectComponent
            Index={FormIndex}
            List={FormList}
            placeholder="Select option"
            setIndex={setFormIndex}
            style={{width: '90%'}}
          />
          {renderForm(opt)}

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
            <ResultT1 style={styles.resultContainer} result={result} />
          ) : (
            <></>
          )}
        </Layout>
        {/* <Layout style={{paddingBottom: 50}}> */}
        <Logo />
        {/* </Layout> */}
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
  layout: {
    flex: 1,
    marginTop: 13,
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
