import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import DetailScreen from '../screens/detail'
import RoomScreen from '../screens/room'
import SchedulerScreen from '../screens/scheduler'

const DetailStack = createStackNavigator({
  Detail: DetailScreen
})

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