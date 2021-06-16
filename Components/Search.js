// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'

// Components/Search.js


import FilmItem from './FilmItem.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = { films: [] }
    this.searchedText = ""
  }

  _loadFilms() {
    console.log(this.searchedText);

    if(this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({ films: data.results})
      });
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  render() {
    console.log("RENDER")
    return (
      <View style={styles.main_container}>
        <TextInput 
          style={styles.textinput} 
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          />
        <Button title='Rechercher' onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem url={"https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg"} film={item}/>}
        />
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search