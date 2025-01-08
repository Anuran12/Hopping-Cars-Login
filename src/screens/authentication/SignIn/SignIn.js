import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  SignInEmailAndPassword,
  SignInWithFacebook,
  SignInWithGoogle,
} from '../../../utilities/Utilities';
import theme from '../../../styles/theme';
import Logo from '../../../assets/images/Logo.png';
import CarImage from '../../../assets/images/car_image.png';
import GoogleIcon from '../../../assets/icons/Google.png';
import FacebookIcon from '../../../assets/icons/Facebook.png';
import EyeIcon from '../../../assets/icons/eye.png';
import EyeoffIcon from '../../../assets/icons/eye-off.png';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  const getErrors = (email, password) => {
    const errors = {};
    if (!email) {
      errors.email = 'Please Enter Email';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Please Enter a Valid Email';
    }

    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Enter password of 8 characters';
    }
    return errors;
  };

  const SignInhandle = (email, password) => {
    SignInEmailAndPassword({email, password})
      .then(() => ToastAndroid.show('Logged In', ToastAndroid.SHORT))
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          return setErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          });
        }
      });
  };

  const handleSignin = () => {
    const errors = getErrors(email, password);

    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(errors);
      console.log(errors);
    } else {
      setErrors({});
      setShowErrors(false);
      SignInhandle(email, password);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: theme.backgroundColor,
        height: '100%',
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor}
      />
      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Image source={Logo} />
          <Text style={{color: 'white', textAlign: 'right'}}>
            Detailing Studio
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 50,
            paddingBottom: 30,
            display: 'flex',
            paddingHorizontal: 50,
          }}>
          <Image source={CarImage} style={styles.car} />
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.form}>
            <View style={{width: '100%'}}>
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={email}
                onChangeText={e => setEmail(e)}
                style={styles.input}></TextInput>
              {errors.email && (
                <Text style={{fontSize: 14, color: 'red'}}>{errors.email}</Text>
              )}
            </View>
            <View style={{width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  borderColor: theme.inputBorderColor,
                  borderWidth: 1,
                  borderRadius: 25,
                  marginVertical: 10,
                }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry={hidePassword}
                  value={password}
                  onChangeText={e => setPassword(e)}
                  style={styles.input1}></TextInput>
                {password.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    style={{marginRight: 16}}>
                    <Image
                      source={hidePassword ? EyeoffIcon : EyeIcon}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {errors.password && (
                <Text style={{fontSize: 14, color: 'red'}}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 13,
                    color: theme.secondaryColor,
                    textAlign: 'right',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleSignin()}
            style={styles.signin}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '800',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.continueWith}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or Sign In With</Text>
            <View style={styles.line} />
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                SignInWithGoogle().then(() =>
                  ToastAndroid.show('Signed In', ToastAndroid.SHORT),
                )
              }
              style={styles.signinwith}>
              <Image source={GoogleIcon} style={{width: 20, height: 20}} />
              <Text
                style={{
                  color: '#222222',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SignInWithFacebook()}
              style={styles.signinwith}>
              <Image source={FacebookIcon} style={{width: 20, height: 20}} />
              <Text
                style={{
                  color: '#222222',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Join Us</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingVertical: 10,
    paddingTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    color: 'white',
    fontWeight: '900',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
    color: 'white',
    backgroundColor: 'transparent',
    borderColor: theme.inputBorderColor,
    borderWidth: 1,
    borderRadius: 25,
  },
  input1: {
    paddingVertical: 15,
    paddingHorizontal: 20,

    fontSize: 14,
    color: 'white',
    backgroundColor: 'transparent',
  },
  signin: {
    backgroundColor: theme.primaryColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 40,
  },
  signinwith: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '45%',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 40,
  },
  car: {
    width: 300,
    height: 130,
    resizeMode: 'contain',
  },
  continueWith: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 10,
  },

  orText: {
    fontSize: 14,
    color: theme.textColor,
    fontWeight: '600',
  },
  signupContainer: {
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  signupText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: 'gray',
  },

  signupLink: {
    fontWeight: '700',
    color: theme.secondaryColor,
    textDecorationLine: 'underline',
  },
});
