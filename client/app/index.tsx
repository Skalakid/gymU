import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import Images from "@/constants/Images";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

const StartPage = () => {
  return (
    <ThemedView style={styles.page}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.orangeLogo}
          style={styles.image}
          contentFit="contain"
        />
      </View>
      <View style={styles.content}>
        <ThemedText size="h2" weight="semiBold" style={[styles.welcomeText]}>
          Welcome to gymU
        </ThemedText>
        <ThemedText size="m" weight="medium" style={[styles.subText]}>
          Change habits, train hard, gain muscles and progress with us now!
        </ThemedText>

        <PrimaryButton value="Login" onPress={() => router.push("/login")} />
        <SecondaryButton
          value="Sign up"
          onPress={() => router.push("/sign-up")}
        />
      </View>
    </ThemedView>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  content: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 10,
  },
  welcomeText: {
    width: 200,
    textAlign: "center",
  },
  subText: {
    textAlign: "center",
    paddingVertical: 10,
  },
});
