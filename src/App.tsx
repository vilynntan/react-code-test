import React from 'react'
import Loader from './components/loader'
import UsersList from './components/usersList'

type AppState = {
  isLoading: Boolean
}

class App extends React.Component<any, AppState> {
  readonly state:AppState = {
    isLoading: true
  }
  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 3000);
  }

  render() {
    if(this.state.isLoading) {
        return <Loader />;
    }
    return (<UsersList />)
  }
}

export default App;
