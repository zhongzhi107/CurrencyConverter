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
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PAGE_DOT_SIZE = 6;

export default class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      scrollCurrentId: 0,
      showCalc: false,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.scrollCurrentId !== this.props.scrollCurrentId;
  // }

  _handleViewScroll(scroll) {
    let event = scroll.nativeEvent;
    let newId = parseInt(event.contentOffset.x/event.layoutMeasurement.width, 10);
    if (newId != this.state.scrollCurrentId) {
      this.setState({
        scrollCurrentId: newId
      });
    }
  }

  _handleInputClick() {
    this.setState({
      showCalc: true
    });
  }

  _handleAcClick() {
    console.log('==========');
  }

  render() {
    const { actions, assets } = this.props;

    // console.log(Dimensions.get('window').width);
    // console.log(Dimensions.get('window').height);

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image source={require('../../assets/1.jpg')} style={styles.bgImage} />
        </View>
        <View style={styles.main}>
          <ScrollView
            style={styles.pages}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={3}
            onScroll={this._handleViewScroll.bind(this)}
          >
            <View style={styles.page}>
              <View style={styles.home}>
                <View style={[styles.row, styles.inputBanner]}>
                    <Text style={[styles.bigSize, styles.sign]}>$</Text>
                    <Text style={[styles.bigSize, styles.price]}>2.00</Text>
                </View>
                <View style={[styles.row, styles.flagBanner]}>
                  <View style={styles.left}>
                    <Text style={styles.keycode}>CNY</Text>
                    <Image style={styles.smallFlag} source={require('../../assets/flag/china.png')} />
                  </View>
                  <View style={styles.middle}>
                    <Icon name="exchange" size={20} color="#eee" />
                  </View>
                  <View style={styles.right}>
                    <View style={styles.rightInner}>
                      <Text style={styles.keycode}>BRL</Text>
                      <Image style={styles.smallFlag} source={require('../../assets/flag/usa.png')} />
                    </View>
                  </View>
                </View>
                <View style={[styles.row, styles.outputBanner]}>
                  <Text style={[styles.bigSize, styles.sign]}>¥</Text>
                  <Text style={[styles.bigSize, styles.price]}>18.00</Text>
                </View>
              </View>
            </View>
            <View style={styles.page}>
              <Text>222</Text>
            </View>
            <View style={styles.page}>
              <Text>333</Text>
            </View>
          </ScrollView>
          <View style={styles.pagination}>
            {
              [0, 1, 2].map((item, index) => {
                let dotStyles = [styles.pageDot];
                if (index === this.state.scrollCurrentId) {
                  dotStyles.push(styles.pageDotCurrent);
                }
                return <View key={`pagedot.${index}`} style={dotStyles} />;
              })
            }
          </View>
          <View style={styles.settings}>
            <Icon name="cog" size={20} color="#ddd" />
          </View>
        </View>

        <Modal
          transparent={true}
        >
          <View style={styles.modal}>
            <View style={styles.calc}>
              <View style={styles.screen}>
                <Text style={styles.result}>1239</Text>
              </View>
              <View style={styles.keyborad}>
                <View style={styles.tr}>
                  <View style={styles.td}>
                    <TouchableOpacity onPress={this._handleAcClick.bind(this)}>
                      <Text>AC</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.td}>
                    <Text>%</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>?</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>*</Text>
                  </View>
                </View>

                <View style={styles.tr}>
                  <View style={styles.td}>
                    <Text>7</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>8</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>9</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>-</Text>
                  </View>
                </View>

                <View style={styles.tr}>
                  <View style={styles.td}>
                    <Text>4</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>5</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>6</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>+</Text>
                  </View>
                </View>

                <View style={styles.tr}>
                  <View style={styles.td}>
                    <Text>1</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>2</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>3</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>=</Text>
                  </View>
                </View>

                <View style={styles.tr}>
                  <View style={styles.td}>
                    <Text>0</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calc: {
    height: 300,
    width: SCREEN_WIDTH - 20,
  },
  screen: {

  },
  result: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 30,
    paddingTop: 5,
    paddingBottom: 5,
  },
  keyborad: {
    width: SCREEN_WIDTH - 20,
    height: 300,
    backgroundColor: 'yellow',
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    backgroundColor: '#ccc',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    // flex: 1,
    // resizeMode: 'stretch',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  main: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pages: {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
  },
  page: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  home: {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  inputBanner: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  flagBanner: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // justifyContent: 'center',
  },
  outputBanner: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'flex-end',
  },
  bigSize: {
    fontSize: 28,
    color: '#fff',
  },
  sign: {
    marginRight: 5,
  },
  price: {
    fontWeight: 'bold',
  },
  keycode: {
    color: '#fff',
    fontSize: 24,
    marginRight: 5,
  },
  smallFlag: {
    width: 23*1.4,
    height: 16*1.4,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor:'green',
    alignItems: 'center',
  },
  middle: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: 'yellow',
    marginTop: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor:'green',
  },
  rightInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settings: {
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
  pagination: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    bottom: 20,
    flexDirection: 'row',
  },
  pageDot: {
    width: PAGE_DOT_SIZE,
    height: PAGE_DOT_SIZE,
    borderRadius: PAGE_DOT_SIZE/2,
    backgroundColor: '#999',
    marginLeft: 5,
    marginRight: 5,
  },
  pageDotCurrent: {
    backgroundColor: '#fff',
  }
});
