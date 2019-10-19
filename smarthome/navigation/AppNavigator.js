import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import DetailScreen from '../screens/detail'
import ModalDetail from '../screens/detail/modal'

import RoomScreen from '../screens/room'

import SchedulerScreen from '../screens/scheduler'
import Login from '../screens/login'
import SettingScheduler from '../screens/scheduler/stack'

const DetailStack = createStackNavigator({
  Detail: DetailScreen,
  Modal: ModalDetail
}, {
  defaultNavigationOptions: {
    header: null
  }
})

DetailStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0 && navigation.state.routes[1].routeName === "Modal") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  }
}

const RoomStack = createStackNavigator({
  Room: {
      screen:RoomScreen,
      navigationOptions: {
        header:null
      }
  },
  Detail: {
    screen: DetailStack,
    navigationOptions: {
      header:null
    }
},
})

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
  Room: RoomStack,
  Scheduler: SchedulerStack,
})

const switchNav = createSwitchNavigator({
  App: TabNavigator,
  LandingPage:Login,
  
})

export default createAppContainer(switchNav)