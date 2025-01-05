import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const OnBoarding = ({navigation}) => {
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title2}>Hopping Cars</Text>
        <Text style={styles.subTitle}>
          Elevate your vehicle's appearance with our expert detailing services,
          featuring premium multi-brand PPF and Ceramic Coating options for a
          stunning shine. Visit US Today !
        </Text>
        <TouchableOpacity
          style={styles.signin}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={{color: 'white', fontSize: 16}}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  title: {
    fontSize: 35,
  },
  title2: {
    fontSize: 40,
    fontWeight: 800,
  },
  subTitle: {
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontWeight: 500,
    color: 'gray',
  },
  signin: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 15,
  },
});
