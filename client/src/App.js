import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import SignIn from './Pages/SignIn';
import NotFound from './Pages/NotFound';
import NavBar from './Components/NavBar';
import Themes from './Pages/Themes';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';

function App() {
	
	return (
		<Router>
			<NavBar/>
			<Switch>
				<Route exact path="/" component={MainPage}/>
				<Route exact path="/signin" component={SignIn}/>
				<Route exact path="/signup" component={SignUp}/>
				<Route exact path="/themes" component={Themes}/>
				<Route component={NotFound}/>
			</Switch>
			<Footer/>
		</Router>
	);
}

export default App;
