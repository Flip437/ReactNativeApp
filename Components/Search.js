// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {


  constructor(props) {
    super(props)
    this.state = { 
      films: [],
      isLoading: false
     }
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
  }

  _loadFilms() {
    if(this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({ 
          films: [ ...this.state.films, ...data.results ],//films: this.state.films.concat(data.results)
          isLoading: false
        })
      });
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayLoading() {

    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }

  _searchFilms() {
    // Ici on va remettre à zéro les films de notre state
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("Détail des films", { idFilm: idFilm })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        {this._displayLoading()}
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => 
            <FilmItem
              film={item}
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms()
            }
          }}
          extraData={this.props.favoritesFilm}
        />

      </View>
    )
  }


}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    height: 150,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10
  },
  text : {
    fontSize: 20,
    color: 'red'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)