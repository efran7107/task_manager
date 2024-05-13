import { useUser } from './componentsProvider/UserProvider';
import '../styles/dashboard.css'
import { functions } from '@/functions/functions';
import { UserTeams } from './userTeam';
export const UserDashboard = () => {
	const { user, allData } = useUser();

	const {teams, users, userTeamLinks} = allData
	const userTeams = functions.getTeamMembers(teams, users, userTeamLinks, user.id)



	return (
		<div className='container'>
			<div className='dashboard-header-container'>
				<h3>{user.username}</h3>
				<a className='link-btn add-task'  onClick={(e) => {
					e.preventDefault();
					console.log(e);
				}}> + addTask</a>
			</div>
			<div className="user-dashboard">
				<UserTeams userTeams={userTeams}/>
			</div>
		</div>
	);
};
