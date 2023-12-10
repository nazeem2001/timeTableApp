import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';

export interface SelectProps {
  style: StyleProp<ViewStyle>;
  placeholder: string;
  label?: string;
  Index: IndexPath | undefined;
  List: string[];
  setIndex: (value: React.SetStateAction<IndexPath | undefined>) => void;
}

export default class SelectComponent extends React.Component<SelectProps, any> {
  constructor(props: SelectProps) {
    super(props);
  }

  public render() {
    return (
      <Animatable.View style={this.props.style} animation={'fadeInDown'}>
        <Select
          style={{width: '100%'}}
          placeholder={this.props.placeholder}
          label={this.props.label}
          value={
            this.props.Index ? this.props.List[this.props.Index.row] : undefined
          }
          onSelect={(i: IndexPath | IndexPath[]) => {
            this.props.setIndex(i as IndexPath);
          }}
          selectedIndex={this.props.Index}>
          {this.props.List.map((c, k) => (
            <SelectItem title={c} key={k} />
          ))}
        </Select>
      </Animatable.View>
    );
  }
}
