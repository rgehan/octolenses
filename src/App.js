import React from 'react';
import { connect } from 'react-redux';

import { Header } from './components/Header';
import { Discover, Dashboard } from './pages';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

@connect(
  ({ navigation }) => ({ page: navigation.page }),
  ({ application }) => ({ bootstrap: application.bootstrap })
)
export class App extends React.Component {
  componentWillMount() {
    this.props.bootstrap();
  }

  render() {
    const { page } = this.props;
    const Page = PAGES[page];

    return (
      <div className="App">
        <Header />
        <Page />
      </div>
    );
  }
}
