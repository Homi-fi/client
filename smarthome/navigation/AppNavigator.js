import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import DetailScreen from '../screens/detail'
import RoomScreen from '../screens/room'
import SchedulerScreen from '../screens/scheduler'
import SettingScheduler from '../screens/scheduler/stack'

const DetailStack = createStackNavigator({
  Detail: DetailScreen
})

const RoomStack = createStackNavigator({
  Room: RoomScreen
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
  Detail: DetailStack,
  Room: RoomStack,
  Scheduler: SchedulerStack
}, {
  initialRouteName: 'Scheduler'
})

export default createAppContainer(TabNavigator)