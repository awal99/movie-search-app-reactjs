import React from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./SliderEntry.style";
import SliderEntry from "../components/SliderEntry";
import styles, { colors } from "./Styles";
import { SearchBar, Button } from "react-native-elements";
import uuidv1 from 'uuid/v1';
//import { scrollInterpolators, animatedStyles } from 'example/src/utils/animations';

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class MyCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   
      movies:[],
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      search: "",
      categoryName: "Action",
      categoryID: "",
      isModalVisible: false,
      isLoading: false
    };

    this._getDataByCAT();
  }

   _getDataByCAT=async(catid)=>{
      let bycatid = catid == null? '12':catid;
    await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a0bd8be297d77d55b7daec77bc34e5c8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${bycatid}`)
    .then((response) => response.json())
    .then(({ results }) => results.map(media => ({...media, key: uuidv1()})))
    .then(results => {
        this.setState({movies:[]});
        this.setState({movies: [...this.state.movies, ...results]
    })});
  }
  updateSearch = search => {
    this.setState({ search });
  };

  async submitSearch () {
     this.setState({categoryName:'Search Results',isLoading:true})
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a0bd8be297d77d55b7daec77bc34e5c8&language=en-US&query=${this.state.search}&page=1&include_adult=false`)
    .then((response) => response.json())
    .then(({ results }) => results.map(media => ({...media, key: uuidv1()})))
    .then(results => {
        this.setState({movies:[]});
        this.setState({movies: [...this.state.movies, ...results]
    })});
  };

  cancelSearch(){
      console.log("canceled");
      this._getDataByCAT();
  }

  loadSelectedCat(catid, cat) {
    ///set selected category and load all data from api////
    this.setState({ categoryName: cat});
    this._getDataByCAT(catid);
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  slidingComponent(param) {
    const { slider1ActiveSlide } = this.state;
    return (
      <View style={styles.exampleContainerDark}>
        <Text style={styles.title}>{this.state.categoryName}</Text>
        {/* <Text style={styles.subtitle}>{title}</Text> */}
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={param}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        {/* <Pagination
                  dotsLength={this.state.entries.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                /> */}
      </View>
    ); 
  }

  render() {
    const { search } = this.state;
    if(this.state.movies.length == 0 && this.state.isLoading == true){
        this.setState({isLoading:false});
        Alert.alert("Information","Your Search returned no results");
    }else if(this.state.isLoading == true){
        this.setState({isLoading:false});
    }
   // let contents = this.slidingComponent();

    return (
      <SafeAreaView style={styles.safeArea}>
        <SearchBar
          round
          containerStyle={styles.searchContainer}
          placeholder="Search Movie by Title"
          onChangeText={this.updateSearch}
          onEndEditing={()=>{this.submitSearch()}}
          onCancel = {()=>{this.cancelSearch()}}
          value={search}
        />

        {/* <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" /> */}

        <View style={styles.container}>
          <StatusBar
            style={{ marginTop: 20, flex: 1 }}
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {/* { this.gradient } */}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {this.slidingComponent(this.state.movies)}
          </ScrollView>
        </View>

        <View style={{ height: 50, flexDirection: "row" }}>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              onPress={() => this.loadSelectedCat('28', "Action")}
              style={{
                backgroundColor: "#FF0000",
                borderRadius: 50,
                margin: 2,
                alignContent: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Action</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.loadSelectedCat('12', "Adventure")}
              style={{
                backgroundColor: "#BDB76B",
                borderRadius: 50,
                margin: 2,
                alignContent: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Adventure</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.loadSelectedCat('10749', "Romantic")}
              style={{
                backgroundColor: "#FFC0CB",
                borderRadius: 50,
                margin: 2,
                alignContent: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Romantic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.loadSelectedCat('35', "Comedy")}
              style={{
                backgroundColor: "#0000ff",
                borderRadius: 50,
                margin: 2,
                alignContent: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Comedy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.loadSelectedCat('27', "Horror")}
              style={{
                backgroundColor: "#8B0000",
                borderRadius: 50,
                margin: 2,
                alignContent: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Horror</Text>
            </TouchableOpacity>
          </ScrollView>
        </View> 

      </SafeAreaView>
    );
  }
}
