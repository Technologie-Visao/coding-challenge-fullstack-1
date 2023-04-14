import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import useFetchSuggestions from "../hooks/textures/useFetchSuggestions";
import {Texture} from "../types/textures/Texture";
import {AutocompleteProps} from "../types/textures/suggestions/AutocompleteProps";


const Autocomplete = ({onSuggestionSelected}: AutocompleteProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const shouldFetch = searchTerm.length >= 2;
  const {data: suggestions, error, loading} = useFetchSuggestions({searchTerm, shouldFetch});

  useEffect(() => {
    setShowSuggestions(shouldFetch);
  }, [shouldFetch]);

  const handleSelect = (selectedSuggestion: Texture) => {
    setSearchTerm("");
    setShowSuggestions(false);
    onSuggestionSelected(selectedSuggestion);
  };

  const renderSuggestions = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    if (suggestions.length === 0) {
      return <Text>No suggestions found</Text>;
    }

    return suggestions.map((suggestion: Texture, index: number) => (
      <TouchableOpacity
        key={index}
        style={styles.suggestion}
        onPress={() => handleSelect(suggestion)}
      >
        <Image
          source={{uri: suggestion.thumbnail_url}}
          style={styles.thumbnail}
        />
        <View>
          <Text style={styles.name}>{suggestion.name}</Text>
          <Text style={styles.description}>
            {suggestion.description.substring(0, 100)}...
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };


  return (
    <View style={styles.autocomplete}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search textures..."
      />
      {showSuggestions &&
        <ScrollView style={styles.suggestions}>
          {renderSuggestions()}
        </ScrollView>
      }
    </View>
  );
};

export default Autocomplete;


const styles = StyleSheet.create({
  autocomplete: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    color: '#333',
  },
  suggestions: {
    width: '100%',
    marginTop: 10,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
});


