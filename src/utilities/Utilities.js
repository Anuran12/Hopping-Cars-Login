import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '758402777549-a7heftpcacs8uf01um9vod5jjo9jhml7.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

// Function to sign in with Google
export const SignInWithGoogle = async () => {
  try {
    // Ensure Google Play Services are available
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Perform Google Sign-In
    const userInfo = await GoogleSignin.signIn();

    const idToken = userInfo?.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create Google credential and sign in with Firebase
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    return userCredential;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Function to create a new account using email and password
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

// Function to sign in using email and password
export const SignInEmailAndPassword = ({email, password}) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// Function to sign out the user
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

// Function to sign in with Facebook
export const SignInWithFacebook = async () => {
  // Attempt login with permissions
  try {
    // Start Facebook login process with requested permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.warn('User cancelled the login process');
      throw new Error('User cancelled the login process');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.error('No access token obtained');
      throw new Error('Something went wrong obtaining access token');
    }

    console.log('Access Token:', data);

    // Create Facebook credentials for Firebase authentication
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign in to Firebase using Facebook credentials
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );

    return userCredential;
  } catch (error) {
    console.error('Error signing in with Facebook:', error);
    throw error;
  }
};
