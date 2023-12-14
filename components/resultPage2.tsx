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
import DropShadow from 'react-native-drop-shadow';
import {ThemedButton} from 'react-native-really-awesome-button';

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
      <Animatable.View style={{width: '100%'}} animation={'fadeInDown'}>
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
                  return <Layout style={{flex: 1}} key={Math.random()} />;
                }
                if (j === 0 || i === 0) {
                  return (
                    <View
                      key={Math.random()}
                      style={{
                        flex: 1,
                        borderLeftWidth: j > 1 ? 1 : 0,
                        marginBottom: 5,
                        marginTop: 5,
                      }}>
                      <Layout
                        style={{
                          flex: 1,
                          alignSelf: 'center',
                          height: 20,
                          // backgroundColor: '#66d4ff',

                          margin: '1%',
                          borderColor: '#12296e',

                          // borderRightWidth: j > 0 ? (j % 2 ? 0 : 1) : 0,
                          borderRadius: 0,
                        }}>
                        <Text
                          style={{
                            color: '#12296e',
                            fontWeight: '700',
                            // marginTop: 6,

                            // marginHorizontal: i == 0 ? '10%' : 0,
                            textAlign: 'center',
                            alignContent: 'center',
                          }}>
                          {period}
                        </Text>
                      </Layout>
                    </View>
                  );
                }
                return typeof period === 'object' ? (
                  // <DropShadow style={styles.dropshadow}>
                  //   <TouchableOpacity
                  //     key={Math.random()}
                  //     onPress={() => {
                  //       if (typeof period === 'object') {
                  //         setActiveSections([]);
                  //         setModelData(period);
                  //         setModelVisble(true);
                  //       }
                  //     }}
                  //     style={
                  //       period === 'null'
                  //         ? styles.gridButtonInActive
                  //         : styles.gridButtonActive
                  //     }
                  //   />
                  // </DropShadow>
                  <View style={{flex: 1, margin: '.6%'}} key={Math.random()}>
                    <ThemedButton
                      name="rick"
                      type="primary"
                      backgroundColor="#ff4089"
                      backgroundDarker="#660329"
                      backgroundPlaceholder="#ff4089"
                      animatedPlaceholder={false}
                      raiseLevel={6}
                      textSize={0}
                      style={styles.gridButtonActive}
                      springRelease
                      width={'100%'}
                      height={30}
                      onPress={() => {
                        if (typeof period === 'object') {
                          setActiveSections([]);
                          setModelData(period);
                          setModelVisble(true);
                        }
                      }}>
                      lkk
                    </ThemedButton>
                  </View>
                ) : (
                  <View style={{flex: 1, margin: '.6%'}}>
                    <TouchableOpacity
                      key={Math.random()}
                      onPress={() => {
                        if (typeof period === 'object') {
                          setActiveSections([]);
                          setModelData(period);
                          setModelVisble(true);
                        }
                      }}
                      style={
                        period === 'null'
                          ? styles.gridButtonInActive
                          : styles.gridButtonActive
                      }
                    />
                  </View>
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
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Card
            style={{
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

          <Layout style={{width: '100%'}}>
            <Logo />
          </Layout>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default ResultPage2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropshadow: {
    flex: 1,
    margin: '.6%',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.9,
  },
  gridButtonActive: {
    borderRadius: 10,
    borderTopRightRadius: 12,
    marginBottom: 0,
    // backgroundColor: '#ff4089',
  },
  gridButtonInActive: {
    flex: 1,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#dcdedc',
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
