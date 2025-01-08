import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '758402777549-a7heftpcacs8uf01um9vod5jjo9jhml7.apps.googleusercontent.com',
  offlineAccess: true, // Ensures a refresh token is returned
  forceCodeForRefreshToken: true, // Forces prompt for reauthentication
});

export const SignInWithGoogle = async () => {
  try {
    // Ensure Google Play Services are available
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Perform Google Sign-In
    const userInfo = await GoogleSignin.signIn();

    console.log('User Info:', userInfo.data); // Log full user info for debugging

    // Extract ID token from the response
    const idToken = userInfo?.data?.idToken; // Correctly access the idToken property

    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create Google credential and sign in with Firebase
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log('Signed in with Google:', userCredential.user);
    return userCredential;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const CreateAccountWithEmailandPassword = async ({
  email,
  password,
  name,
}) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password,
  );
  await userCredential.user.updateProfile({
    displayName: name,
  });
  return userCredential;
};

export const SignInEmailAndPassword = ({email, password}) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOutUser = async () => {
  try {
    // Sign out from Firebase
    await auth().signOut();

    // Sign out from GoogleSignIn API
    await GoogleSignin.signOut();

    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const SignInWithFacebook = async () => {
  // Attempt login with permissions
  try {
    console.log('Starting Facebook Login');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.warn('User cancelled the login process');
      throw new Error('User cancelled the login process');
    }

    console.log('Facebook Login Result:', result);

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.error('No access token obtained');
      throw new Error('Something went wrong obtaining access token');
    }

    console.log('Access Token:', data);

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log('Facebook Credential:', facebookCredential);

    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );
    console.log('Firebase User Credential:', userCredential);

    return userCredential;
  } catch (error) {
    console.error('Error signing in with Facebook:', error);
    throw error;
  }
};
