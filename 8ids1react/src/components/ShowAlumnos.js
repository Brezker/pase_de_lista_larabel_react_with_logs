import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const ShowAlumnos = () => {
	const [students, setStudents] = useState([]);
	const endpoint = "http://127.0.0.1:8000/api";

	let navigate = useNavigate();

	function navigateTo(string) {
		navigate(string);
	}

	const bodyTemplate = (rowData) => {
		return (
			<div>
				<Button
					icon="pi pi-file-edit"
					iconPos="right"
					onClick={() => editStudent(rowData)}
				/>
				<Button
					icon="pi pi-times"
					iconPos="right"
					onClick={() => deleteStudent(rowData.id)}
				/>
			</div>
		);
	};

	const editStudent = (row) => {
		navigateTo("student/ne/" + row.id);
		console.log("Click: " + row.nom_alumno);
	};

	useEffect(() => {
		getAllStudents();
	}, []);

	const items = [
		{
			label: "Agregar",
			icon: "pi pi-fw pi-file",
			items: [
				{
					label: "Alumno",
					icon: "pi pi-user-plus",
					command: (event) => {
						navigateTo("/student/ne");
					},
				},
			],
		},
		{
			label: "Salir",
			icon: "pi pi-fw pi-power-off",
		},
	];

	const getAllStudents = async () => {
		await axios
			.get(`${endpoint}/alumnos`)
			.then((response) => {
				console.log(response.data);
				setStudents(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteStudent = async (_id) => {
		await axios
			.post(`${endpoint}/alumno/borrar`, {
				id: _id,
			})
			.then((response) => {
				getAllStudents();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div>
			<div>
				<Menubar model={items} />
			</div>
			<div className="card">
				<DataTable value={students} responsiveLayout="scroll">
					<Column field="id" header="ID"></Column>
					<Column field="nom_alumno" header="Nombre"></Column>
					<Column field="apat_alumno" header="Apellido Paterno"></Column>
					<Column field="amat_alumno" header="Apellido Materno"></Column>
					<Column field="matricula_alumno" header="Matrícula"></Column>
					<Column header="Acciones" body={bodyTemplate}></Column>
				</DataTable>
			</div>
		</div>
	);
};

export default ShowAlumnos;
