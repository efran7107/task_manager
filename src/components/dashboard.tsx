import { useUser } from './componentsProvider/UserProvider';

export const UserDashboard = () => {
	const { user } = useUser();

	return (
		<>
			<div className='dashboard-header-container'>
				<h3>{user!.username}</h3>
			</div>
		</>
	);
};
