import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import DetailScreen from '../screens/detail'
import RoomScreen from '../screens/room'
import SchedulerScreen from '../screens/scheduler'
import Login from '../screens/login'

const DetailStack = createStackNavigator({
  Detail: DetailScreen
})

const RoomStack = createStackNavigator({
  Room: {
      screen:RoomScreen,
      navigationOptions: {
        header:null
      }
  },
})

const SchedulerStack = createStackNavigator({
  Scheduler: SchedulerScreen
})

const TabNavigator = createBottomTabNavigator({
  Detail: DetailStack,
  Room: RoomStack,
  Scheduler: SchedulerStack,
  Login:Login
})

export default createAppContainer(TabNavigator)