import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

// extra imports
import { Font } from 'expo'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

// utils
import { createRootNavigator } from './src/both/utils/navigator'
import { isSignedIn } from './src/both/utils/auth'


class App extends React.Component {

  constructor(...args) {
    super(...args)

    // connect to grap.cool db
    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: 'https://api.graph.cool/simple/v1/cj97992sd0zrl0129xeuj4ggd',
      }),
    });

    this.state = {
      fontLoaded: false,
      checkedSignIn: false,
      signedIn: false,
    }

  }

  async componentDidMount() {

    // required to load custom fonts into the application
    // https://docs.expo.io/versions/latest/guides/using-custom-fonts.html#waiting-for-the-font-to-load-before-rendering
    await Font.loadAsync({
      'Lato': require('./assets/fonts/Lato-Regular.ttf')
    })

    // check if the user is signed in
    isSignedIn()
    .then(res => this.setState(() => ({ signedIn: res, checkedSignIn: true })))
    .catch(err => Alert.alert('An Error Occured'))

    // let the app know the font was loaded
    this.setState(() => ({
      fontLoaded: true,
    }))

  }

  render() {
    // only load if the font has been loaded
    const { fontLoaded, signedIn, checkedSignIn } = this.state
    console.log(fontLoaded, signedIn, checkedSignIn)
    if (fontLoaded && checkedSignIn) {
      const Layout = createRootNavigator(signedIn)
      return (
        <ApolloProvider client={this.client}>
          <Layout />
        </ApolloProvider>
      )

    } else {

      return (
        null
      )

    }
  }
}

export default App