import {useState} from 'react';
import {TextField, Button, Typography, Container, Box} from '@mui/material';
import {NetworkService} from "../services/NetworkService.ts";
import {toast} from "react-toastify";

const AddUserPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setName("")
        setSurname("")
        setEmail("")
        setPassword("")
    }

    const handleAddUser = async () => {
        await NetworkService.AddUser(
            name, surname, email, password
        ).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast("User created successfully.");
                resetForm()
            }
        }).catch((error) => {
            toast("Failed to add user: " + error.response.data.msg);
            console.log(error)
        })
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h4">Add User</Typography>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                <TextField label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth/>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth/>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth/>
                <Button onClick={handleAddUser} variant="contained" color="primary">Add User</Button>
            </Box>
        </Container>
    );
};

export default AddUserPage;
