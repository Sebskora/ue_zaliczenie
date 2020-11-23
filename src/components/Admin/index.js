import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAuth: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      // NO AUTH
      if (authUser.email !== "admin@o2.pl") {
        this.props.history.push(ROUTES.HOME);
      }

    })
    this.props.firebase.users().on('value', snapshot => {

      const usersObject = snapshot.val();
      console.log(usersObject)
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <h2>Lista uzytkowników:</h2>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div >
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <div>

        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>

            <strong>Username:</strong> {user.username}
          </span>
        </li>

      </div>
    ))}
  </ul >
);


const condition = authUser =>
  !!authUser

export default withFirebase(withAuthorization(condition)(AdminPage))
