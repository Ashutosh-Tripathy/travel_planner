import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import UserList from './UserList';
import UserForm from './UserForm';
import toastr from 'toastr';

class ManageUser extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, this.props.user),
        };
        this.updateUserState = this.updateUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.id != nextProps.user.id) {
            this.setState({ user: Object.assign({}, nextProps.user) });
        }
    }

    updateUserState(event) {
        const field = event.target.name;
        let user = Object.assign({}, this.state.user);
        user[field] = event.target.value;
        return this.setState({ user: user });
    }

    saveUser(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveUser(this.state.user)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        this.context.router.push('/users');
    }

    render() {
        return (
            <UserForm user={this.state.user}
                onChange={this.updateUserState} onSave={this.saveUser} errors={this.state.errors}
                saving={this.state.saving} errors={this.state.errors || {}} />
        ); this.setState({ saving: false });
    }
}

ManageUser.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function getUserById(users, id) {
    const user = users.filter(user => user.id == id);
    if (user.length) return user[0];
    return null;

}
ManageUser.contextTypes = {
    router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
    const userId = ownProps.params.id;
    let user = { id: '', name: '', password: '', role: '' };
    if (userId && state.users.length) {
        user = getUserById(state.users, userId) || user;
    }

    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
