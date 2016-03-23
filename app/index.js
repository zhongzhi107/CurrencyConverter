'use strict';

import React, { Component, StyleSheet } from 'react-native';
import {Scene, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux';
import Home from './components/Home';
import Setting from './components/Setting';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} hideNavBar={true} />
    <Scene key="setting" component={Setting} title="设置" />
  </Scene>
);

export default class AppRouter extends Component {
  render() {
    return (
      <Router scenes={scenes} />
    );
  }
}
