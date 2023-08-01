import { useState } from 'react';

import { View } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

function LanguageInput({ onSelectedFlag, flagValue }) {
  let conditional = flagValue && flagValue.toUpperCase();

  const [countryCode, setCountryCode] = useState(conditional);
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(true);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    onSelectedFlag(country.cca2.toLowerCase());
  };
  return (
    <View>
      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
      />
    </View>
  );
}

export default LanguageInput;
