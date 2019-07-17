import React, { Component } from "react";
import { View, Button, Text, Image, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../screens/SliderEntry.style";
import Modal from "react-native-modal";

export default class SliderEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  } 
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { poster_path },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
        style={styles.image}
      />
    );
  }

  _toggleModal() {
    console.log("In modal");
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    // console.log(this.state.isModalVisible);
  }

  render() {
    const {
      data: { title, overview, release_date,vote_average, },
      even
    } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.setState({ isModalVisible: true });
        }}
      >
     
        <View style={styles.shadow} />
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {overview}
          </Text>
        </View>
    
        <Modal
          isVisible={this.state.isModalVisible}
          style={styles.slideInnerContainer}
          onSwipeComplete={() => this.setState({ isModalVisible: false })}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
            onPress={() => {this.setState({ isModalVisible: false }) }}
          >
         
          
            <View style={styles.shadow} />
            <View
              style={
                styles.modalImageContainer
              } 
            >
              {this.image}
              <View
                style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
              />
            </View>
            <View
              style={[
                styles.textContainer,
                even ? styles.textContainerEven : {}
              ]}
            >
              {uppercaseTitle}
              <Text
                style={[styles.subtitle, even ? styles.subtitleEven : {}]}
              >
                {overview}
              </Text>
             
            <View style={{flexDirection:'column',justifyContent:'flex-start',alignContent:'flex-start'}}>
              <Text  style={[styles.subtitle, even ? styles.subtitleEven : {}]}>Release Date: {release_date}</Text>
              <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]}>Rating: {vote_average}</Text>
          </View>
          </View> 
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  }
}
