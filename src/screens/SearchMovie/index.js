import React, {useState} from 'react';
import {
  SafeAreaView, 
  FlatList, 
  View, 
  Text,
  Image, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
} 
  from 'react-native';
import {Colours, Buttons} from '../../styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  movie,
  searchResults,
} from '../../redux/actions/movies';

const SearchMovie = ({
  navigation, 
  user, 
  movie,
  movies,
  searchResults,
}) => {
  const [searchMovie, setSearchMovie] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSearch = async () => {
      await searchResults(searchMovie);
      setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBarInput}
            value={searchMovie}
            placeholder="Search Movie"
            onChangeText={value => setSearchMovie(value)}
          />
        </View>
        <TouchableOpacity 
          style={styles.SearchBox} 
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      
        {isLoading ? (
            <Text style={styles.smallHeader}></Text>
          ) : movies && movies.searchMovies.length > 0 ? (
            <FlatList
              data={movies.searchMovies}
              renderItem={({item}) => (
                  <View style={styles.movie}>
                    <Text style={styles.subHeader}>{item.original_title}</Text>
                    <Text style={styles.subHeader}>Release Date: {item.release_date}</Text>
                    <Image
                      style={imageStyle(item.poster_path ? 300 : 0)}
                      source={
                        item.poster_path ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path} : null
                      }
                    />
                    <Text style={styles.subHeader}>Rate: {item.vote_average}</Text>
                    <View style={styles.info}>
                      <Text style={styles.smallHeader}>
                        {item.overview.substring(0, 150)}...
                      </Text>
                    </View>
                  </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.smallHeader}>We could not get the movies, please try again later</Text>
        )}
    </SafeAreaView>
  );
};

const imageStyle = height => {
  return {
    width: '100%',
    backgroundColor: '#a9a9a9',
    borderRadius: 10,
    height: height,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  searchResultContainer: {
    width: '100%',
  },
  nullText: {
    margin: 5,
    color: 'grey',
  },
  searchBarContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#a9a9a9',
    textAlignVertical: 'center',
  },
  SearchBox: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  smallHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#808080',
    marginBottom: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({movie, searchResults}, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchMovie);
