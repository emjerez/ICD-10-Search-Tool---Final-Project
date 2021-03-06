import React from 'react';
import PropTypes from 'prop-types';
import { changePassword } from 'react-cognito';

class ChangePasswordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  onSubmit = (event) => {
    const { store } = this.context;
    const state = store.getState();
    const user = state.cognito.user;
    event.preventDefault();
    changePassword(user, this.state.oldPassword, this.state.newPassword).then(
      () => this.setState({ error: 'Password changed' }),
      error => this.setState({ error }));
  }

  changeOldPassword = (event) => {
    this.setState({ oldPassword: event.target.value });
  }

  changeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  }

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
      <label>
        Old Password
        <input className="form-control" placeholder="old password" onChange={this.changeOldPassword} required />
      </label>
      </div>
      <div className="form-group">
      <label>
        New Password
        <input className="form-control" placeholder="new password" onChange={this.changeNewPassword} required />
      </label>
      </div>
      <button className="btn btn-primary" type="submit">Set new password</button>
    </form>
  )
}
ChangePasswordForm.contextTypes = {
  store: PropTypes.object,
};

export default ChangePasswordForm;
