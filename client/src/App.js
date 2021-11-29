import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

// Screens
import { HomeScreen } from "./screens/Home/HomeScreen";
import { SigninScreen } from "./screens/Signin/SigninScreen";
import { CartScreen } from "./screens/Cart/CartScreen";
import { ProductDetailScreen } from "./screens/ProductDetail/ProductDetailScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { UserDetails } from "./screens/UserDetails/UserDetails";
import { ShippingScreen } from "./screens/ShippingScreen/ShippingScreen";
import { PaymentScreen } from "./screens/Payment/PaymentScreen";
import { PlaceOrderScreen } from "./screens/PlaceOrder/PlaceOrderScreen";
import { OrderScreen } from "./screens/Order/OrderScreen";
import { UserListScreen } from "./screens/UserList/UserListScreen";

function App() {
    return (
        <>
            <Header />
            <main id="main" className="py-3">
                <Container>
                    <Routes>
                        <Route
                            path="/cart/:productId"
                            element={<CartScreen />}
                        />
                        <Route
                            path="/product/:id"
                            element={<ProductDetailScreen />}
                        />
                        <Route path="/order/:id" element={<OrderScreen />} />
                        <Route path="/signin" element={<SigninScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/profile" element={<UserDetails />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrderScreen />}
                        />
                        <Route
                            path="/admin/userlist"
                            element={<UserListScreen />}
                        />
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
