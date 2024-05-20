import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './App/Screen/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import { SessionProvider } from './App/Screen/HomeScreen/SessionContext';
import AppNavigator from './App/Navigations/AppNavigator';

const tokenCache = {
  async getToken(key) {
    try {
      const token = await SecureStore.getItemAsync(key);
      console.log('Retrieved token:', token); // Log retrieved token
      return token;
    } catch (err) {
      console.error('Error retrieving token:', err); // Log retrieval error
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      console.log('Saving token:', value); // Log token being saved
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Error saving token:', err); // Log saving error
    }
  },
};

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_c2FjcmVkLWVsZXBoYW50LTIxLmNsZXJrLmFjY291bnRzLmRldiQ'}>
      <SessionProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <SignedIn>
              <AppNavigator/>
            </SignedIn>
            <SignedOut>
              <Login/>
            </SignedOut>
          </View>
        </NavigationContainer>
      </SessionProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
});
