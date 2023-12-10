import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {PageProps} from '../App';
import {Button, Text, Card, Layout, Modal} from '@ui-kitten/components';
import {resultType2} from '../constants';
import DataGrid from './DataGrid';
import CustomAaccordian from './customAccoordian';
import {TopNavigationTitleShowcase} from './TopNav';
import {Logo} from './logo';
import * as Animatable from 'react-native-animatable';

const ResultPage2 = ({navigation, route}: PageProps<'result2'>) => {
  const [modelData, setModelData] = React.useState<resultType2>({});
  const [modelVisble, setModelVisble] = React.useState<boolean>(false);
  const [activeSections, setActiveSections] = React.useState([]);
  let sections = route.params?.data
    .map(day => day.filter(period => typeof period === 'object'))
    .filter(day => day.length);

  const footer = () => {
    return (
      <View>
        <Button
          style={styles.footerControl}
          onPress={() => setModelVisble(false)}>
          CLOSE
        </Button>
      </View>
    );
  };
  return (
    <Layout style={styles.container}>
      <TopNavigationTitleShowcase
        navigation={{navigation, route}}
        isLoading={false}
      />
      <Text category="h6" style={{marginLeft: '10%', marginBottom: '5%'}}>
        {route.params?.FacultyName}
      </Text>
      <Animatable.View style={{flexDirection: 'row'}} animation={'fadeInDown'}>
        <Layout style={{width: '95%', alignSelf: 'center'}}>
          {route.params?.data.map((day, i) => (
            <Layout
              key={Math.random()}
              style={{
                flexDirection: 'row',
                height: 32,
                marginBottom: '1%',
              }}>
              {day.map((period, j) => {
                if (i === 0 && j === 0) {
                  return (
                    <Layout
                      style={{flex: 1, margin: '1%'}}
                      key={Math.random()}
                    />
                  );
                }
                if (j === 0 || i === 0) {
                  return (
                    <Layout
                      key={Math.random()}
                      style={{
                        flex: 1,
                        backgroundColor: '#f1efb3b8',
                        margin: '1%',
                        height: 28,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          marginTop: 6,
                          textAlign: 'center',
                          alignContent: 'center',
                        }}>
                        {period}
                      </Text>
                    </Layout>
                  );
                }
                return (
                  <TouchableOpacity
                    key={Math.random()}
                    onPress={() => {
                      // Alert.alert('Error', JSON.stringify(period), [
                      //   {
                      //     text: 'Ok',
                      //   },
                      // ]);
                      setActiveSections([]);
                      setModelData(period);
                      setModelVisble(true);
                    }}
                    style={{
                      //   height: '100%',
                      flex: 1,
                      margin: '1%',
                      marginBottom: 0,
                      borderRadius: 10,
                      backgroundColor:
                        period === 'null' ? '#dcdedc' : '#ff4089',
                    }}
                  />
                );
              })}
            </Layout>
          ))}
        </Layout>
      </Animatable.View>
      <Modal
        style={{width: '90%'}}
        visible={modelVisble}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModelVisble(false)}>
        <Card footer={footer}>
          <DataGrid data={modelData} />
        </Card>
      </Modal>
      {/* <Text>{JSON.stringify(route.params?.data)} </Text> */}
      {/* <SafeAreaView style={[{flex: 19}, scrollDimensions]}> */}
      <View style={styles.container}>
        <ScrollView>
          {/* <View style={{alignItems: 'center'}}> */}
          <Card
            style={{
              flex: 1,
              width: '95%',
              alignSelf: 'center',
              marginTop: 18,
              borderWidth: 0,
            }}>
            <CustomAaccordian
              data={sections}
              activeSections={activeSections}
              setActiveSections={setActiveSections}></CustomAaccordian>
          </Card>
          {/* </View> */}

          <Layout style={{width: '100%', marginTop: 89}}>
            <Logo />
          </Layout>
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
    </Layout>
  );
};

export default ResultPage2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  footerControl: {
    marginHorizontal: 2,
  },
  logoImg: {
    flex: 1,
    marginRight: 9,
    height: 60,
    resizeMode: 'center',
  },
  cardText: {flex: 4, alignSelf: 'center'},
  column: {alignContent: 'flex-start', flexDirection: 'row', marginRight: 3},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
