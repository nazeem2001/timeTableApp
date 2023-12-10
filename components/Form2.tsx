import {
  IndexPath,
  Card,
  Layout,
  Autocomplete,
  AutocompleteItem,
} from '@ui-kitten/components';
import * as React from 'react';
import SelectComponent from './SelectComp';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-svg';

export interface Form2Props {
  semIndex: IndexPath | undefined;
  semList: string[];
  SetSemIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  accYearIndex: IndexPath | undefined;
  accYearList: string[];
  SetAccYearIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  FacultyIndex: IndexPath | undefined;
  FacultyList: string[];
  SetFacultyIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
  logovisible: boolean;
}

export function Form2(props: Form2Props) {
  const [filteredFacultyList, setFilteredFacultyList] = React.useState<
    string[]
  >(props.FacultyList);
  return (
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
          style={{width: '110%'}}
          placeholder="Semester"
          label="Select Semester"
          Index={props.semIndex}
          List={props.semList}
          setIndex={props.SetSemIndex}
        />
      </Layout>
      <Layout style={styles.layout}>
        <SelectComponent
          style={{width: '110%'}}
          placeholder={'Faculty'}
          label={'Select Faculty'}
          Index={props.FacultyIndex}
          List={props.FacultyList}
          setIndex={props.SetFacultyIndex}
        />
      </Layout>
    </Card>
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
