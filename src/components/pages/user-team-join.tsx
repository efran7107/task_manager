import {useState} from "react"
import { UserInput } from "../inputs/formInputs"


export const UserJoinTeam = () => {
  const [joinTeamInput, setJoinTeamInput] = useState({
    teamName: '',
    teamCode: '',
  })
  const {teamName, teamCode } = joinTeamInput
  return (
    <div className='join-team_create-team-cont'>
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
      </form>
      <form className='create-new-team'>

      </form>
    </div>
  )
}
