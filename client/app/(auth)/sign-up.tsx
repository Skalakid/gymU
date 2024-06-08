import TextLink from '@/components/TextLink';
import { ThemedText } from '@/components/ThemedText';
import SecondaryButton from '@/components/button/SecondaryButton';
import TextInput from '@/components/input/TextInput';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <PageWithGoBackHeader style={styles.container}>
      <View style={styles.headingText}>
        <ThemedText size="h4" weight="semiBold">
          Nice to meet you 🙌
        </ThemedText>
        <ThemedText size="l" weight="medium" textType="description">
          One account, ton of possibilities. Plan workouts, train in live mode,
          track your progress and much more!
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
      <TextInput
        label="Repeat password"
        placeholder="Repeat your password..."
        type="password"
        onChangeText={(password) => setRepeatPassword(password)}
        value={repeatPassword}
      />

      <View style={styles.button}>
        <SecondaryButton
          value="Register"
          onPress={() => console.log('Login')}
        />
      </View>

      <TextLink
        style={styles.alreadyHaveAccountLink}
        onPress={() => console.log('Already have an account?')}
        size="m"
      >
        Don’t have an account? Register
      </TextLink>
    </PageWithGoBackHeader>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  headingText: {
    gap: 5,
    marginBottom: 10,
  },
  link: {
    textAlign: 'right',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 40,
  },
  alreadyHaveAccountLink: {
    textAlign: 'center',
    marginTop: 10,
  },
});
