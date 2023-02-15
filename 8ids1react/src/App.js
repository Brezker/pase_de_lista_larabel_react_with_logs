//import logo from './logo.svg';
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import ShowAlumnos from "./components/ShowAlumnos";
import NEStudent from "./components/NEStudent";

import ShowProfesores from "./components/ShowProfesores";
import NETeacher from "./components/NETeacher";
import ShowMaterias from "./components/ShowMaterias";
import NESubject from "./components/NESubject";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ShowAlumnos />} />
					<Route path="/student/ne/:_id?" element={<NEStudent />} />
					<Route path="/teacher/" element={<ShowProfesores />} />
					<Route path="/teacher/ne/:_id?" element={<NETeacher />} />
					<Route path="/subject/" element={<ShowMaterias />} />
					<Route path="/subject/ne/:_id?" element={<NESubject />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

//npm audit fix --force
