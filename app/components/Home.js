'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this._handleKeyClick = this._handleKeyClick.bind(this);
    this._renderSourcePrice = this._renderSourcePrice.bind(this);
    this._renderTargetPrice = this._renderTargetPrice.bind(this);
    this._handleGearClick = this._handleGearClick.bind(this);
    this.state = {
      number1: 0,
      number2: '0',
      operator: '+',
      moneySign1: '$',
      moneySign2: '¥',
      currency: 6.4850
    };
  }

  _handleKeyClick(e, keyCode) {
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
          number1 = eval('number1' + operator + 'parseFloat(number2, 10)');
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

  _handleGearClick() {
    console.log('==Actions: ', Actions);
    Actions.setting();
  }

  _renderSourcePrice() {
    let { number1, number2 } = this.state;
    return this._toThousands(number2 !== '0' ? number2 : number1);
  }

  _renderTargetPrice() {
    let { number1, number2, currency } = this.state;
    let sourcePrice = number1 === 0 ? number2 : number1;
    return this._toThousands((sourcePrice*currency).toFixed(2));
  }

  _getInteger(num) {
    return parseInt(num, 10);
  }

  _getDecimal(num, includeDecimalPoint) {
    let matches = num.toString().match(/\.(\d*)/);
    if (matches) {
      return matches[includeDecimalPoint ? 0 : 1];
    }
    return '';
  }

  _toThousands(num) {
    let int = (this._getInteger(num) || 0)
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

    let decimal = this._getDecimal(num, true);
    return int + decimal;
  }

  render() {
    // const { actions } = this.props;
    let { number1, number2, moneySign1, moneySign2 } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.navLeft} />
          <View style={styles.navTitle}>
            <View style={styles.dots}>
              <View style={[styles.dot, styles.dotCurrent]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.flags}>
              <Image style={styles.flag} source={require('../../assets/flag/china.png')} />
              <Icon name="long-arrow-right" size={12} color="#fff" />
              <Image style={styles.flag} source={require('../../assets/flag/usa.png')} />
            </View>
          </View>
          <View style={styles.navRight}>
            <Text style={styles.navRightIcon}>
              <Icon name="bars" size={20} />
            </Text>
          </View>
        </View>
        <View style={styles.output}>
          <View style={styles.outputSource}>
            <Text style={styles.outputSourceText}>{moneySign1 + ' ' + this._renderSourcePrice()}</Text>
          </View>
          <View style={styles.outputTarget}>
            <Text style={styles.outputTargetText}>{moneySign2 + ' ' + this._renderTargetPrice()}</Text>
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
            <TouchableOpacity style={styles.td} onPress={this._handleGearClick}>
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
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 3,
    width: 6,
    height: 6,
    backgroundColor: '#999',
    marginLeft: 2,
    marginRight: 2,
  },
  dotCurrent: {
    backgroundColor: '#fff',
  },
  flags: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  flag: {
    width: 13.5,
    height: 9,
    marginLeft: 5,
    marginRight: 5,
  },
  navRight: {
    flex: 1,
  },
  navRightIcon: {
    textAlign: 'right',
    paddingRight: 10,
  },
  output: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  outputSourceText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 24,
  },
  outputTargetText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 32,
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
