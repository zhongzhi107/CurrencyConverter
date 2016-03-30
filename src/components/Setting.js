'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CURRENCIES, STORAGE_KEY } from '../config';
import assets from '../utils/assets';

export default class Home extends Component {

  constructor(props) {
    super(props);
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      data = JSON.parse(data);
      this.setState({
        exchanges: data.exchanges
      });
    });
    this.state = {
      exchanges: [

      ]
    };
  }

  render() {
    let { exchanges } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.items}>
          {
            exchanges.map((item, i) => {
              return (
                <View style={styles.item} key={`exchange.${i}`}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.currencyName}>{item.from} </Text>
                    <Image style={styles.flag} source={assets[item.from]} />
                  </View>
                  <Text style={styles.itemMiddle}>
                    <Icon name="long-arrow-right" size={20} />
                  </Text>
                  <View style={styles.itemRight}>
                    <Image style={styles.flag} source={assets[item.to]} />
                    <Text style={styles.currencyName}> {item.to}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>

        <View style={styles.add}>
          
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
  },
  item: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMiddle: {
    flex: 1,
    textAlign: 'center',
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flag: {
    width: 20,
    height: 20,
  },
  currencyName: {
    fontSize: 20,
  },
});
