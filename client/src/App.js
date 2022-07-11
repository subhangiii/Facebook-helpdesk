import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Routes/Controllers/authProvider";
import Login from "./Routes/Auth/Login";
import { useState } from "react";
import Home from "./Home";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <div className='App'>
      {/* <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        <Router>
          <Route exact path='/login' component={Login} />
          <div className='row'>
            <div
              className='col-1 nopadding'
              style={{ background: "#255190", color: "white" }}
            >
              {currentUser && <Navbar />}
            </div>
            <div className='col-11 nopadding'>
              <PrivateRoute exact path='/' component={Main} />
            </div>
          </div>          
        </Router>
      </AuthContext.Provider> */}

      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        <Router>
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/' component={Home} />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
