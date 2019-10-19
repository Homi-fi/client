import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import DetailScreen from '../screens/detail'
import ModalDetail from '../screens/detail/modal'

import RoomScreen from '../screens/room'

import SchedulerScreen from '../screens/scheduler'

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
  Room: RoomScreen
})

const SchedulerStack = createStackNavigator({
  Scheduler: SchedulerScreen
})

const TabNavigator = createBottomTabNavigator({
  Detail: DetailStack,
  Room: RoomStack,
  Scheduler: SchedulerStack
})

export default createAppContainer(TabNavigator)