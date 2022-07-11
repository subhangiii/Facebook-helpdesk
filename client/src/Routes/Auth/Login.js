import React, { useContext, useState } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { AuthContext } from '../Controllers/authProvider';
import FacebookLogin from 'react-facebook-login';

const accessToken =
  'EAAIQHWBbAnkBACo8ZBLuPLknHFAzZAZA5oocgNsT9duZB5VBXAi2VaVVFEMLQZB5jc7CNseFbSLdIhQMpIAEqM7rpANhH0h7elckiuZAXGOjVfeqBygNJ0SRuSI2NZCZCCWu40ifNAYz7ADz5jQHCgK7E9T5BhURNfloOFZCKzhgt24XGUZBoAD5ZAHPk46mfYT136HOJnsBXvEoH4xqECt5qa0Ps62j74KF05UjCm0T7CUjcjPSeDVm79S';
const userID = '100001668489267';

const Login = ({ history }) => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const responseFacebook = (response) => {
    setLoading(true);
    console.log(response);
    const { accessToken, userID, name, email, picture } = response;
    axios
      .get(
        `https://graph.facebook.com/${userID}/accounts?access_token=${accessToken}`
      )
      .then((pages_response) => {
        const pages = pages_response.data.data;
        console.log(pages);
        const userObj = {
          accessToken,
          userID,
          name,
          email,
          picture,
          pages,
        };
        axios
          .post('http://localhost:5000/api/auth', userObj)
          .then((response) => {
            setCurrentUser(response.data);
            setLoading(false);
            history.push('/');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const componentClicked = () => {
    console.log('clicked');
  };

  return (
    <div className="wrapper ">
      <div className="text-center my-5">
        <img src="/rich.png" alt="logo" height="100px" width="200px"></img>
      </div>
      <div className="row justify-content-center">
        <div className=" col-sm-6">
          <div className="align-items-center card p-3 mx-5">
            <h1 className="display-4 mb-0 mt-3" style={{ fontSize: '35px' }}>
              Facebook Helpdesk
            </h1>
            <hr className="my-2"></hr>
            <p className="lead" style={{ fontSize: '16px' }}>
              Subhangi Ringasia
            </p>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <FacebookLogin
                appId="580668310094457"
                autoLoad={true}
                fields="name,email,picture"
                scope="pages_manage_metadata,pages_manage_engagement,pages_messaging,pages_read_engagement,pages_read_user_content,pages_show_list,pages_manage_cta"
                onClick={componentClicked}
                callback={responseFacebook}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
