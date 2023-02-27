import './App.css';
import React, { Component, Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import home from "./components/home";
//import aboutus from "./components/aboutus";
//port contact from "./components/contact";
import clientview from "./components/clientview";
import StaffLogin from "./components/stafflogin";
import StaffView from './components/staffview';
import Register from './components/register';

function App() { 
  const checkAuthenticated = async (req,res) => {
    
    try {
      // const { username } = req.params;
      
      const res = await fetch("/auth/verify/staff", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseRes = await res.json();
      
      if(parseRes === true){
        setIsAuthenticated(true);
        
      }else{
        setIsAuthenticated(false);
        console.log("ok");
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username,setUsername] = useState("");
  useEffect(() => {
    checkAuthenticated();
  }, []);

  
  
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const setUser = character => {
    setUsername(character);
  }



    return (
      <Fragment>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            SMT
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="/ordertracking" className="navbar-brand">
                Order Tracking
              </a> 
            </li>
            <li className="nav-item">
              <a href="/login/staff" className="navbar-brand">
                Staff Login
              </a> 
            </li>
            {/*<li className="nav-item">
              <a href="/contact" className="navbar-brand">
                Contact
              </a> 
             </li>*/}
          </div>
        </nav>
        <div className="container mt-3">
          <Router>
            <Switch>
              <Route exact path="/">  { <Redirect to="/home"/> } </Route>
              <Route exact path={["/home"]} component={home} />
              <Route exact path="/register" component={Register} />
              {/* enable these pages when needed  */}
              {/*<Route exact path="/aboutus" component={aboutus} />
              <Route exact path="/contact" component={contact} />*/}
              <Route path="/ordertracking" component={home} />
              <Route path="/login/staff"  
                render={props =>
                  !isAuthenticated ? (
                    <StaffLogin {...props} setAuth={setAuth}/>
                    ) : (            
                    <Redirect to="/staffview"/>
                  )
                }
              />
              {/* login verify path add here */}
              <Route path="/staffview"
               render={props =>
                isAuthenticated ? (
                 <StaffView {...props} setAuth={setAuth} />
                 ) : (
                 <Redirect to="/login/staff"/>
                )
               }
             />
            </Switch>
          </Router>
        </div>
      </div>
      </Fragment>
    );
  
}

export default App;
