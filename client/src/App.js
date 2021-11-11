import { Container } from "react-bootstrap";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { HomeScreen } from "./screens/Home/HomeScreen";

function App() {
    return (
        <>
            <Header />
            <main id="main" class="py-3">
                <Container>
                    <HomeScreen />
                    <h1>this is the main</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
