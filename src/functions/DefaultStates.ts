import { AllData, TeamMember } from "@/types/types";

const getDefaultAllData = (): AllData => {
    return {
        teams: [],
        users: [],
        userTeamLinks: [],
        tasks: [],
        taskAssignments: [],
        tags: [],
        taskTags: [],
        notes: []
    }
}

const getDefaultTeamMember = (): TeamMember => {
    return {
        id: 0,
        username: '',
        name: "",
        email: "",
    }
}


export const defaultData = {
    getDefaultAllData,
    getDefaultTeamMember
}