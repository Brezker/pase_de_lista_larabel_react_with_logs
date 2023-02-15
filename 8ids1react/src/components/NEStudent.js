import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NEStudent = () => {
	const endpoint = "http://127.0.0.1:8000/api";
	const { _id } = useParams();
	let navigate = useNavigate();

	function navigateTo(string) {
		navigate(string);
	}

	const guardarDatos = async (e) => {
		e.preventDefault();
		await axios
			.post(`${endpoint}/alumno`, student)
			.then((response) => {
				console.log("Guardando...");
				console.log(response.data);
			})
			.catch((error) => {
				//
			});
		navigateTo("/");
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

	const [student, setStudent] = useState({
		id: 0,
		nom_alumno: "",
		apat_alumno: "",
		amat_alumno: "",
		matricula_alumno: "",
	});

	const getEmpleado = async () => {
		console.log("getEmpleado");

		await axios
			.get(`${endpoint}/alumno`, {
				params: { id: _id },
			})
			.then((response) => {
				setStudent(response.data);
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

		setStudent({
			...student,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div align="center">
			<Card
				title="Alumno"
				subTitle="Agrega un nuevo alumno"
				style={{ width: "25em" }}
				footer={footer}
			>
				<span className="p-float-label">
					<InputText
						id="nom_alumno"
						value={student.nom_alumno}
						onChange={inputChange}
						name="nom_alumno"
					/>
					<label htmlFor="nom_alumno">Nombre</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="apat_alumno"
						value={student.apat_alumno}
						onChange={inputChange}
						name="apat_alumno"
					/>
					<label htmlFor="apat_alumno">Apellido paterno</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="amat_alumno"
						value={student.amat_alumno}
						onChange={inputChange}
						name="amat_alumno"
					/>
					<label htmlFor="amat_alumno">Apellido materno</label>
				</span>
				<br></br>
				<span className="p-float-label">
					<InputText
						id="matricula_alumno"
						value={student.matricula_alumno}
						onChange={inputChange}
						name="matricula_alumno"
					/>
					<label htmlFor="matricula_alumno">Matricula</label>
				</span>
				<br></br>
			</Card>
		</div>
	);
};

export default NEStudent;
