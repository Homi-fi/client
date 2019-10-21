import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons} from '@expo/vector-icons';
import DetailScreen from '../screens/detail'
import ModalDetail from '../screens/detail/modal'

import RoomScreen from '../screens/room'
import SchedulerScreen from '../screens/scheduler'
import Login from '../screens/login'
import SettingScheduler from '../screens/scheduler/index'
import  TabBar  from "./TabBar";

const DetailStack = createStackNavigator({
  Detail: DetailScreen,
  Modal: ModalDetail
}, {
  defaultNavigationOptions: {
    header: null
  }
})


const RoomStack = createStackNavigator({
  Room: {
    screen: RoomScreen,
    navigationOptions: {
      header: null
    }
  },
  Detail: {
    screen: DetailStack,
    navigationOptions: {
      header: null
    }
  }
}, {
  // initialRouteName: 'Detail'
})

RoomStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0 && navigation.state.routes[1].routeName === "Detail") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  }
}

const SchedulerStack = createStackNavigator({
  Scheduler: {
    screen: SchedulerScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Setting: {
    screen: SettingScheduler,
    // navigationOptions: () => ({
    //   header: null
    // })
  }
})

const TabNavigator = createBottomTabNavigator({
  Room: {
    screen:RoomStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" color={tintColor} size={25}/>
    }
  },
  Scheduler: {
    screen: SchedulerStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-calendar" color={tintColor} size={25} />
    }
  },
},
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: "#f9f9f9",
      inactiveTintColor: "#fec894",
    }
})


const switchNav = createSwitchNavigator({
  App: TabNavigator,
  LandingPage: Login,

})

export default createAppContainer(switchNav)