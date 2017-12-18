import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import UserList from './UserList';
import toastr from 'toastr';
toastr.options.preventDuplicates = true;

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: this.props.users || []
        };
        this.initialState = { users: [] };
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ users: nextProps.users}));
    }

    deleteUser(event) {
        let id = event.target.id;
        toastr.success('User deleted successfuly');
        return this.setState((prevState, props) => {
            return { users: JSON.parse(JSON.stringify(prevState.users)).filter(user => user.id != id) };
        });
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <div>
                    <h1>Users</h1>
                </div>
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8">{<UserList users={users} onDeleteUser={this.deleteUser} />}</div>
                </div>
            </div>
        );
    }
}


User.propTypes = {
    users: PropTypes.array.isRequired
};

User.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
