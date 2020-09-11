import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop-page/shop-page';
import Header from './components/header/header';
import AccountPage from './pages/account-page/account-page';
import CheckOutPage from './pages/check-out/check-out';

import { selectCurrentUser } from './redux/user/user-selectors';
import { checkUserSession } from '../src/redux/user/user-action';

const App = ({ checkUserSession, currentUser })=> {
  // componentDidMount(){
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  //把componentDidMount 改為用useEffect寫的東西, 在最後的array裡面pass checkUserSession是為了讓useEffect只會在checkUserSession發生編號的時候fire，
  useEffect(()=> {
    checkUserSession();
  }, [checkUserSession])


    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component= {HomePage} />
          <Route  path='/shop' component= {ShopPage} />
          {/* 這裡不能放exact path */}
          <Route exact path='/checkout' component= {CheckOutPage} />
          <Route exact path='/signin' render={
            ()=> currentUser ? (<Redirect to='/' /> ):(<AccountPage />)
          }/>
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=> dispatch(checkUserSession())
});

export default connect (mapStateToProps, mapDispatchToProps)(App);
