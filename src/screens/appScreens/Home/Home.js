import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {signOutUser} from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';
import theme from '../../../styles/theme';

const Home = () => {
  const handleSignout = () => {
    try {
      signOutUser();
      console.log('signed out');
    } catch (error) {
      console.log(error);
    }
  };

  const user = auth().currentUser;

  const getAvatar = () => {
    if (user.photoURL) {
      return <Image source={{uri: user.photoURL}} style={styles.avatar} />;
    }
    return (
      <View style={styles.avatarname}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor}
      />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.userName}>
        {user.displayName ? user.displayName : ''}
      </Text>
      {getAvatar()}
      <TouchableOpacity style={styles.signout} onPress={handleSignout}>
        <Text style={{color: 'white'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    color: theme.textColor,
    marginBottom: 20,
  },
  signout: {
    backgroundColor: theme.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatarname: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
