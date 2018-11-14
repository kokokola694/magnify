import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Splash from './splash';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Splash />
      </HashRouter>
    </Provider>

  );
}

export default Root;
