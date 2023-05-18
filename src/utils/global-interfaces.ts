export type todo={
    key: number,
    name: string,
    doneState: boolean,
    dateCreated:string,
    // dateCreated:currDate(),
    hasDeadline:boolean,
    deadline:string
}

export type actionType = {
    index:number,
    key:number,
    data:string,
    hasDeadline:boolean,
    deadline:string,
    type: string
}