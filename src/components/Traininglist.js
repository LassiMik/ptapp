import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';

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
    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer.firstname", headerName: "Customer Name" },
        { field: "customer.lastname", headerName: "" }
    ])
    return (
        <> 
            <div
                style={{ height: 600, width: "100%" }}
                className="ag-theme-material"
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
        </>
    )
}
export default Traininglist;