import { useUser } from "../functions/providersContext"

export const Dashboard = () => {
    const {logInState, teamMember} = useUser()
    return (<h1>Fucking something</h1>)
}