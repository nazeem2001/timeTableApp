import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {resultType2} from '../constants';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Text} from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import BOOK_LOGO from '../assrts/book.png';
import CLOCK_LOGO from '../assrts/clock.png';
import BUILDING_LOGO from '../assrts/building.png';
import DOOR_LOGO from '../assrts/door.png';
import COURSE_LOGO from '../assrts/course.png';

interface DataGridProps {
  data: resultType2;
}

const DataGrid = (props: DataGridProps) => {
  return (
    <Animatable.View animation="fadeInDown" duration={1000}>
      <Grid>
        <Row style={{alignSelf: 'center'}}>
          <Col style={styles.column}>
            <Image
              source={COURSE_LOGO}
              style={{
                flex: 1,
                marginRight: 9,
                height: 60,
                resizeMode: 'center',
                width: 60,
                alignSelf: 'center',
              }}
            />
            <Text style={{alignSelf: 'center', flex: 1}}>
              {props.data.course}, {props.data.branch}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col style={styles.column}>
            <Image source={CLOCK_LOGO} style={styles.logoImg} />
            <Text style={styles.cardText}>{props.data.time}</Text>
          </Col>
          <Col style={styles.column}>
            <Image source={BOOK_LOGO} style={styles.logoImg} />
            <Text style={styles.cardText}>{props.data.subject}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={styles.column}>
            <Image source={BUILDING_LOGO} style={styles.logoImg} />
            <Text style={styles.cardText}>{props.data.venue}</Text>
          </Col>
          <Col style={styles.column}>
            <Image source={DOOR_LOGO} style={styles.logoImg} />
            <Text style={styles.cardText}>{props.data.roomNo}</Text>
          </Col>
        </Row>
      </Grid>
    </Animatable.View>
  );
};

export default DataGrid;

const styles = StyleSheet.create({
  logoImg: {
    flex: 1,
    marginRight: 9,
    height: 60,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  cardText: {flex: 4, alignSelf: 'center'},
  column: {
    alignContent: 'flex-start',
    flexDirection: 'row',
    marginRight: 3,
    marginBottom: 5,
  },
});
