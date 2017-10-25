import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// extra imports
import { Constants } from 'expo'


class HomePage extends React.Component {

  render() {

    return (
      <View>
        <View style={styles.statusBar}/>
        <Text>Homepage</Text>
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


export default HomePage