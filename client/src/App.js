import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { HomeScreen } from "./screens/Home/HomeScreen";
import { SigninScreen } from "./screens/Signin/SigninScreen";
import { CartScreen } from "./screens/Cart/CartScreen";
import { ProductDetailScreen } from "./screens/ProductDetail/ProductDetailScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";

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
                        <Route path="/signin" element={<SigninScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
