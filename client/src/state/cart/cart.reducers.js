import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from "./cart.constants";
/**
 *
 *
 * @export
 * @param {*} [state={ cartItems: [] }]
 * @param {*} action
 * @return {*}
 */
export function cartReducer(
    state = { cartItems: [], shippingAddress: {} },
    action
) {
    switch (action.type) {
        case CART_ADD_ITEM:
            // var state = {
            //     cartItems: [
            //         {
            //             productId: data._id,
            //             name: data.name,
            //             image: data.image,
            //             price: data.price,
            //             countInStock: data.countInStock,
            //             qty: data.qty, //5
            //         },
            //     ],
            // };

            var item = action.payload;
            var existedItem = state.cartItems.find(
                (x) => x.productId === item.productId
            );

            if (existedItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.productId === existedItem.productId ? item : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.productId !== action.payload
                ),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
}
