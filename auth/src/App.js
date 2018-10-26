import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: null };
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB3vZ8uG8q9EJKkC104jZuNlsPanyOjDCg',
            authDomain: 'auth-react-native-2nd-project.firebaseapp.com',
            databaseURL: 'https://auth-react-native-2nd-project.firebaseio.com',
            projectId: 'auth-react-native-2nd-project',
            storageBucket: 'auth-react-native-2nd-project.appspot.com',
            messagingSenderId: '225775134226'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;