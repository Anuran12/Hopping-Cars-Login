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
  return (
    <View style={styles.main}>
      <Text style={{fontSize: 20}}>Welcome</Text>
      <Text style={styles.title}>
        {user.displayName ? user.displayName : ''}
      </Text>
      <Image source={{uri: user.photoURL}} style={styles.avatar} />
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
});
