import TextLink from '@/components/common/TextLink';
import ThemedText from '@/components/ThemedText';
import SecondaryButton from '@/components/button/SecondaryButton';
import TextInput from '@/components/input/TextInput';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ROUTES from '@/constants/Routes';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedView from '@/components/ThemedView';
import RadioGroup from 'react-native-radio-buttons-group';
import { useTheme } from '@react-navigation/native';

const SignUpPage = () => {
  const { register } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [gender, setGender] = useState('');

  const genderRadioButtons = useMemo(
    () => [
      {
        id: 'M',
        label: 'Male',
        labelStyle: { color: theme.colors.text },
      },
      {
        id: 'F',
        label: 'Female',
        labelStyle: { color: theme.colors.text },
      },
    ],
    [],
  );

  const handleRegisterUser = async () => {
    try {
      setErrorMessage('');
      setIsLoading(true);
      await register(email, username, password, gender);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLoginPage = () => {
    router.replace(ROUTES.login);
  };

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
        label="Username"
        placeholder="Enter your username..."
        onChangeText={(text) => setUsername(text)}
        value={username}
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

      <ThemedView>
        <ThemedText size="m" weight="medium">
          Gender:
        </ThemedText>
        <RadioGroup
          containerStyle={styles.radioButtons}
          radioButtons={genderRadioButtons}
          onPress={setGender}
          selectedId={gender}
        />
      </ThemedView>

      <View style={styles.button}>
        <SecondaryButton
          value="Register"
          onPress={handleRegisterUser}
          isLoading={isLoading}
        />
      </View>

      <TextLink
        style={styles.alreadyHaveAccountLink}
        onPress={navigateToLoginPage}
        size="m"
      >
        Already have an account? Login
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
  radioButtons: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
