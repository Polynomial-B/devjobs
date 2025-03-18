import Background from "./components/Background";
import Container from "./components/Container";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Background />
			<Header />
			<Container />
			<Toaster position="top-right" />
		</>
	);
}

export default App;
