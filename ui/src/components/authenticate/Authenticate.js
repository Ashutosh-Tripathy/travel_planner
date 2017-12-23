import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as authenticateUserAction from '../../actions/authenticateUserAction';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';
import { setUserInfo, getUser } from '../../actions/localStoreAction'


toastr.options.preventDuplicates = true;

class Authenticate extends React.Component {
    constructor(props, context) {
        super(props, context);
        setUserInfo({});
        this.state = { authenticateUser: { username: '', password: '', saving: false, errors: {} } };
        this.redirectToTripsrPage = this.redirectToTripsrPage.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
        this.updateState = this.updateState.bind(this);
    }


    componentWillReceiveProps(nextProps) {
    }

    redirectToTripsrPage() {
        this.setState({ saving: false });
//        browserHistory.push('/trips');
        this.context.router.push('/trips');
        toastr.success(`Welcome!!! `);
   }


    updateState(event) {
        const field = event.target.name;
        let authenticateUser = Object.assign({}, this.state.authenticateUser);
        authenticateUser[field] = event.target.value;
        return this.setState({ authenticateUser });
    }

    authenticateUser(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.authenticateUser(this.state.authenticateUser)
            .then(this.redirectToTripsrPage())
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    render() {
        const { username, password, saving, errors } = this.state.authenticateUser;
        return (
            <form>
                <div class="container">
                <h1>Please login</h1>
                <div className="col-md-8 col-lg-8 row">
                    <TextInput name="username" label="Username" value={username} onChange={this.updateState}
                        error={errors.title} />


                    <PasswordInput name="password" label="Password" value={password} onChange={this.updateState}
                        defaultOption="Password" error={errors.authorId} />
                    <input
                        type="submit" disabled={saving} value={saving ? 'wait...' : 'Login'}
                        className="btn btn-primary"
                        onClick={this.authenticateUser} />
                </div>
                <div className="row">
                    <br/><br/>
                </div>
                <div className="col-md-8 col-lg-8 row">
                    <a class="text-info" href="#" onclick="alert('Please contact your admin to create account for you.')">Signup</a> &nbsp;&nbsp;
                    <a class="text-info" href="#" onclick="alert('Please contact you admin to reset your password.');">Forgot password?</a>
                </div>
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
        actions: bindActionCreators(authenticateUserAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);


