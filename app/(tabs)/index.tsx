import { Image, StyleSheet, Platform } from 'react-native';
import Home from '@/components/homeComponent/home';
import Login from '@/components/authenticationComponent/login';


export default function HomeScreen() {
  return (
    <Home />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
