import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import SignIn from './Pages/SignIn';
import NotFound from './Pages/NotFound';
import NavBar from './Components/NavBar';
import Themes from './Pages/Themes';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';


function App() {
	const [mainIsActive, setMainIsActive] = useState(true);
	const [property, setProperty] = useState('');
	const [userLogged, setUserLogged] = useState(false);

	// eslint-disable-next-line
    useEffect(() => {
        let height = (document.body.clientHeight);
		let heightWindow = window.innerHeight;
		console.log(height, heightWindow, (heightWindow > height));
        if(heightWindow > height)
			setProperty("sticky-footer");
	});

	const signin = () => {
		console.log('login');
		window.location='/themes';
		setUserLogged(true);
	}

	const signInRoutes = () => {
		return (
			<Fragment>
				
			</Fragment>
		);
	}
	
	return (
		<Router>
			<NavBar
				setProperty={setProperty}
				mainIsActive={mainIsActive}
				setMainIsActive={setMainIsActive}
			/>
			<Switch>
				<Route exact path="/">
					<MainPage
						setMainIsActive={setMainIsActive}
					/>
				</Route>
				<Route exact path="/themes">
					<Themes
						setMainIsActive={setMainIsActive}
						setProperty={setProperty}
					/>
				</Route>
				<Route exact path="/signin"
					render={(props) =>
						<SignIn
							{...props}
							setProperty={setProperty}
							signin={signin}
						/>
					}
				/>
				<Route exact path="/signup"
					render={(props) => (
						<SignUp
							{...props}
							setProperty={setProperty}
						/>
					)}
				/>
				<Route component={NotFound}/>
			</Switch>
			<Footer
				property={property}
			/>
		</Router>
	);
}

export default App;
