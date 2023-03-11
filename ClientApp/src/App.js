import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import  Layout  from './components/Layout';
import { Home } from './components/Home';
import { UploadingPage } from './components/UploadingPage';
import { ProcessingItems } from './components/RecentJobs';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import NotFound from './components/NotFoundPage';
import ImageResult from './components/ResultDetail.js';
import HistoryTable  from './components/HistoryTable';
import About from './components/About';
export default class App extends Component {
  static displayName = App.name;
  
  render () {
    return (
        <Layout data-theme="dark">
          <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About}/>
          <AuthorizeRoute path='/items/' component={ProcessingItems}/>
          <AuthorizeRoute path='/upload' component={UploadingPage}/>
          <AuthorizeRoute exact path='/result/:imageId' component={ImageResult}/>
          <AuthorizeRoute path='/history' component={HistoryTable}/>
          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
          <Route component={NotFound}/>
          </Switch> 
        </Layout>
    );
  }
}
