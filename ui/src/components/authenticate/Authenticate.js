import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as userAction from '../../actions/userAction';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';



toastr.options.preventDuplicates = true;

class Authenticate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {authenticateUser: {username: '', password: '', saving: false, errors: {}} };
        this.redirectToTripsrPage = this.redirectToTripsrPage.bind(this);
	this.authenticateUser = this.authenticateUser.bind(this);
	this.updateState = this.updateState.bind(this);
    }


    componentWillReceiveProps(nextProps) {
    }

    redirectToTripsrPage() {
        browserHistory.push('/trips');
    }


    updateState(event){
        const field = event.target.name;
        let authenticateUser = Object.assign({}, this.state.authenticateUser);
        authenticateUser[field] = event.target.value;
        return this.setState({authenticateUser });
    }

    authenticateUser(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveUser(this.state.authenticateUser)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    render() {
        const { username, password, saving, errors } = this.state.authenticateUser;
        return (
<form>
            <h1>Please login</h1>
            <div className="col-md-6 col-lg-6">
                <TextInput name="username" label="Username" value={username} onChange={this.updateState}
                    error={errors.title} />


                <PasswordInput name="password" label="Password" value={password} onChange={this.updateState}
                    defaultOption="Password" error={errors.authorId} />
                <input
                    type="submit" disabled={saving} value={saving ? 'wait...' : 'Login'}
                    className="btn btn-primary"
                    onClick={this.authenticateUser} />
            </div>
        </form>
        );
    }
}

Authenticate.propTypes = {
    //users: PropTypes.array.isRequired
};

Authenticate.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
	//        users: state.users
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);


