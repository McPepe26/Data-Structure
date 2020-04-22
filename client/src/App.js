import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import SignIn from './Pages/SignIn';
import NotFound from './Pages/NotFound';
import NavBar from './Components/NavBar';
import Themes from './Pages/Themes';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';
import ThemeState from './Context/Theme/ThemeState';
import UserState from './Context/User/UserState';
import TestState from './Context/Test/TestState';
import { calcPositionFooter } from './Helpers/FooterHelpers';
import GroupState from './Context/Group/GroupState';
import UserRoutes from './Components/Routes/UserRoutes';

function App() {
	const [mainIsActive, setMainIsActive] = useState(true);
	const [isUserLog, setIsUserLog] = useState(true);

	// eslint-disable-next-line
    useEffect(() => {
        calcPositionFooter();
	});

	return (
		<UserState>
			<ThemeState>
				<GroupState>
					<TestState>
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
											setIsUserLog={setIsUserLog}
											{...props}
										/>
									}
								/>
								<Route exact path="/signup"
									render={(props) => (
										<SignUp
											setIsUserLog={setIsUserLog}
											{...props}
										/>
									)}
								/>
								{isUserLog ? 
									<UserRoutes
										setIsUserLog={setIsUserLog}
									/>
									:
									null
								}
								<Route component={NotFound}/>
							</Switch>
							<Footer/>
						</Router>
					</TestState>
				</GroupState>
			</ThemeState>
		</UserState>
	);
}

export default App;
