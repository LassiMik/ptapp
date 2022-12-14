import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import Addtraining from "./Addtraining";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from 'date-fns';
import EditTraining from "./EditTraining";

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = React.useState({ activity: "", date: "", duration: "", customerFirstname: "", customerLastname: "" });
    const gridRef = React.useRef();

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then((response) => response.json())
            .then((data) => setTrainings(data));
    }

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(training),
        }).then((response) => {
          if (response.ok) {
            fetchTraining();
          }
        });
      };
    const deleteTraining = (link) => {
        const deletelink = "https://customerrest.herokuapp.com/api/trainings/"+link
        fetch(deletelink, { method: "DELETE" }).then((response) => {
            if (response.ok) {
                fetchTraining();
            }
        });
    };
    const updateTraining = (link) => {
        const updatelink = "https://customerrest.herokuapp.com/api/trainings/"+link
        fetch(updatelink, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateTraining),
        }).then((response) => {
          if (response.ok) {
            fetchTraining();
          }
        });
      };

    const [columnDefs, setColumnDefs] = useState([
        { field: "activity", sortable: true, filter: true },
        { field: "date", valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy hh:mm"), sortable: true, filter: true },
        { field: "duration", sortable: true, filter: true },
        { field: "customer.firstname", headerName: "Customer Name", sortable: true, filter: true },
        { field: "customer.lastname", headerName: "", sortable: true, filter: true },
        {
            headerName: "",
            width: 100,
            field: "id",
            cellRenderer: (params) => (
                <EditTraining updateTraining={updateTraining} params={params} />
            ),
        },
        {
            headerName: "",
            width: 100,
            field: "id",
            cellRenderer: (params) => (

                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
            ),
        }
    ])
    return(
        <div className="ag-theme-material"
        style={{ height: '700px', width: '100%' }}>
        <Addtraining saveTraining={addTraining}/>
        <AgGridReact

            filterable={true}
            sortable={true}
            onGridReady={params => gridRef.current = params.api}
            ref={gridRef}
            rowSelection="single"
            rowData={trainings}
            columnDefs={columnDefs}
            >
                

            </AgGridReact>


    </div>

    );
}
export default Traininglist;