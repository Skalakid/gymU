import TextLink from '@/components/TextLink';
import { ThemedText } from '@/components/ThemedText';
import PrimaryButton from '@/components/button/PrimaryButton';
import TextInput from '@/components/input/TextInput';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageWithGoBackHeader style={styles.container}>
      <View style={styles.headingText}>
        <ThemedText size="h4" weight="semiBold">
          Hello 👋
        </ThemedText>
        <ThemedText size="l" weight="medium" textType="description">
          Welcome back! You have been missed during this time
        </ThemedText>
      </View>

      <TextInput
        label="Email"
        placeholder="Enter your email..."
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        type="password"
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <TextLink
        style={styles.forgotPasswordLink}
        onPress={() => console.log('Forgot password')}
        size="m"
      >
        Forgot password?
      </TextLink>

      <View style={styles.button}>
        <PrimaryButton value="Login" onPress={() => console.log('Login')} />
      </View>

      <TextLink
        style={styles.dontHaveAccountLink}
        onPress={() => console.log("Don't have an account?")}
        size="m"
      >
        Don’t have an account? Register
      </TextLink>
    </PageWithGoBackHeader>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  headingText: {
    gap: 5,
    marginBottom: 10,
  },
  forgotPasswordLink: {
    textAlign: 'right',
    marginBottom: 10,
  },
  dontHaveAccountLink: {
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 40,
  },
});
