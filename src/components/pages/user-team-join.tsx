import {useState} from "react"
import { UserInput } from "../inputs/formInputs"
import '../../styles/join-team-or-create-team.css'
import { useUser } from "../../functions/providersContext"


export const UserJoinTeam = () => {
  const {setPage} = useUser()
  const [joinTeamInput, setJoinTeamInput] = useState({
    teamName: '',
    teamCode: '',
  })
  const [createTeamInput, setCreateTeamInput] = useState({
    newTeamName: '',
    newTeamCode: '',
  })
  const {teamName, teamCode } = joinTeamInput
  const {newTeamName, newTeamCode} = createTeamInput
  return (
    <div className='join-team_create-team-cont'>
      <div className="join-team">
        <h2>Join Team: </h2>
        <form className='join-existing-team'>
          <UserInput 
            label='Join existing team'
            name='join'
            userInputProps={{
              value: teamName,
              onChange: (e) => setJoinTeamInput({...joinTeamInput, teamName: e.currentTarget.value }),
            }}
          />
          <UserInput 
            label='Team code'
            name='code'
            userInputProps={{
              value: teamCode,
              onChange: (e) => setJoinTeamInput({...joinTeamInput, teamCode: e.currentTarget.value }),
            }}
          />
          <input type="submit" value="Join Team" />
        </form>
      </div>
      <h2>...OR</h2>
      <div className="create-team">
        <h2>Create Team: </h2>
        <form className='create-new-team'>
          <UserInput 
              label='Create new team'
              name='create'
              userInputProps={{
                value: newTeamName,
                onChange: (e) => setCreateTeamInput({...createTeamInput, newTeamName: e.currentTarget.value }),
              }}
            />
            <UserInput 
              label='New team code'
              name='code'
              userInputProps={{
                value: newTeamCode,
                onChange: (e) => setCreateTeamInput({...createTeamInput, newTeamCode: e.currentTarget.value }),
              }}
            />
            <input type="submit" value="Create Team" />
        </form>
      </div>
      <input type="button" value="Cancel" className="cancel" onClick={() => {setPage('dashboard')}}/>
    </div>
  )
}
