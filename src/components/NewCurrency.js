'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import { CURRENCIES } from '../config';
import assets from '../utils/assets';

export default class Home extends Component {
  constructor (props) {
    super(props);
    // this._handleSourceItemClick = this._handleSourceItemClick.bind(this);
    // this._handleTargetItemClick = this._handleTargetItemClick.bind(this);
    this.state = {
      currencies: CURRENCIES,
      source: null,
      target: null,
    };
  }

  _handleSourceItemClick (e, source) {
    this.setState({
      source: source
    });
  }

  _handleTargetItemClick (e, target) {
    this.setState({
      target: target
    });
  }

  render () {
    let { currencies, source, target } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          <View style={styles.groupTitle}>
            <Text style={styles.groupTitleText}>原币种</Text>
          </View>
          <View style={styles.groupItems}>
          {
            Object.keys(currencies).map((item, i) => {
              let checked = (source === item ? '√' : '');
              return (
                <TouchableHighlight
                  key={`currency.${i}`}
                  underlayColor="#ccc"
                  onPress={e => this._handleSourceItemClick(e, item)}
                >
                  <View style={styles.groupItem}>
                    <Image style={styles.flag} source={assets[item]} />
                    <Text style={styles.currencyName}> {item}</Text>
                    <Text style={styles.checked}>{checked}</Text>
                  </View>
                </TouchableHighlight>
              );
            })
          }
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupTitle}>
            <Text style={styles.groupTitleText}>兑换币种</Text>
          </View>
          <View style={styles.groupItems}>
          {
            Object.keys(currencies).map((item, i) => {
              let checked = (target === item ? '√' : '');
              return (
                <TouchableHighlight
                  key={`currency.${i}`}
                  underlayColor="#ccc"
                  onPress={e => this._handleTargetItemClick(e, item)}
                >
                  <View style={styles.groupItem}>
                    <Image style={styles.flag} source={assets[item]} />
                    <Text style={styles.currencyName}> {item}</Text>
                    <Text style={styles.checked}>{checked}</Text>
                  </View>
                </TouchableHighlight>
              );
            })
          }
          </View>
        </View>

      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
  },
  groupTitle: {
    padding: 10,
  },
  groupTitleText: {
    fontSize: 12,
    color: '#666',
  },
  groupItems: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  groupItem: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 20,
    height: 20,
  },
  currencyName: {
    fontSize: 20,
    width: 50,
  },
  checked: {
    flex: 1,
    textAlign: 'right',
  },
});
