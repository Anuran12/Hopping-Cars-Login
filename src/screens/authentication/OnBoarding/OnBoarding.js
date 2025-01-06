import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import theme from '../../../styles/theme'; // Importing theme for consistent styling
import Logo from '../../../assets/images/Logo.png'; // Assuming you have a logo image

const OnBoarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.subTitle}>
          Elevate your vehicle's appearance with our expert detailing services,
          featuring premium multi-brand PPF and Ceramic Coating options for a
          stunning shine. Visit us today!
        </Text>
        <TouchableOpacity
          style={styles.signin}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {},
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
    color: theme.textColor,
    marginBottom: 20,
  },
  signin: {
    backgroundColor: theme.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  signinText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
