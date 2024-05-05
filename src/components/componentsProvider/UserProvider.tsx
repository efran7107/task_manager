import { Requests } from '@/api/api';
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
		Requests.getUserPassword(
			allData!.users.filter((user) =>
				user.username === username ? user : null
			)[0].id
		).then((passwordAuth) => {
			if (passwordAuth.password !== password) {
				toast.error('Wrong password');
				return;
			}
			toast.success('Login successful');
			console.log(allData);
			setUser(
				allData!.users.filter((user) =>
					user.username === username ? user : null
				)[0]
			);
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

	const createUser = () => {};

	useEffect(() => {
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
