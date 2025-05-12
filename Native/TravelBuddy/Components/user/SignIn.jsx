import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, SafeAreaView, ActivityIndicator, TouchableOpacity, Text as RNText } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: 'YOUR_ANDROID_WEB_CLIENT_ID',  // Use the Web Client ID for Android (for now, it's necessary in some cases)
  offlineAccess: true,
});

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(getAuth(), googleCredential);
      Alert.alert('Success', `Welcome ${userCredential.user.displayName}`);
      navigation.navigate('Destinations');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Destinations');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else {
        Alert.alert('Login Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="JohnDoe@gmail.com"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <RNText style={styles.loginButtonText}>Login</RNText>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
          <RNText style={styles.googleButtonText}>Continue with Google</RNText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBox: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#000000aa',
    borderRadius: 8,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 20,
    fontSize: 18,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#024F55',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
