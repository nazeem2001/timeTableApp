import {Layout, IndexPath, Card} from '@ui-kitten/components';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import SelectComponent from './SelectComp';

export interface Form1Props {
  accYearIndex: IndexPath | undefined;
  accYearList: string[];
  SetAccYearIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  DayIndex: IndexPath | undefined;
  DayList: string[];
  SetDayIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  TimeIndex: IndexPath | undefined;
  TimeList: string[];
  SetTimeIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  courseIndex: IndexPath | undefined;
  courseList: string[];
  SetCourseIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  branchIndex: IndexPath | undefined;
  branchList: string[];
  SetBranchIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  YearIndex: IndexPath | undefined;
  YearList: string[];
  SetYearIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  semIndex: IndexPath | undefined;
  semList: string[];
  SetSemIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  RoomNoIndex: IndexPath | undefined;
  RoomNoList: string[];
  SetRoomNoIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  VenueIndex: IndexPath | undefined;
  VenueList: string[];
  SetVenueIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  logovisible: boolean;
}

export function Form1(props: Form1Props) {
  return (
    <>
      <Card
        style={{
          ...styles.card,
        }}>
        <Layout style={styles.layout}>
          <SelectComponent
            style={{width: '110%'}}
            placeholder="Acadamic Year"
            label="Select Academic Year"
            Index={props.accYearIndex}
            List={props.accYearList}
            setIndex={props.SetAccYearIndex}
          />
        </Layout>
        <Layout style={styles.layout}>
          <SelectComponent
            style={{width: '50%', paddingRight: '5%'}}
            placeholder="Day"
            label="Select Day"
            Index={props.DayIndex}
            List={props.DayList}
            setIndex={props.SetDayIndex}
          />
          <SelectComponent
            style={{width: '60%'}}
            placeholder={'Timing'}
            label={'Select Timing'}
            Index={props.TimeIndex}
            List={props.TimeList}
            setIndex={props.SetTimeIndex}
          />
        </Layout>
      </Card>
      <Card style={styles.card}>
        <Layout style={styles.layout}>
          <SelectComponent
            style={{width: '55%', paddingRight: '5%'}}
            placeholder={'Course'}
            label={'Select Course'}
            Index={props.courseIndex}
            List={props.courseList}
            setIndex={props.SetCourseIndex}
          />
          <SelectComponent
            style={{width: '55%'}}
            placeholder={'Branch'}
            label={'Select Branch'}
            Index={props.branchIndex}
            List={props.branchList}
            setIndex={props.SetBranchIndex}
          />
        </Layout>

        <Layout style={{...styles.layout, marginBottom: 23}}>
          <SelectComponent
            style={{width: '55%', paddingRight: '5%'}}
            placeholder={'Year'}
            label={'Select Year'}
            Index={props.YearIndex}
            List={props.YearList}
            setIndex={props.SetYearIndex}
          />
          <SelectComponent
            style={{width: '55%'}}
            placeholder={'Semester'}
            label={'Select Semester'}
            Index={props.semIndex}
            List={props.semList}
            setIndex={props.SetSemIndex}
          />
        </Layout>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <Layout style={styles.layout}>
          <SelectComponent
            style={{width: '55%', paddingRight: '5%'}}
            placeholder={'Room.No'}
            label={'Select Room.No'}
            Index={props.RoomNoIndex}
            List={props.RoomNoList}
            setIndex={props.SetRoomNoIndex}
          />
          <SelectComponent
            style={{width: '60%', paddingRight: '5%'}}
            placeholder={'Venue'}
            label={'Select Venue'}
            Index={props.VenueIndex}
            List={props.VenueList}
            setIndex={props.SetVenueIndex}
          />
        </Layout>
        <Layout style={styles.layout}>
          <SelectComponent
            style={{width: '110%'}}
            placeholder={'Semester'}
            label={'Select Semester'}
            Index={props.semIndex}
            List={props.semList}
            setIndex={props.SetSemIndex}
          />
        </Layout>
      </Card>
    </>
  );
}
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
