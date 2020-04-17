import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import SignIn from './Pages/SignIn';
import NotFound from './Pages/NotFound';
import NavBar from './Components/NavBar';
import Themes from './Pages/Themes';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';
import UserState from './Context/User/UserState';
import Gropus from './Pages/Groups';
import Tests from './Pages/Tests';
import ThemeState from './Context/Theme/ThemeState';
import { calcPositionFooter } from './Helpers/FooterHelpers';
import GroupState from './Context/Group/GroupState';

function App() {
	const [mainIsActive, setMainIsActive] = useState(true);

	// eslint-disable-next-line
    useEffect(() => {
        calcPositionFooter();
	});
	return (
		<UserState>
			<ThemeState>
				<GroupState>
					<Router>
						<NavBar
							mainIsActive={mainIsActive}
							setMainIsActive={setMainIsActive}
						/>
						<Switch>
							<Route exact path="/" 
								render={(props) => 
									<MainPage
										{...props}
										setMainIsActive={setMainIsActive}
									/>
								}
							/>
							<Route exact path="/themes" 
								render={(props) => 
									<Themes
										{...props}
										setMainIsActive={setMainIsActive}
									/>
								}
							/>
							<Route exact path="/signin"
								render={(props) =>
									<SignIn
										{...props}
									/>
								}
							/>
							<Route exact path="/signup"
								render={(props) => (
									<SignUp
										{...props}
									/>
								)}
							/>
							<Route exact path="/groups"
								render={(props) => (
									<Gropus
										{...props}
									/>
								)}
							/>
							<Route exact path="/tests"
								render={(props) => (
									<Tests
										{...props}
									/>
								)}
							/>
							<Route component={NotFound}/>
						</Switch>
						<Footer/>
					</Router>
				</GroupState>
			</ThemeState>
		</UserState>
	);
}

export default App;
