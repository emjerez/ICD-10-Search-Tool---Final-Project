import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CognitoState,
  Logout,
  Login,
  NewPasswordRequired,
  EmailVerification,
  Confirm,
} from 'react-cognito';
import LogoutButton from './LogoutButton';
import LoginForm from './LoginForm';
import EmailVerificationForm from './EmailVerificationForm';
import NewPasswordRequiredForm from './NewPasswordRequiredForm';
import ConfirmForm from './ConfirmForm';

const loggedInPage = (user, attributes) => (
  <div>
    <p>logged in as {user.getUsername()}</p>
    <ul>
      <li>
        <Logout>
          <LogoutButton />
        </Logout>
      </li>
      <li><Link to="/change_password">Change password</Link></li>
      <li><Link to="/change_email">Change email address</Link></li>
    </ul>
    <div>
      <p>Attributes</p>
      <div>
          {Object.keys(attributes).map(name =>
            <p key={name}>
              <span>{name}</span><span>{attributes[name]}</span>
            </p>
          )}
      </div>
    </div>
  </div>
);

const loggedOutPage = () => (
  <div className="here">
    <p>not logged in</p>
    <Login>
      <LoginForm />
    </Login>
    <ul>
      <li><Link to="/register" className="btn btn-primary">Register</Link></li>
      <li><Link to="/reset" className="btn btn-default">Password reset</Link></li>
    </ul>
  </div>
);

const newPasswordPage = () => (
  <div className="here">
    <p>New password required, since this is your first login</p>
    <NewPasswordRequired>
      <NewPasswordRequiredForm />
    </NewPasswordRequired>
  </div>
);

const emailVerificationPage = () => (
  <div className="here">
    <p>You must verify your email address.  Please check your email for a code</p>
    <EmailVerification>
      <EmailVerificationForm />
    </EmailVerification>
  </div>
);

const confirmForm = () => (
  <div className="here">
    <p>A confirmation code has been sent to your email address</p>
    <Confirm>
      <ConfirmForm />
    </Confirm>
    <Link to="/">Home</Link>
  </div>
);

const mfaPage = () => (
  <div>
    <p>You need to enter an MFA, but this library does not yet support them.</p>
  </div>
);

const BaseDashboard = ({ state, user, attributes }) => {
  switch (state) {
    case CognitoState.LOGGED_IN:
      return loggedInPage(user, attributes);
    case CognitoState.AUTHENTICATED:
    case CognitoState.LOGGING_IN:
      return (
        <div>
          <img src="ajax-loader.gif" alt="" />
        </div>
        )
    case CognitoState.LOGGED_OUT:
    case CognitoState.LOGIN_FAILURE:
      return loggedOutPage();
    case CognitoState.MFA_REQUIRED:
      return mfaPage();
    case CognitoState.NEW_PASSWORD_REQUIRED:
      return newPasswordPage();
    case CognitoState.EMAIL_VERIFICATION_REQUIRED:
      return emailVerificationPage();
      // return mfaPage();
    case CognitoState.CONFIRMATION_REQUIRED:
      return confirmForm();
    default:
      return (
        <div>
          <p>Unrecognised cognito state</p>
        </div>
      );
  }
};
BaseDashboard.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};

const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});


const Dashboard = connect(mapStateToProps, null)(BaseDashboard);

export default Dashboard;
