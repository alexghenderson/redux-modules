import React from 'react';
import {Provider} from 'react-redux';
import createStore from './store';

import FunctionChild from './FunctionChild';
import Connected from './Connected';

const store = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <FunctionChild/>
          <Connected/>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
