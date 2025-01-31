import { TTeamMember, TUserAuth } from "./types/globalTypes"

const local = 'http://localhost:3000/'
const header = {"Content-type" : 'application/json'};
const request = {
    method: '',
    headers: header,
    body: {},
}

const getRequests = {
    getUser: (username: string):Promise<TTeamMember> => 
        fetch(`${local}teamMembers?username=${username}`)
        .then(res => res.json())
        .then(res => res[0]),
    getUserAuth:(userId: number):Promise<TUserAuth> =>
        fetch(`${local}userAuths?userId=${userId}`)
        .then(res => res.json())
        .then(res => res[0]),
    getDataInfo:(cat: string) => 
        fetch(`${local}${cat}`)
        .then(res => res.json()),
    getSingleData: (cat:string, key: string, value: string) =>
        fetch( `${local}${cat}?${key}=${value}`)
        .then(res => res.json())
}

const postRequests = {
    addData: (cat: string, data: object) => {
        const raw = JSON.stringify(data)
        return fetch(
            `${local}${cat}`,
            {...request, method: 'POST', body: raw}
        )
            .then(res => res.json())
    }
}

export const apiOptions = {
    getRequests,
    postRequests
}