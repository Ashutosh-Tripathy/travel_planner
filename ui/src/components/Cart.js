import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import ItemList from './ItemList';
import CartSummary from './CartSummary';
import toastr from 'toastr';
toastr.options.preventDuplicates = true;

class Cart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: this.props.items.slice()
        };
        this.initialState = { items: [] };
        this.updateItemQuantity = this.updateItemQuantity.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ items: nextProps.items.slice() }));
        if (this.initialState.items.length === 0) {
            this.initialState.items = JSON.parse(JSON.stringify(nextProps.items));
        }
    }

    resetState(event) {
        this.setState(() => ({ items: this.initialState.items.slice() }));
    }

    updateItemQuantity(event) {
        let { id, name, value } = event.target;
        if (value > 1000 || value.length > 3) {
            toastr.warning("Reached maximum value/length");
            return;
        }
        return this.setState((prevState, props) => {
            let items = JSON.parse(JSON.stringify(prevState.items));
            items.map((item) => {
                if (item.id == id) {
                    if (item[name] == value) return;
                    item[name] = value;
                }
            });
            toastr.success('Quantity updated');
            return { items: items };
        });
    }

    deleteItem(event) {
        let id = event.target.id;
        toastr.success('Item deleted');
        return this.setState((prevState, props) => {
            return { items: JSON.parse(JSON.stringify(prevState.items)).filter(item => item.id != id) };
        });
    }

    render() {
        const { items } = this.state;
        return (
            <div>
                <div>
                    <h1>Cart</h1>
                    <input type="button" value="reset" className="btn btn-warning" onClick={this.resetState} />
                </div>
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8">{<ItemList items={items} onQuantityChange={this.updateItemQuantity} onDeleteItem={this.deleteItem} />}</div>
                    <div className="col-sm-4 col-md-4 col-lg-4">{<CartSummary items={items} />}</div>
                </div>
            </div>
        );
    }
}


Cart.propTypes = {
    items: PropTypes.array.isRequired
};

Cart.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        items: state.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
