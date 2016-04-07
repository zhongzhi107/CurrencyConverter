'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CURRENCIES, STORAGE_KEY } from '../config';
import assets from '../utils/assets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Home extends Component {

  constructor (props) {
    super(props);
    // this._handleKeyClick = this._handleKeyClick.bind(this);
    // this._renderSourcePrice = this._renderSourcePrice.bind(this);
    // this._renderTargetPrice = this._renderTargetPrice.bind(this);
    // this._handleGearClick = this._handleGearClick.bind(this);
    // this._loadInitialState();
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      data = JSON.parse(data);
      console.log('-----STORAGE_KEY', data.exchanges);
      this.setState({
        exchanges: data.exchanges
      });
    });

    this.state = {
      number1: 0,
      number2: '0',
      operator: '+',
      pageIndex: 0,
      exchanges: [
        {
          from: 'USD',
          to: 'CNY',
        }
      ]
    };
  }

  async _loadInitialState () {
    var value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      console.log('=== has value', JSON.parse(value));
    } else {
      console.log('====no value');
      let initialData = {
        currencies: {
          // 人民币
          CNY: {
            symbol: '¥',
            rate: 6.5149,
          },
          // 美元
          USD: {
            symbol: '$',
            rate: 1,
          },
          // 日元
          JPY: {
            symbol: 'J￥',
            rate: 112.857,
          },
          // 欧元
          EUR: {
            symbol: '€',
            rate: 0.895351335864193,
          },
          // 英镑
          GBP: {
            symbol: '￡',
            rate: 0.7104442407837621,
          },
          // 韩元
          KRW: {
            symbol: '₩',
            rate: 1166.25,
          },
          // 港元
          HKD: {
            symbol: 'HK＄',
            rate: 7.75945,
          },
          // 澳元
          AUD: {
            symbol: 'A$',
            rate: 1.334489891239074,
          },
          // 加元
          CAD: {
            symbol: 'C$',
            rate: 1.32593,
          },
        },
        exchanges: [
          {
            from: 'HKD',
            to: 'USD',
          },
          {
            from: 'HKD',
            to: 'CNY',
          }
        ]
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
    return JSON.parse(value);
  }

  _handleKeyClick (e, keyCode) {
    let { number1, number2, operator } = this.state;
    switch (keyCode) {
      case 'c':
        number1 = 0;
        number2 = '0';
        operator = '+';
        break;
      case 'exchange':
        // number1 *= -1;
        // number2 = null;
        break;
      case 'settings':
        break;
      case '=':
      case '+':
      case '-':
      case '*':
      case '/':
        /*eslint-disable */
        number1 = eval('number1' + operator + 'parseFloat(number2, 10)');
        /*eslint-enable */
        number2 = '0';
        operator = keyCode !== '=' ? keyCode : '+';
        break;
      case '.':
        // 小数点应该和数字一样处理
        if (!/\./.test(number2)) {
          number2 += '.';
        }
        break;
      default:
        number2 += '' + keyCode;
    }

    // 除去首位多余的0
    let int = parseInt(number2, 10);
    let decimal = '';
    let matches = number2.match(/\.\d*/);
    if (matches) {
      decimal = matches[0];
    }
    number2 = int + decimal;

    this.setState({
      number1: number1,
      number2: number2,
      operator: operator,
    });
    console.log(this.state);
  }

  _handleGearClick () {
    console.log('==Actions: ', Actions);
    Actions.setting();
  }

  _handleViewScroll (scroll) {
    const { pageIndex } = this.state;
    let event = scroll.nativeEvent;
    let newId = parseInt(event.contentOffset.x / event.layoutMeasurement.width, 10);
    if (newId !== pageIndex) {
      this.setState({
        pageIndex: newId
      });
    }
  }

  _renderSourcePrice () {
    let { number1, number2 } = this.state;
    return this._toThousands(number2 !== '0' ? number2 : number1);
  }

  _renderTargetPrice () {
    let { number1, number2, pageIndex, exchanges } = this.state;
    let currency = CURRENCIES[exchanges[pageIndex].to].rate / CURRENCIES[exchanges[pageIndex].from].rate;
    let sourcePrice = number1 === 0 ? number2 : number1;
    return this._toThousands((sourcePrice * currency).toFixed(2));
  }

  _getInteger (num) {
    return parseInt(num, 10);
  }

  _getDecimal (num, includeDecimalPoint) {
    let matches = num.toString().match(/\.(\d*)/);
    if (matches) {
      return matches[includeDecimalPoint ? 0 : 1];
    }
    return '';
  }

  _toThousands (num) {
    let int = (this._getInteger(num) || 0)
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

    let decimal = this._getDecimal(num, true);
    return int + decimal;
  }

  render () {
    let { number1, number2, pageIndex, exchanges } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.output}>
          <View style={styles.outputSource}>
            <Text style={styles.outputSourceText}>{CURRENCIES[exchanges[pageIndex].from].symbol + ' ' + this._renderSourcePrice()}</Text>
          </View>
          <View style={styles.outputTarget}>
            <Text style={styles.outputTargetText}>{CURRENCIES[exchanges[pageIndex].to].symbol + ' ' + this._renderTargetPrice()}</Text>
          </View>
        </View>

        <ScrollView
          style={styles.flagScrollView}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={3}
          onScroll={this._handleViewScroll.bind(this)}
        >
          {
            exchanges.map((item, i) => {
              // let className = [styles.dot];
              // if (index === pageIndex) {
              //   className.push(styles.dotCurrent);
              // }
              return (
                <View style={styles.flags} key={`flags.${i}`}>
                  <Image style={styles.flag} source={assets[item.from]} />
                  <Image style={styles.flag} source={assets[item.to]} />
                </View>
              );
            })
          }
        </ScrollView>

        <View style={styles.navBar}>
          <View style={styles.navLeft} />
          <View style={styles.navTitle}>
            <View style={styles.dots}>
              {
                exchanges.map((item, index) => {
                  let className = [styles.dot];
                  if (index === pageIndex) {
                    className.push(styles.dotCurrent);
                  }
                  return <View key={`dot.${index}`} style={className} />;
                })
              }
            </View>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity onPress={this._handleGearClick}>
              <Text style={styles.navRightIcon}>
                <Icon name="bars" size={18} color="#999" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.keyboard}>
          <View style={styles.tr}>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, 'c')}>
              <Text style={styles.key}>{number1 === 0 && number2 === '0' ? 'AC' : 'C'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, 'exchange')}>
              <Icon name="exchange" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.td}>
              <Icon name="gear" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.td, styles.lastCell]} onPress={e => this._handleKeyClick(e, '/')}>
              <Text style={[styles.key, styles.keylastCell]}>÷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tr}>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '7')}>
              <Text style={styles.key}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '8')}>
              <Text style={styles.key}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '9')}>
              <Text style={styles.key}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.td, styles.lastCell]} onPress={e => this._handleKeyClick(e, '*')}>
              <Text style={[styles.key, styles.keylastCell]}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tr}>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '4')}>
              <Text style={styles.key}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '5')}>
              <Text style={styles.key}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '6')}>
              <Text style={styles.key}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.td, styles.lastCell]} onPress={e => this._handleKeyClick(e, '-')}>
              <Text style={[styles.key, styles.keylastCell]}>-</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tr}>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '1')}>
              <Text style={styles.key}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '2')}>
              <Text style={styles.key}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '3')}>
              <Text style={styles.key}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.td, styles.lastCell]} onPress={e => this._handleKeyClick(e, '+')}>
              <Text style={[styles.key, styles.keylastCell]}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tr}>
            <TouchableOpacity style={[styles.td, styles.td2]} onPress={e => this._handleKeyClick(e, '0')}>
              <Text style={styles.key}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.td} onPress={e => this._handleKeyClick(e, '.')}>
              <Text style={styles.key}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.td, styles.lastCell]} onPress={e => this._handleKeyClick(e, '=')}>
              <Text style={[styles.key, styles.keylastCell]}>=</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    flexDirection: 'column',
    height: SCREEN_HEIGHT,
  },
  navBar: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
  },
  navLeft: {
    flex: 1,
  },
  navTitle: {
    flex: 1,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 2,
    width: 4,
    height: 4,
    backgroundColor: '#999',
    marginLeft: 2,
    marginRight: 2,
  },
  dotCurrent: {
    backgroundColor: '#fff',
  },
  flagScrollView: {
    opacity: 0.1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: SCREEN_WIDTH,
    flexDirection: 'column',
  },
  flags: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    width: SCREEN_WIDTH,
  },
  flag: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH * 90 / 135,
  },
  navRight: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  navRightIcon: {
    textAlign: 'right',
    paddingRight: 10,
  },
  output: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  outputSourceText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 32,
    // fontFamily: 'courier',
  },
  outputTargetText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 24,
  },
  keyboard: {
    height: 450,
    flexDirection: 'column',
  },
  tr: {
    flexDirection: 'row',
    flex: 1,
  },
  td: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  tdRight: {
    borderRightWidth: 0,
  },
  tdBottom: {
    borderBottomWidth: 0,
  },
  td2: {
    flex: 2,
  },
  lastCell: {
    backgroundColor: '#f99011',
  },
  key: {
    fontSize: 20,
  },
  keylastCell: {
    color: '#fff',
  }
});
