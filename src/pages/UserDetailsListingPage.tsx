import {useEffect, useState} from 'react';
import {Container, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {NetworkService} from "../services/NetworkService.ts";
import {IUser} from "../types/model.ts";

const UserDetailsListingPage = () => {
    const [userData, setUserData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await NetworkService.GetUserList();
            console.log(response.data)

            setUserData(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    // @ts-ignore
    const handleEditCellChangeCommitted = async ({row}) => {
        try {
            await NetworkService.EditUserDetails(row).then((response)=>{
                console.log(response)
            })
            await fetchUserData();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const columns: GridColDef[] = [
        {field: 'userId', headerName: 'User ID', width: 150, editable: true},
        {field: 'name', headerName: 'Name', width: 150, editable: true},
        {field: 'surname', headerName: 'Surname', width: 150, editable: true},
        {field: 'email', headerName: 'Email', width: 150, editable: true},
        {field: 'mobileNumber', headerName: 'Mobile Number', width: 150, editable: true},
        {field: 'married', headerName: 'Married', width: 100, type: 'boolean', editable: true},
        {field: 'childrenCount', headerName: 'Children Count', width: 150, editable: true},
        {field: 'startDate', headerName: 'Start Date', width: 150, type: 'date', editable: true},
        {field: 'endDate', headerName: 'End Date', width: 150, type: 'date', editable: true},
        {field: 'title', headerName: 'Job Title', width: 150, editable: true},
        {field: 'level', headerName: 'Level', width: 100, editable: true},
        {field: 'stillWorking', headerName: 'Still Working', width: 150, type: 'boolean', editable: true},
        {field: 'IsDeveloper', headerName: 'Is Developer', width: 150, type: 'boolean', editable: true},
        {field: 'programmingLanguages', headerName: 'Programming Languages', width: 200, editable: true},
    ];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>User Details</Typography>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={userData}
                    getRowId={row => row.userId}
                    columns={columns}
                    loading={loading}
                    onCellEditStop={handleEditCellChangeCommitted}
                />
            </div>
        </Container>
    );
};

export default UserDetailsListingPage;
