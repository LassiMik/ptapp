import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { blue } from '@mui/material/colors';
import Select from 'react-select'
import { LinkSharp } from "@mui/icons-material";
import DatePicker from "react-datepicker";



export default function Addtraining({ addTraining }) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);

    const [selectedcustomer, setSelectedcustomer] = useState([]);
    const [training, setTraining] = React.useState({
        date: '',
        activity: '',
        duration: '',
        customer: '',
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };
    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then((response) => response.json())
            .then((data) => setTrainings(data));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        addTraining(training);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }
    const handleListItemClick = (value) => {
        setSelectedcustomer(value);
    };
    const changecustomer = (event) => {
        //console.log(event.target.value)
        //setTraining({...training, [event.target.name]: event.target.value});
    }

function find(event) {
    //event.preventDefault();
    setSelectedcustomer(event.target.value)
    console.log(selectedcustomer)
    
}
const customeroptions = customers.map(customer => ({ label: customer.firstname + " " + customer.lastname, value: "links.0.href" }));

const trainingoptions = trainings.map(training => ({ label: training.activity, value: training.activity }));

return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add customer
        </Button>
        <Dialog onClose={handleClose} open={open} sx={{ "& .MuiDialog-container": { "& .MuiPaper-root": { width: "100%", maxWidth: "600px", height: "100%", maxHeight: "600px" } } }}>
            <DialogTitle>New training :DDDDD 8=D (☞ﾟヮﾟ)☞</DialogTitle>
            <DialogContent>
                <Select onChange = {(e) => find(e)} options={customeroptions} />
                <Select options={trainingoptions} />
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                <DialogActions>
                    <Button onClick={handleClose}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

    </div >
);
}