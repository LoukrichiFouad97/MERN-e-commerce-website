import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { ProductDetailScreen } from "./screens/ProductDetail/ProductDetailScreen";

function App() {
    return (
        <>
            <Header />
            <main id="main" class="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetailScreen />}
                            exact
                        />
                    </Routes>
                    <h1>this is the main</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
