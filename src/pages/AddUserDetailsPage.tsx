import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import {IJobDetails} from "../types/model.ts";
import {NetworkService} from "../services/NetworkService.ts"; // Assuming you're using react-toastify for notifications

const DefaultJobDetails: IJobDetails = {
    startDate: "",
    endDate: "",
    title: "",
    level: 0,
    stillWorking: false,
    IsDeveloper: false,
    programmingLanguages: [],
}

const AddUserDetailsPage = () => {
    const [userId, setUserId] = useState("");
    const [mobileNumber, setMobileNumber] = useState('');
    const [married, setMarried] = useState(false);
    const [childrenCount, setChildrenCount] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [jobDetails, setJobDetails] = useState<IJobDetails>(DefaultJobDetails);



    const resetForm = () => {
        setUserId("");
        setMobileNumber("");
        setMarried(false);
        setChildrenCount("");
        setNewLanguage("");
        setJobDetails(DefaultJobDetails);
    }

    const handleAddDetails = async () => {
        // Validation check
        if (!userId || !mobileNumber || !childrenCount || !jobDetails.startDate || !jobDetails.endDate || !jobDetails.title || jobDetails.level === 0) {
            toast("Please fill in all required fields.");
            return;
        }

        if (isNaN(parseInt(childrenCount))) {
            toast("Children Count must be a number.");
            return;
        }

        try {
            const response = await NetworkService.AddUserDetails(parseInt(userId), mobileNumber, married, parseInt(childrenCount), jobDetails);
            console.log(response);
            if (response.status === 200) {
                toast("User details added successfully.");
                resetForm();
            }
        } catch (error) {
            // @ts-ignore
            toast("Failed to add user details: " + error.response?.data?.msg || "Unknown error.");
        }
    };

    // @ts-ignore
    const handleJobDetailsChange = (e) => {
        setJobDetails({
            ...jobDetails,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };

    const handleAddLanguage = () => {
        if (newLanguage.trim() !== "") {
            setJobDetails({
                ...jobDetails,
                programmingLanguages: [...jobDetails.programmingLanguages, newLanguage],
            });
            setNewLanguage('');
        }
    };

    // @ts-ignore
    const handleRemoveLanguage = (languageToRemove) => {
        setJobDetails({
            ...jobDetails,
            programmingLanguages: jobDetails.programmingLanguages.filter(lang => lang !== languageToRemove),
        });
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h4">Add User Details</Typography>
                <TextField
                    label="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    fullWidth
                />
                <FormControlLabel
                    control={<Checkbox checked={married} onChange={(e) => setMarried(e.target.checked)} />}
                    label="Married"
                />
                <TextField
                    label="Children Count"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(e.target.value)}
                    fullWidth
                />

                <Box display="flex" justifyContent="space-between" gap={2}>
                    <TextField
                        label="Job Start Date"
                        type="date"
                        required
                        placeholder={""}
                        value={jobDetails.startDate}
                        onChange={handleJobDetailsChange}
                        fullWidth
                        name="startDate"
                    />
                    <TextField
                        label="Job End Date"
                        type="date"
                        required
                        placeholder={""}
                        value={jobDetails.endDate}
                        onChange={handleJobDetailsChange}
                        fullWidth
                        name="endDate"
                    />
                </Box>

                <TextField
                    label="Job Title"
                    value={jobDetails.title}
                    onChange={handleJobDetailsChange}
                    fullWidth
                    name="title"
                />
                <TextField
                    label="Job Level"
                    value={jobDetails.level}
                    onChange={handleJobDetailsChange}
                    fullWidth
                    name="level"
                />
                <FormControlLabel
                    control={<Checkbox checked={jobDetails.stillWorking} onChange={handleJobDetailsChange} name="stillWorking" />}
                    label="Still Working"
                />
                <FormControlLabel
                    control={<Checkbox checked={jobDetails.IsDeveloper} onChange={handleJobDetailsChange} name="IsDeveloper" />}
                    label="Is Developer"
                />
                <Box display="flex" alignItems="center">
                    <TextField
                        label="Add Programming Language"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        fullWidth
                    />
                    <IconButton onClick={handleAddLanguage} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>
                {jobDetails.programmingLanguages.length > 0 && (
                    <Box>
                        <Typography variant="h6">Programming Languages</Typography>
                        <ul>
                            {jobDetails.programmingLanguages.map((language, index) => (
                                <li key={index}>
                                    {language}
                                    <IconButton onClick={() => handleRemoveLanguage(language)} color="error">
                                        <RemoveIcon />
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
                <Button onClick={handleAddDetails} variant="contained" color="primary">Add Details</Button>
            </Box>
        </Container>
    );
};

export default AddUserDetailsPage;
