import React, { Fragment, useContext, useEffect } from 'react';
import UserContext from '../../Context/User/UserContext';
import NewTest from '../../Pages/NewTest';
import DoTest from '../../Pages/DoTest';
import Groups from '../../Pages/Groups';
import Tests from '../../Pages/Tests';
import { Route, Redirect } from 'react-router-dom';

const UserRoutes = ({setIsUserLog}) => {
	const userContext = useContext(UserContext);
    const { isLogged, loginUserToken } = userContext;
    
    useEffect(() => {
        const checkTokenUser = async () => {
            let message = await loginUserToken();
            if(!message){
                setIsUserLog(true);
            }
        }
        checkTokenUser();
    }, [])

    if(!isLogged){
        setIsUserLog(isLogged);
        return <Redirect to="/" />;
    }

    return(
        <Fragment>
            <Route exact path="/groups"
                render={(props) => (
                    <Groups
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
            <Route exact path="/createTest"
                render={(props) => (
                    <NewTest
                        {...props}
                    />
                )}
            />
            <Route exact path="/editTest/:id"
                render={(props) => (
                    <NewTest
                        {...props}
                    />
                )}
            />
            <Route exact path="/showtest/:id"
                render={(props) => (
                    <NewTest
                        {...props}
                    />
                )}
            />
            <Route exact path="/dotest/:id"
                render={(props) => (
                    <DoTest
                        {...props}
                    />
                )}
            />
        </Fragment>
    );
}

export default UserRoutes;