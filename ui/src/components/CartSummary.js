import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CartSummary = ({ items }) => {
    const ItemCount = items.length;
    const ItemPrice = items.reduce((x, y) => { return { price: x.price + y.price * (y.quantity || 1) }; }, { price: 0 }).price;
    const Discount = items.reduce((x, y) => { return { discount: x.discount + y.discount * (y.quantity || 1) }; }, { discount: 0 }).discount;
    const TypeDiscount = items.reduce((x, y) => { return { typediscount: y.type == "fiction" ? x.typediscount + y.price * (y.quantity || 1) * .15 : x.typediscount }; }, { typediscount: 0 }).typediscount;
    return (
        <div>
            <h2>Cart Summary</h2>
            <h3>Total</h3>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Items({ItemCount}): </td>
                        <td>{ItemPrice}</td>
                    </tr>
                    <tr>
                        <td>Discount: </td>
                        <td>{Discount}</td>
                    </tr>
                    <tr>
                        <td>Type discount: </td>
                        <td>{TypeDiscount}</td>
                    </tr>
                    <tr>
                        <td>Order total: </td>
                        <td>{ItemPrice - Discount - TypeDiscount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
CartSummary.propTypes = {
    items: PropTypes.array.isRequired
};
export default CartSummary;