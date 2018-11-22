import React from 'react';
import {AuthRoute, ProtectedRoute} from '../../util/route_util';
import Browse from '../browse/browse';
import Collection from '../collection/collection';
import Search from '../search/search_container';
import { Switch, Route } from 'react-router-dom';
import Modal from '../playlists/modal';
import Player from '../player/player';

const App = () => {
  return (
    <>
      <Route path="/" component={Player} />
      <Switch>
        <ProtectedRoute path="/browse/" component={Browse}/>
        <ProtectedRoute path="/collection/" component={Collection}/>
        <ProtectedRoute path="/search/" component={Search}/>
      </Switch>
    </>
  )
}

export default App;
