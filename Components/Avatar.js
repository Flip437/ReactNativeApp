// Components/Avatar.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


class Avatar extends React.Component {

  constructor(props) {
    super(props)
    // Plus besoin de l'avatar dans le state du component, il est dans le state global avec une valeu par défaut
    // this.state = {
    //   avatar: require('../Images/ic_tag_faces.png')
    // }
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this)
}

_avatarClicked() {
  launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.assets[0].uri )
        let requireSource = { uri: response.assets[0].uri }
        // PLus besoin de set state, on va demander à une action d'envoyer l'avatar au state global
        // this.setState({
        //   avatar: requireSource
        // })
        // On crée une action avec l'image choisie et on l'envoie au store Redux qui va le mettre dans le state global
        const action = { type: 'SET_AVATAR', value: requireSource }
        // On envoie l'action au store Redux avec la fonction dispatch disponible dans ce component parce qu'on a Mapper le store redux au component en bas "MapStore..."
        this.props.dispatch(action)
      }
    })
}

  render() {
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
                  {/* A présent on peut récupérer notre avatar dans les props. Souvenez-vous Redux mappe notre state global et ses données dans les props de notre component. */}
          {/* <Image style={styles.avatar} source={this.state.avatar} /> */}
          <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)