import { useUser } from './componentsProvider/UserProvider';

export const UserDashboard = () => {
	const { user } = useUser();

	return (
		<div className='dashboard-container'>
			<div className='dashboard-header-container'>
				<h3>{user!.username}</h3>
				<a href="" onClick={(e) => {
					e.preventDefault();
					console.log(e);
					
				}}>something</a>
			</div>
		</div>
	);
};
