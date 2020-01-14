import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		username: '',
		password: '',
		redirect: false,
		ErrorAlert: false,
	};

	usernameChange = e => {
		this.setState({ username: e.target.value });
	};

	passwordChange = e => {
		this.setState({ password: e.target.value });
	};

	setRedirect = () => {
		this.setState({
			redirect: true,
		});
	};

	loginSubmitHandle = () => {
		axios
			.post('http://localhost:3001/user/login', { username: this.state.username, password: this.state.password })
			.then(response => {
				this.setState({ redirect: true });
			})
			.catch(err => {
				this.setState({ ErrorAlert: true });
			});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/tasks" />;
		return (
			<form className="w-75" action="#" onSubmit={this.loginSubmitHandle}>
				<h4 className="text-center">Login Form</h4>
				<hr />
				<div class="form-group">
					<label for="exampleInputText">Username</label>
					<input
						type="text"
						class="form-control username"
						id="exampleInputText"
						placeholder="Username"
						onChange={this.usernameChange}
						value={this.state.username}
					/>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword2">Password</label>
					<input
						type="password"
						class="form-control password"
						id="exampleInputPassword2"
						placeholder="Password"
						onChange={this.passwordChange}
						value={this.state.password}
					/>
				</div>
				<div class="form-group form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck2" />
					<label class="form-check-label" for="exampleCheck2">
						Remember me
					</label>
				</div>
				<div className="form-group">
					<label>
						<a href="#" onClick={this.props.func}>
							Not registered yet?
						</a>
					</label>
				</div>
				<button class="btn btn-primary w-100">Submit</button>
				{this.state.ErrorAlert ? <ErrorAlert msg={<span><strong>Error!</strong> Username or password are not correct!</span>}/> : null}
			</form>
		);
	}
}