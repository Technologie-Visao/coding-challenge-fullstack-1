import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Autocomplete from '../../components/Autocomplete';
import TextureCard from "../../components/cards/TextureCard";
import {Texture} from "../../types/textures/Texture";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';

const SearchPage = () => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<Texture[]>([]);

  const handleSuggestionSelected = (suggestion: Texture) => {
    setSelectedSuggestions((prevSelected) => [...prevSelected, suggestion]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {fontSize: wp('6%')}]}>Choose Textures</Text>
      <Autocomplete onSuggestionSelected={(suggestion: Texture) => handleSuggestionSelected(suggestion)}/>
      <View style={styles.selectedSuggestions}>
        {selectedSuggestions.map((suggestion, index) => (
          <TextureCard key={index} suggestion={suggestion}/>
        ))}
      </View>
      <Text style={styles.footer}>Powered by React Native Web</Text>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingTop: hp('8%'),
    paddingBottom: hp('8%'),
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    color: '#333',
  },
  selectedSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginTop: 16,
    width: '100%',
    paddingHorizontal: wp('4%'),
  },
  footer: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    marginTop: hp('4%'),
    color: '#999',
  },
});
