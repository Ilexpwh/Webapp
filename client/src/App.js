import React, { Fragment, useEffect, useState } from "react";
import './App.css';
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import LoginStaff from "./components/LoginStaff";
import LoginClient from "./components/LoginClient";
import Test from "./components/Test";
import Staff from "./components/Staff";
import Client from "./components/Client";
import HtmlConvertTest from "./components/HtmlConvertTest";
import Search from "./components/Search";
import Add from "./components/Add";
import MenuBar from "./components/MenuBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
function App() {
  
  const checkAuthenticated = async (req,res) => {
    
    try {
      // const { username } = req.params;
      
      const res1 = await fetch("/auth/verify/client", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseRes1 = await res1.json();
      
      if(parseRes1 === true){
        setIsAuthenticated1(true);
        
      }else{
        setIsAuthenticated1(false);
        console.log("ok");
      }
      
      const res2 = await fetch("/auth/verify/staff", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseRes2 = await res2.json();
      parseRes2 === true ? setIsAuthenticated2(true) : setIsAuthenticated2(false);
      
    } catch (err) {
      console.error(err.message);
    }
  };
  const [isAuthenticated1, setIsAuthenticated1] = useState(false);
  const [isAuthenticated2, setIsAuthenticated2] = useState(false);
  const [username,setUsername] = useState("");
  useEffect(() => {
    checkAuthenticated();
  }, []);

  
  
  const setAuth1 = boolean => {
    setIsAuthenticated1(boolean);
  };

  const setAuth2 = boolean => {
    setIsAuthenticated2(boolean);
  };
  
  const setUser = character => {
    setUsername(character);
  }

  return( 
  <Fragment>
    {/* <MenuBar/> */}
    <Router>
    <div className="container">
    <Switch>
    <Route
        exact
        path="/"
        render={props =>
          !(isAuthenticated1||isAuthenticated2)? (
            <Test {...props}/>
          ) : (
            <Redirect to="/test"/>
          )
        } 
      /> 
      {/* <Route
        exact
        path="/inputtodo"
        render={props =>
          isAuthenticated ? (
            <InputTodo {...props} setAuth={setAuth}/>
          ) : (
            <Redirect to="/"/>
          )
        }
      /> */}

      {/* <Route
        exact
        path="/listtodos"
        render={props =>
          isAuthenticated ? (
            <ListTodos {...props} setAuth={setAuth}/>
          ) : (
            <Redirect to="/client"/>
          )
        }
      /> */}
    
      <Route
        exact
        path="/login/staff"
        render={props =>
          !isAuthenticated2 ? (
            <LoginStaff {...props} setAuth2={setAuth2}/>
          ) : (            
            <Redirect to="/staff"/>
          )
        }
      />
      <Route
        exact
        path="/test"
        component = {Test}
      />
      <Route
        exact
        path="/login/client"
        render={props =>
          !isAuthenticated1 ? (
            <LoginClient {...props} setAuth1={setAuth1}/>
          ) : (            
            <Redirect to="/client"/>
          )
        }
      />

      <Route
        exact
        path="/staff"
        render={props =>
          isAuthenticated2 ? (
            <Staff {...props} setAuth2={setAuth2} />
          ) : (
            <Redirect to="/login/staff"/>
          )
        }
      />

      {/* <Route
        exact
        path="/staff/add"
        render={props =>
          isAuthenticated2 ? (
            <Add {...props} setAuth2={setAuth2}/>
          ) : (
            <Redirect to="/login/staff"/>
          )
        }
      />
      <Route
        exact
        path="/staff/search"
        render={props =>
          isAuthenticated2 ? (
            <Search {...props} setAuth2={setAuth2}/>
          ) : (
            <Redirect to="/login/staff"/>
          )
        }
      /> */}
      <Route
        exact
        path="/client"
        render={props =>
          isAuthenticated1 ? (
            <Client {...props} setAuth1={setAuth1} />
          ) : (
            <Redirect to="/login/client"/>
          )
        }
      />
    </Switch>
  </div>
    </Router>
  </Fragment>
  );

}

export default App;