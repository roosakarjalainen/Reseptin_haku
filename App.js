import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error(error);
      setMeals([]);
    }
  };

  const renderMealItem = ({ item }) => {
    return (
      <View style={styles.mealItem}>
        <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
        <Text style={styles.title}>{item.strMeal}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search for meals by ingredient:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an ingredient"
        value={ingredient}
        onChangeText={text => setIngredient(text)}
      />
      
      <TouchableOpacity style={styles.button} onPress={fetchMeals}>
        <Text style={styles.buttonText}>FIND</Text>
      </TouchableOpacity>
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
