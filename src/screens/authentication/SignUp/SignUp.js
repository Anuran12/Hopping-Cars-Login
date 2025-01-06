import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  CreateAccountWithEmailandPassword,
  SignInWithFacebook,
  SignInWithGoogle,
} from '../../../utilities/Utilities';
import theme from '../../../styles/theme';
import Logo from '../../../assets/images/Logo.png';
import GoogleIcon from '../../../assets/icons/Google.png';
import FacebookIcon from '../../../assets/icons/Facebook.png';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const getErrors = (name, email, password, confirmPassword) => {
    const errors = {};
    if (!name) {
      errors.name = 'Please Enter Name';
    }
    if (!email) {
      errors.email = 'Please Enter Email';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Please Enter a Valid Email';
    }

    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Enter Confirm Password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSignup = () => {
    const validationErrors = getErrors(name, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      CreateAccountWithEmailandPassword({email, password, name})
        .then(() => {
          ToastAndroid.show('Account Created', ToastAndroid.SHORT);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            return setErrors({email: 'Email already in use'});
          }
          if (error.code === 'auth/invalid-email') {
            return setErrors({email: 'Email id invalid'});
          }
          console.log(error);
        });
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: theme.backgroundColor,
        height: '100%',
      }}>
      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={Logo} />
          <Text style={{color: 'white', textAlign: 'right'}}>
            Detailing Studio
          </Text>
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity onPress={handleSignup} style={styles.signin}>
          <Text style={styles.signinText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.continueWith}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign Up With</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            onPress={() =>
              SignInWithGoogle().then(() =>
                ToastAndroid.show('Signed In', ToastAndroid.SHORT),
              )
            }
            style={styles.signinwith}>
            <Image source={GoogleIcon} style={styles.icon} />
            <Text style={styles.signinText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SignInWithFacebook()}
            style={styles.signinwith}>
            <Image source={FacebookIcon} style={styles.icon} />
            <Text style={styles.signinText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingVertical: 30,
    paddingTop: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginVertical: 20,
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
    color: 'black',
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderColor: theme.inputBorderColor,
    borderWidth: 1,
  },
  signin: {
    backgroundColor: theme.primaryColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 40,
  },
  signinText: {
    color: '#222222',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: -8,
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
  socialButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  icon: {
    width: 20,
    height: 20,
  },
  footer: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
  },
  linkText: {
    fontWeight: '700',
    color: theme.secondaryColor,
    textDecorationLine: 'underline',
  },
});
