import { GetRequests, PostRequests } from '@/api/api';
import { functions } from '@/functions/functions';
import { AllData, TeamMember } from '@/types/types';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import toast from 'react-hot-toast';

type TUserProvider = {
	user: TeamMember | undefined;
	isLoggedIn: boolean;
	allData: AllData | undefined;
	isLoading: boolean;
	createUser: (user: Omit<TeamMember, 'id'>, password: string) => void;
	userAuth: (username: string, password: string) => void;
	isExistingUser: (username: string) => boolean;
};

const UserContext = createContext<TUserProvider>({} as TUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<TeamMember>();
	const [allData, setAllData] = useState<AllData>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchallData = () => {
		setIsLoading(true);
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
			localStorage.setItem("user", allData!.users.filter((user) =>
				user.username === username ? user : null
			)[0].username)
			functions.getHeaderContainer();
			setIsLoggedIn(true);
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
			setIsLoggedIn(true);
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
					setIsLoggedIn(true)
					functions.getHeaderContainer();
				})
			fetchallData()
			return
		}
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
