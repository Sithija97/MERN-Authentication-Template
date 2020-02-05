import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default class HomeScreen extends React.Component {
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null}); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const userInfo = this.props.navigation.getParam('userInfo');

    return (
      <View style={styles.Container}>
        <Text style={{fontWeight: 'bold'}}>Home</Text>
        <Text>{userInfo && userInfo.user && userInfo.user.email}</Text>
        <Text>{userInfo && userInfo.user && userInfo.user.name}</Text>
        {userInfo && userInfo.user && (
          <Image
            style={{width: '50%', height: 250}}
            source={{uri: userInfo.user.photo}}
          />
        )}
        <Button title="Logout" onPress={this.signOut}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
