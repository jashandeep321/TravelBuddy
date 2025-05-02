import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Alert,
} from 'react-native';
import { TouchableOpacity, Text as RNText } from 'react-native';
import {SafeAreaView } from 'react-native';

const image = {uri: 'https://res.cloudinary.com/dzyb93kms/image/upload/v1746185447/WhatsApp_Image_2025-05-02_at_4.59.44_PM_qx7iei.jpg'};

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="JohnDoe@gmail.com"
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        {/* <View style={styles.buttonContainer}>
            <Button
              title="Login"
              color="#024F55"
              onPress={() => Alert.alert('Login Successful.')}
            />
          </View> */}

<TouchableOpacity style={styles.loginButton} onPress={() => Alert.alert('Login Successful.')}>
  <RNText style={styles.loginButtonText}>Login</RNText>
</TouchableOpacity>

          </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dim effect
  },
  loginBox: {
    width: '90%',
    // height:'50%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    zIndex: 1,
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
  // buttonContainer: {
  //   marginTop: 50,
  //   width: '100%',
  //   borderRadius: 15,
  //   height: 60,
  //   // overflow: 'hidden',
  // },

  loginButton: {
    backgroundColor: '#024F55',
    height: 55,                // Increased height
    borderRadius: 12,          // More rounded
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
  
});

export default Login;