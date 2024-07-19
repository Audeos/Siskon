export type IJobDetails = {
    startDate:string,
    endDate: string|null,
    title:string,
    level:number,
    stillWorking:boolean,
    IsDeveloper:boolean,
    programmingLanguages:string[]
}

export type IUser = {
    userId:string,
    name:string,
    surname:string,
    email:string,
    mobileNumber:string,
    married:boolean,
    childrenCount:number,
    jobDetails:IJobDetails
}
