import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
    const [training, setTraining] = ([
        { activity: 'Spinning', date: 'asd', duration: '60', customer: 'John Johnson' },
        { activity: 'Spinning', date: 'asd', duration: '60', customer: 'John Johnson' }
    ]);
    console.log(training);
    /*
    useEffect(() => {
        fetchTraining();
    }, []);
    */
    /*const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => console.log(data.content.links));
    }*/
    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer" },
    ])
    return (
        <> 
            <div
                style={{ height: 600, width: "100%" }}
                className="ag-theme-material"
            >
                <AgGridReact
                    rowData={training}
                    columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
        </>
    )
}
export default Traininglist;