import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import * as Crypto from 'expo-crypto';

const emailSuffix = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'protonmail.com',
  '163.com',
  'yeah.net',
];

export default function Login({}) {
  const [email, setEmail] = useState('farhampton@gmail.com');
  const [password, setPassword] = useState('farhampton');
  const onLogin = async () => {
    const token = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      JSON.stringify({ email, password }),
    );
    const res = await supabase
      .from('user')
      .update([{ login_at: new Date().toISOString() }])
      .eq('token', token);
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            value={email}
            onChange={({ nativeEvent: { text } }) => setEmail(text)}
          />
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emailSuffixScrollView}
          >
            {emailSuffix.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.emailSuffixItem}
                onPress={() => setEmail((c) => c + '@' + item)}
              >
                <Text>@{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.formItem}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            onChange={({ nativeEvent: { text } }) => setPassword(text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 20,
  },
  formItem: {
    width: '80%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  inputLabel: {
    width: 70,
    display: 'flex',
    alignItems: 'flex-end',
  },
  inputLabelText: {
    letterSpacing: 1,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#0601b4',
  },
  input: {
    flex: 1,
    height: '100%',
    borderWidth: 2,
    borderColor: '#1e7ed4',
    borderRadius: 15,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#1e7ed4',
  },
  scrollViewContainer: {
    width: '80%',
  },
  emailSuffixScrollView: {
    paddingVertical: 20,
  },
  emailSuffixItem: {
    borderWidth: 1,
    borderColor: '#aad3f8',
    borderStyle: 'solid',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 8,
  },
  emailSuffixItemText: {
    color: '#1e7ed4',
  },
  loginButton: {
    width: 300,
    height: 50,
    marginTop: 20,
    backgroundColor: '#1e7ed4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 30,
    fontStyle: 'italic',
  },
});
