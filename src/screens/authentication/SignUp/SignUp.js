import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {
  CreateAccountWithEmailandPassword,
  SignInWithFacebook,
  SignInWithGoogle,
} from '../../../utilities/Utilities';

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

  const SignUp = (email, password) => {
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
  };

  const handleSignup = () => {
    const validationErrors = getErrors(name, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      SignUp(email, password);
      console.log('Signup Successful');
      // Proceed with sign-up logic
    }
  };

  return (
    <View
      style={{paddingHorizontal: 20, backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
        <Text style={styles.title}>Welcome</Text>
        <View style={{width: '100%'}}>
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
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

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
          <TouchableOpacity
            onPress={() =>
              SignInWithGoogle().then(() =>
                ToastAndroid.show('Signed In', ToastAndroid.SHORT),
              )
            }
            style={styles.signin}>
            <Text style={styles.signinText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SignInWithFacebook()}
            style={styles.signin}>
            <Text style={styles.signinText}>Continue with Facebook</Text>
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    marginBottom: 80,
    color: 'black',
    letterSpacing: 2,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
    color: 'black',
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  signin: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 15,
  },
  signinText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: -8,
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
    color: 'blue',
  },
});
