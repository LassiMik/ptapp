import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation'
import Traininglist from './Traininglist'

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname" },
        { field: "lastname" },
        { field: "email" },
        { field: "phone" },
        { field: "streetaddress" },
        { field: "postcode" },
        { field: "city" },
    ])
    return (
        <> 
            <div
                style={{ height: 600, width: "100%" }}
                className="ag-theme-material"
            >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    paginationPageSize={10}
                    pagination={true}
                >
                </AgGridReact>
            </div>
        </>
    );
}
export default Customerlist;