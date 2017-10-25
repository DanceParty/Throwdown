import React from 'react'
import { Alert, AsyncStorage, Button, Text, TextInput, View } from 'react-native'

// other imports
import { graphql, compose } from 'react-apollo'

// graphql
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../../server/graphql/User/mutations'

// utils
import { GC_USER_ID, GC_AUTH_TOKEN } from '../../utils/constants'



class UserForm extends React.Component {

  state = {
    login: true,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  confirm = async () => {
    const { email, password, firstName, lastName } = this.state
    console.log(email, password, firstName, lastName)
    if (this.state.login) {
      console.log('this isnot where we should be')
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password,
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this.saveUserData(id, token)
      this.props.navigation.navigate('HomePage')
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          email,
          password,
          firstName,
          lastName,
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this.saveUserData(id, token)
      this.props.navigation.navigate('HomePage')
    }
  
  }

  saveUserData = (id, token) => {
    AsyncStorage.setItem(GC_USER_ID, id)
    AsyncStorage.setItem(GC_AUTH_TOKEN, token)
  }

  render() {

    const { login } = this.state

    if (login) {

      return (
        <View>
        
        <TextInput
          autoCapitalize="none"
          autoCorrect={ false }
          keyboardType="email-address"
          maxLength={ 100 }
          onChangeText={ (text) => this.setState(() => ({ email: text })) }
          placeholder="Email"
          placeholderTextColor="grey"
          style={{ color: 'black' }}
          value={ this.state.email }
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={ false }
          keyboardType="default"
          onChangeText={ (text) => this.setState(() => ({ password: text })) }
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          style={{ color: 'black' }}
          value={ this.state.password }
        />

        <Button
          accessibilityLabel="Login"
          color="black"
          onPress={() => {
            this.setState(() => ({ login: true }))
            this.confirm()
          } }
          testID="login_button"
          title="Login"
        />

        <Text
          onPress={ () => this.setState(() => ({ login: false })) }
        >
          Click to sign up
        </Text>

      </View>
      )
      
    } else {

      return (
        <View>
        
          <TextInput
            autoCapitalize="words"
            autoCorrect={ false }
            keyboardType="default"
            maxLength={ 30 }
            onChangeText={ (text) => this.setState(() => ({ firstName: text })) }
            placeholder="First name"
            placeholderTextColor="grey"
            style={{ color: 'black' }}
            value={ this.state.firstName }
          />
          <TextInput
            autoCapitalize="words"
            autoCorrect={ false }
            keyboardType="default"
            maxLength={ 30 }
            onChangeText={ (text) => this.setState(() => ({ lastName: text })) }
            placeholder="Last name"
            placeholderTextColor="grey"
            style={{ color: 'black' }}
            value={ this.state.lastName }
          />

          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            keyboardType="email-address"
            maxLength={ 100 }
            onChangeText={ (text) => this.setState(() => ({ email: text })) }
            placeholder="Email"
            placeholderTextColor="grey"
            style={{ color: 'black' }}
            value={ this.state.email }
          />

          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            keyboardType="default"
            onChangeText={ (text) => this.setState(() => ({ password: text })) }
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            style={{ color: 'black' }}
            value={ this.state.password }
          />

          <Button
            accessibilityLabel="Signup"
            color="black"
            onPress={() => {
              this.setState(() => ({ login: false }))
              this.confirm()
            } }
            testID="signup_button"
            title="SignUp"
          />

          <Text
            onPress={ () => this.setState(() => ({ login: true })) }
          >
            Click to login
          </Text>

        </View>
      )

    }
  }

}

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation'}),
)(UserForm)