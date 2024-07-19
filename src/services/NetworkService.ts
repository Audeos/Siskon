import {api} from "./api.ts";
import {IJobDetails, IUser} from "../types/model.ts";

export const NetworkService = {
    Login,
    AddUserDetails,
    AddUser,
    EditUserDetails,
    GetUserList
}

async function Login(email: string, password: string) {
    return api.post("/user/login", {
        email,
        password,
    });
}

async function AddUser(name: string, surname: string, email: string, password: string) {
    return api.post("/user/add", {
        name,
        surname,
        email,
        password,
    });
}

async function AddUserDetails(userId: number, mobileNumber: string, married: boolean, childrenCount: number, jobDetails: IJobDetails) {
    return api.post("/userDetails/add", {
        userId,
        mobileNumber,
        married,
        childrenCount,
        jobDetails
    });
}

async function EditUserDetails(user:IUser) {
    return api.put(`/userDetails/${user.userId}`, user);
}

async function GetUserList(){
    return api.get("/userDetails/list");
}
