'use strict';

import React, { Component } from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Home from './components/Home';
import Setting from './components/Setting';
import NewCurrency from './components/NewCurrency';

const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="home"
      component={Home}
      hideNavBar={true}
    />
    <Scene
      key="setting"
      component={Setting}
      title="设置"
      rightTitle="编辑"
      onRight={() => console.log('edit')}
    />
    <Scene
      key="newCurrency"
      component={NewCurrency}
      title="添加新货币"
      backTitle="取消"
      rightTitle="完成"
      rightButtonTextStyle={{color: '#ccc'}}
      onRight={() => console.log('right')}
      initial={false}
      direction="vertical"
    />
  </Scene>
);

export default class AppRouter extends Component {
  render () {
    return (
      <Router scenes={scenes} />
    );
  }
}
