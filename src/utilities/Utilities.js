import auth from '@react-native-firebase/auth';

export const CreateAccountWithEmailAndPassword = ({email, password}) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signOutUser = () => {
  return auth().signOut();
};
