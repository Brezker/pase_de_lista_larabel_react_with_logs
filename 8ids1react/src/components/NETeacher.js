import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NETeacher = () => {
	const endpoint = "http://127.0.0.1:8000/api";
	const { _id } = useParams();
	let navigate = useNavigate();

	function navigateTo(string) {
		navigate(string);
	}

	const guardarDatos = async (e) => {
		e.preventDefault();
		await axios
			.post(`${endpoint}/profesor`, teacher)
			.then((response) => {
				console.log("Guardando...");
				console.log(response.data);
			})
			.catch((error) => {
				//
			});
		navigateTo("/teacher/");
	};

	const footer = (
		<span>
			<Button label="Guardar" onClick={guardarDatos} icon="pi pi-check" />
			<Button
				label="Cancelar"
				icon="pi pi-times"
				className="p-button-secondary ml-2"
			/>
		</span>
	);

	const [teacher, setTeacher] = useState({
		id: 0,
		nom_profesor: "",
		apat_profesor: "",
		amat_profesor: "",
		matricula_profesor: "",
	});

	const getEmpleado = async () => {
		console.log("getEmpleado");

		await axios
			.get(`${endpoint}/profesor`, {
				params: { id: _id },
			})
			.then((response) => {
				setTeacher(response.data);
			});
	};

	useEffect(() => {
		if (_id === undefined) {
			console.log("Sin parametro");
		} else {
			getEmpleado();
		}
	}, []);

	const inputChange = (event) => {
		console.log("handleInputChange");
		console.log(event.target.name);
		console.log(event.target.value);

		setTeacher({
			...teacher,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div align="center">
			<Card
				title="Profesor"
				subTitle="Agrega un nuevo profesor"
				style={{ width: "25em" }}
				footer={footer}
			>
				<span className="p-float-label">
					<InputText
						id="nom_profesor"
						value={teacher.nom_profesor}
						onChange={inputChange}
						name="nom_profesor"
					/>
					<label htmlFor="nom_profesor">Nombre</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="apa"
						value={teacher.apat_profesor}
						onChange={inputChange}
						name="apat_profesor"
					/>
					<label htmlFor="apat_profesor">Apellido paterno</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="amat_profesor"
						value={teacher.amat_profesor}
						onChange={inputChange}
						name="amat_profesor"
					/>
					<label htmlFor="amat_profesor">Apellido materno</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="matricula_profesor"
						value={teacher.matricula_profesor}
						onChange={inputChange}
						name="matricula_profesor"
					/>
					<label htmlFor="matricula_profesor">Matricula</label>
				</span>
				<br></br>
			</Card>
		</div>
	);
};

export default NETeacher;
