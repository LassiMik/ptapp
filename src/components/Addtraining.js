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



export default function Addtraining({ addTraining }) {
    const [open, setOpen] = React.useState(false);
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
    const customeroptions = customers.map(customer => ({label: customer.firstname + " " + customer.lastname}));

    const trainingoptions = trainings.map(training => ({label: training.activity}));

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>New training :DDDDD 8=D (☞ﾟヮﾟ)☞</DialogTitle>
                <DialogContent>
                        <Select options={customeroptions} />
                        <Select options={trainingoptions} />
                    <DialogActions>
                        <Button onClick={handleClose}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            
        </div >
    );
}