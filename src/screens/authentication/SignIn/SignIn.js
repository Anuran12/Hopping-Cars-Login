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
  SignInEmailAndPassword,
  signInEmailAndPassword,
} from '../../../utilities/Utilities';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // if (error.code === 'auth/user-not-found') {
        //   return setErrors({email: 'User not found'});
        // }
        // if (error.code === 'auth/wrong-password') {
        //   return setErrors({password: 'Password is incorrect'});
        // }
        console.log(error);
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
      style={{paddingHorizontal: 20, backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
        <Text style={styles.title}>Welcome Back</Text>
        <View style={{width: '100%'}}>
          <View style={styles.form}>
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
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
              value={password}
              onChangeText={e => setPassword(e)}
              style={styles.input}></TextInput>
            {errors.password && (
              <Text style={{fontSize: 14, color: 'red'}}>
                {errors.password}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleSignin()}
            style={styles.signin}>
            <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signin}>
            <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'gray',
            }}>
            don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text> Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

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
});
