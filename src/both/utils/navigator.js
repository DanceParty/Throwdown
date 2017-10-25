import React from 'react'
import { ScrollView } from 'react-native'

// other imports
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import { Feather } from '@expo/vector-icons'

// pages
import HomePage from '../pages/HomePage'
import SplashPage from '../pages/SplashPage'

const hiddenDrawerItems = ['Login']

export const createRootNavigator = (signedIn = false) => {

  return DrawerNavigator({
    HomePage: {
      screen: HomePage
    },
    SplashPage: {
      screen: SplashPage
    }
  }, {
    drawerWidth: 200,
    contentComponent: (props) => {
      const clonedProps = {
        ...props,
        items: props.items.filter(item => !hiddenDrawerItems.includes(item.key)),
      }
      return (
        <ScrollView style={{ paddingTop: 20 }}>
          <DrawerItems {...clonedProps} />
        </ScrollView>
      )
    },
    initialRouteName: signedIn ? "HomePage" : "SplashPage"
  })

}