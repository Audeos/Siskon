import {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {NetworkService} from "../services/NetworkService.ts";
import {toast} from "react-toastify";

const LoginPage = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [email, setEmail] = useState('user1@test.com');
    const [password, setPassword] = useState('user1password');

    const handleLogin = async () => {
        await NetworkService.Login(email, password).then((response) => {
            if (response.status === 200) {
                toast("Welcome!");
            }
        }).catch((error) => {
            toast("Failed to login");
            console.log(error)
        })
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h4">Login</Typography>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth/>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth/>
                <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
