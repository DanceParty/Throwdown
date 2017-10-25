import React from 'react'
import { StyleSheet, View } from 'react-native'

// extra imports
import { Constants } from 'expo'

// components
import UserForm from '../components/UserForm/UserForm'


class SplashPage extends React.Component {

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <UserForm 
          navigation={this.props.navigation}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  // This sets a padding for the app where the status bar should be
  // https://docs.expo.io/versions/v21.0.0/guides/configuring-statusbar.html#content
  statusBar: {
    height: Constants.statusBarHeight,
  }
});

export default SplashPage