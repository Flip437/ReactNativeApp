import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'

class FilmList extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('Détail des films', {idFilm: idFilm})
  }

  render(){
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        extraData={this.props.favoritesFilm} //permet à la flatlist de se re rendre quand une donnée extérieur (qui n'est pas dans sa props data) est modifiée)
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
          if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
            console.log("LOAD MORE FILMS FROM FILM LIST COMPONENT")
            console.log("LOAD MORE FILMS FROM FILM LIST COMPONENT")
            // On appelle la méthode loadFilm du component Search pour charger plus de films
            this.props.loadFilms()
          }
        }}
      />
    )
  }

}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toogleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)

