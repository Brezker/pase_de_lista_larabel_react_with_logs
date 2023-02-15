import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const ShowProfesores = () => {
	const [teachers, setTeachers] = useState([]);
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
					onClick={() => editTeacher(rowData)}
				/>
				<Button
					icon="pi pi-times"
					iconPos="right"
					onClick={() => deleteTeacher(rowData.id)}
				/>
			</div>
		);
	};

	const editTeacher = (row) => {
		navigateTo("ne/" + row.id);
		console.log("Click: " + row.nom_profesor);
	};

	useEffect(() => {
		getAllTeachers();
	}, []);

	const items = [
		{
			label: "Agregar",
			icon: "pi pi-fw pi-file",
			items: [
				{
					label: "Profesor",
					icon: "pi pi-user-plus",
					command: (event) => {
						navigateTo("/teacher/ne");
					},
				},
			],
		},
		{
			label: "Salir",
			icon: "pi pi-fw pi-power-off",
		},
	];

	const getAllTeachers = async () => {
		await axios
			.get(`${endpoint}/profesores`)
			.then((response) => {
				console.log(response.data);
				setTeachers(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteTeacher = async (_id) => {
		await axios
			.post(`${endpoint}/profesor/borrar`, {
				id: _id,
			})
			.then((response) => {
				getAllTeachers();
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
				<DataTable value={teachers} responsiveLayout="scroll">
					<Column field="id" header="ID"></Column>
					<Column field="nom_profesor" header="Nombre"></Column>
					<Column field="apat_profesor" header="Apellido Paterrno"></Column>
					<Column field="amat_profesor" header="Apellido Materno"></Column>
					<Column field="matricula_profesor" header="Matrícula"></Column>
					<Column header="Acciones" body={bodyTemplate}></Column>
				</DataTable>
			</div>
		</div>
	);
};

export default ShowProfesores;
