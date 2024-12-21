import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constans";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Loader isLoading={loading} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* <Image
            source={images.h1}
            style={styles.image1}
            resizeMode="contain"
          /> */}

          {/* <Image
            source={images.onboarding1}
            style={styles.image2}
            resizeMode="contain"
          /> */}

          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={styles.highlightedText}>Aora</Text>
            </Text>

            <Image
              source={images.message}
              style={styles.messageImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.subText}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={styles.buttonContainer}
            textStyles={styles.buttonText}
            isLoading={false}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#161622",
    flex: 1,
  },
  scrollViewContent: {
    height: "100%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  textContainer: {
    position: "relative",
    marginTop: 20,
  },
  mainText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  highlightedText: {
    color: "#secondary-200", // Replace with actual color code
  },
  messageImage: {
    width: 136,
    height: 15,
    position: "absolute",
    bottom: -8,
    right: -32,
  },
  subText: {
    fontSize: 14,
    fontFamily: "pregular", // Ensure this font is available
    color: "#b0b0b0", // Replace with actual gray color code
    marginTop: 28,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 28,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Welcome;