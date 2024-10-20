import TextLink from '@/components/common/TextLink';
import ThemedText from '@/components/ThemedText';
import PrimaryButton from '@/components/button/PrimaryButton';
import TextInput from '@/components/input/TextInput';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ROUTES from '@/constants/Routes';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const LoginPage = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage('');
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegisterPage = () => {
    router.replace(ROUTES.signUp);
  };

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

      <ThemedText size="h5" weight="regular" textType="error">
        {errorMessage || ' '}
      </ThemedText>
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
        // eslint-disable-next-line no-console
        onPress={() => console.log('Forgot password')}
        size="m"
      >
        Forgot password?
      </TextLink>

      <View style={styles.button}>
        <PrimaryButton
          value="Login"
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </View>

      <TextLink
        style={styles.dontHaveAccountLink}
        onPress={navigateToRegisterPage}
        size="m"
      >
        Don't have an account? Register
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
