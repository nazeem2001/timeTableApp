import {Card, Text} from '@ui-kitten/components';
import * as React from 'react';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import * as Animatable from 'react-native-animatable';

export interface ResultT1Props {
  style: StyleProp<ViewStyle>;
  result: {
    label: string;
    value: string;
  }[];
}

export function ResultT1(props: ResultT1Props) {
  return (
    <Card style={props.style}>
      <Animatable.View animation={'fadeInDown'}>
        <Grid>
          {props.result.map((t, i) => (
            <Row key={i} style={{marginBottom: '2%'}}>
              <Col style={{width: '25%'}}>
                <Text style={styles.label}>{t.label}</Text>
              </Col>
              <Col>
                <Text>{t.value}</Text>
              </Col>
            </Row>
          ))}
        </Grid>
      </Animatable.View>
    </Card>
  );
}
const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
  },
});
