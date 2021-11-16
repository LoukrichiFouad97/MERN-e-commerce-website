import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { HomeScreen } from "./screens/Home/HomeScreen";
import { SigninScreen } from "./screens/Signin/SigninScreen";
import { CartScreen } from "./screens/Cart/CartScreen";
import { ProductDetailScreen } from "./screens/ProductDetail/ProductDetailScreen";

function App() {
    return (
        <>
            <Header />
            <main id="main" className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route
                            path="/cart/:productId"
                            element={<CartScreen />}
                        />
                        <Route path="/signin" element={<SigninScreen />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetailScreen />}
                        />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
