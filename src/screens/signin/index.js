import React from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  updateEmail,
  updatePassword,
  signin,
} from '../../redux/actions/user';
import {Colours, Buttons} from '../../styles';

const Signin = ({
  navigation,
  route,
  user,
  signin,
}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignin = async () => {
        let body = {
            email,
            password,
        };

        try {
            signin(body);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <View style={styles.signInBtnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignin}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.mainGrey,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    signInBtnContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        ...Buttons.mainButton(Colours.mainBlue),
    },
    buttonText: {
        ...Buttons.mainButtonText(Colours.white),
    },
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {updateEmail, updatePassword, signin}, 
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signin);
