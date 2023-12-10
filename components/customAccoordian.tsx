import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Text, Card, Layout, Modal} from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import DOWN_ARROW from '../assrts/down.png';
import {FacultyResultType, resultType2} from '../constants';
import Accordion from 'react-native-collapsible/Accordion';
import DataGrid from './DataGrid';
import {View} from 'react-native';

interface CustomAaccordianProps {
  data: FacultyResultType;
  activeSections: any;
  setActiveSections: (value: React.SetStateAction<any>) => void;
}

const CustomAaccordian = (props: CustomAaccordianProps) => {
  function renderContent(section: resultType2[], _, isActive) {
    return (
      <>
        {section.map(preiod => (
          <Card key={Math.random()} style={{marginBottom: 8}}>
            <DataGrid data={preiod} />
          </Card>
        ))}
      </>
    );
  }
  function renderHeader(section: resultType2[], _, isActive) {
    return (
      <Animatable.View style={{flexDirection: 'row'}} animation={'fadeInDown'}>
        <Text
          category="h6"
          style={{marginBottom: 4, marginRight: '45%', flex: 1}}>
          {section[0].day}
        </Text>
        <Animatable.Image
          source={DOWN_ARROW}
          style={{
            height: '100%',
            flex: 1,
            resizeMode: 'center',
            alignSelf: 'flex-end',
          }}
        />
      </Animatable.View>
    );
  }
  const setSections = sections => {
    //setting up a active section state
    props.setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  return (
    <Accordion
      sections={props.data}
      activeSections={props.activeSections}
      renderHeader={renderHeader}
      underlayColor="#ff00000"
      renderContent={renderContent}
      onChange={setSections}
    />
  );
};
export default CustomAaccordian;

const styles = StyleSheet.create({
  container: {},
});
