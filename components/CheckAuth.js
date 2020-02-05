import React, {Component} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import {ActivityIndicator} from 'react-native';

class CheckAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.isSignedIn();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.isSignedIn();
    }
  }

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({isSignedIn: isSignedIn});
    if (isSignedIn) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return this.state.isSignedIn && <ActivityIndicator />;
  }
}

export default CheckAuth;
