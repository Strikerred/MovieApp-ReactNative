import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovies} from '../../redux/actions/movies';
import {Colours, Buttons} from '../../styles';

const PopularMovies = ({
    navigation,
    route,
    user,
    movies,
    getMovies,
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [search, setSearch] = React.useState('');
    const [movie, setMovie] = React.useState('');
    
    const initializeGroups = async () => {
        await getMovies();
        setIsLoading(false);
    };
    
    React.useEffect(() =>{
        initializeGroups();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity 
              style={styles.SearchBox} 
              onPress={() => navigation.navigate('Search Movie')}
            >
              <Text style={styles.buttonText}>Search a Movie</Text>
            </TouchableOpacity>
            {isLoading ? (
              <Text style={styles.smallHeader}>Loading..</Text>
            ) : movies && movies.moviesList.length > 0 ? (
              <FlatList
                data={movies.moviesList}
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
          </View>
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
  searchBar: {
    backgroundColor: '#fff',
  },
  top: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnHeader: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  movie: {
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 15,
    borderBottomColor: 'lightgrey',
    borderTopColor: 'rgba(0,0,0,0)',
    borderWidth: 0.3,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  smallHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#808080',
  },
  icon: {
    width: 28,
    height: 28,
  },
  container: {
    flex: 1,
  },
  SearchBox: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  buttonText: {
    ...Buttons.mainButtonText(Colours.white),
  },
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getMovies}, dispatch);
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
)(PopularMovies);