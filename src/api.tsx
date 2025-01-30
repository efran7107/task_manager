import {TTeamMember, TUserAuth } from "./types/globalTypes"

const local = 'http://localhost:3000/'

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
        .then(res => res.json())
}

export const apiOptions = {
    getRequests
}