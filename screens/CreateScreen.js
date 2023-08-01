import LanguageForm from "../components/LanguageForm";

function CreateScreen({ navigation }) {
  const bringBackToMainScreen = () => {
    navigation.navigate("MainScreen");
  };

  return <LanguageForm onCreatedLangSet={bringBackToMainScreen} />;
}

export default CreateScreen;
