import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Platform } from 'react-native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const unstable_settings = {
  anchor: '(tabs)',
};

// -------------- init parse server -------------- //
Parse.CoreManager.set('LiveQueryController', {
  createController() { return null; }, // or simply null if older versions allow
});

if (Platform.OS !== 'web') {
  Parse.setAsyncStorage(AsyncStorage);
}
Parse.initialize('kcbuLhVBEFELnPfAW', 'xxx');
Parse.serverURL = '192.168.88.18:8090' + '/parse';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
