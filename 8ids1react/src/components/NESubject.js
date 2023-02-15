import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NESubject = () => {
	const endpoint = "http://127.0.0.1:8000/api";
	const { _id } = useParams();
	let navigate = useNavigate();

	function navigateTo(string) {
		navigate(string);
	}

	const guardarDatos = async (e) => {
		e.preventDefault();
		await axios
			.post(`${endpoint}/materia`, subject)
			.then((response) => {
				console.log("Guardando...");
				console.log(response.data);
			})
			.catch((error) => {
				//
			});
		navigateTo("/subject/");
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

	const [subject, setSubject] = useState({
		id: 0,
		nom_materia: "",
	});

	const getEmpleado = async () => {
		console.log("getEmpleado");

		await axios
			.get(`${endpoint}/materia`, {
				params: { id: _id },
			})
			.then((response) => {
				setSubject(response.data);
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

		setSubject({
			...subject,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div align="center">
			<Card
				title="Materia"
				subTitle="Agrega un nueva materia"
				style={{ width: "25em" }}
				footer={footer}
			>
				<span className="p-float-label">
					<InputText
						id="nom_materia"
						value={subject.nom_materia}
						onChange={inputChange}
						name="nom_materia"
					/>
					<label htmlFor="nom_materia">Nombre</label>
				</span>
				<br></br>
			</Card>
		</div>
	);
};

export default NESubject;
