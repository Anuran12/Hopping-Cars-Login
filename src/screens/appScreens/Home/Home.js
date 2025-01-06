import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {signOutUser} from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';

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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={{fontSize: 20}}>Welcome</Text>
      <Text style={styles.title}>
        {user.displayName ? user.displayName : ''}
      </Text>
      {getAvatar()}
      <TouchableOpacity style={styles.signout} onPress={() => handleSignout()}>
        <Text style={{color: 'white'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 60,
  },
  signout: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 15,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  avatarname: {
    height: 50,
    width: 50,
    display: 'flex',
    borderRadius: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: 'black',
    marginTop: 10,
  },
});
