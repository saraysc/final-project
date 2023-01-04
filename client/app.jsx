import React from 'react';
import Groups from './pages/groups';
import { parseRoute } from './lib';
import Header from './components/header';
import GroupList from './pages/groupList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <GroupList />;
    }
    if (route.path === 'groups') {
      const groupId = route.params.get('groupId');
      return <Groups groupId={groupId} />;
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
