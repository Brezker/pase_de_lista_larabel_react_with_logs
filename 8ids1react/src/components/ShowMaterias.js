import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const ShowMaterias = () => {
	const [subjects, setSubjects] = useState([]);
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
					onClick={() => editSubject(rowData)}
				/>
				<Button
					icon="pi pi-times"
					iconPos="right"
					onClick={() => deleteSubject(rowData.id)}
				/>
			</div>
		);
	};

	const editSubject = (row) => {
		navigateTo("ne/" + row.id);
		console.log("Click: " + row.nombre);
	};

	useEffect(() => {
		getAllSubjects();
	}, []);

	const items = [
		{
			label: "Agregar",
			icon: "pi pi-fw pi-file",
			items: [
				{
					label: "Materia",
					icon: "pi pi-user-plus",
					command: (event) => {
						navigateTo("/subject/ne");
					},
				},
			],
		},
		{
			label: "Salir",
			icon: "pi pi-fw pi-power-off",
		},
	];

	const getAllSubjects = async () => {
		await axios
			.get(`${endpoint}/materias`)
			.then((response) => {
				console.log(response.data);
				setSubjects(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteSubject = async (_id) => {
		await axios
			.post(`${endpoint}/materia/borrar`, {
				id: _id,
			})
			.then((response) => {
				getAllSubjects();
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
				<DataTable value={subjects} responsiveLayout="scroll">
					<Column field="id" header="ID"></Column>
					<Column field="nom_materia" header="Nombre"></Column>
					<Column header="Acciones" body={bodyTemplate}></Column>
				</DataTable>
			</div>
		</div>
	);
};

export default ShowMaterias;
