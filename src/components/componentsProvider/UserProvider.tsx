/* eslint-disable react-refresh/only-export-components */
import { GetRequests, PostRequests } from '@/api/api';
import { functions } from '@/functions/functions';
import { AllData, LogInStatus, TeamMember } from '@/types/types';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import toast from 'react-hot-toast';

const defaultAllData: AllData = {
	teams: [],
	users: [],
	userTeamLinks: [],
	tasks: [],
	taskAssignments: [],
	tags: [],
	taskTags: [],
	notes: []
}

type TUserProvider = {
	user: TeamMember | undefined;
	isLoggedIn: LogInStatus;
	allData: AllData;
	isLoading: boolean;
	createUser: (user: Omit<TeamMember, 'id'>, password: string) => void;
	userAuth: (username: string, password: string) => void;
	isExistingUser: (username: string) => boolean;
};

const UserContext = createContext<TUserProvider>({} as TUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<TeamMember>();
	const [allData, setAllData] = useState<AllData>(defaultAllData);
	const [isLoggedIn, setIsLoggedIn] = useState<LogInStatus>('undefined');
	const [isLoading, setIsLoading] = useState(true);

	const fetchallData = () => {
		functions.getAllData().then((data) => {
			setAllData(data);
			setIsLoading(false);
		});
	};

	const userAuth = (username: string, password: string) => {
		if (username === '' || password === '') {
			toast.error('Please enter a username and/or password');
			return;
		} else if (
			allData!.users.filter((user) => user.username === username && user)
				.length === 0
		) {
			toast.error('User not found');
			return;
		}
		GetRequests.getUserPassword(
			allData!.users.filter((user) =>
				user.username === username ? user : null
			)[0].id
		).then((passwordAuth) => {
			if (passwordAuth.password !== password) {
				toast.error('Wrong password');
				return;
			}
			toast.success('Login successful');
			setUser(
				allData!.users.filter((user) =>
					user.username === username ? user : null
				)[0]
			);
			setIsLoggedIn('logged in')
			localStorage.setItem("user", allData!.users.filter((user) =>
				user.username === username ? user : null
			)[0].username)
			functions.getHeaderContainer();
			
		});
	};

	const isExistingUser = (username: string): boolean => {
		return (
			allData!.users.filter((user) => user.username === username && user)
				.length > 0
		);
	};

	const createUser = (teamMember: Omit<TeamMember, 'id'>, password: string) => {
		PostRequests.registerUser(teamMember).then((user) => {
			PostRequests.registerUserAuth({teamMemberId: user.id, password: password})
			.then((res) => {
				if(!res.ok){
					toast.error('Error creating user');
					return;
				}
			})
			setUser(user);
			localStorage.setItem('user', user.username)
			setIsLoggedIn('logged in');
			functions.getHeaderContainer();
		}).catch(() => toast.error('Error creating user'))
		fetchallData();
	};

	useEffect(() => {
		if(localStorage.length > 0){
			const userName = localStorage.getItem('user');
			GetRequests.getUserByUsername(userName!)
				.then((users) => {
					const user = users[0];
					setUser(user)
					functions.getHeaderContainer();
				})
			fetchallData()
			setIsLoggedIn('logged in')
			return
		}
		setIsLoggedIn('not logged in')
		fetchallData();
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				isLoggedIn,
				allData,
				isLoading,
				createUser,
				userAuth,
				isExistingUser
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
