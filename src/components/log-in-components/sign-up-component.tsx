import { SignUpInput } from "../../types/logInProviderTypes"
import { UserInput } from "../inputs/userInput";


export const UserSignUp = ({
    signUp,
    setSignUp
}: {
    signUp: SignUpInput,
    setSignUp: (signUp: SignUpInput) => void
}) => {
    const {username, firstName, lastName, email, password, confirm} = signUp;
    return(
        <div className="sign-up-info">
            <UserInput 
                id="username"
                label="Username"
                userInput={{
                    type: "text",
                    id: "newUsername",
                    onChange: (e) => setSignUp({...signUp, username: e.currentTarget.value}),
                    value: username
                }}
            />
            <UserInput 
                id="firstName"
                label="First Name"
                userInput={{
                    type: "text",
                    id: "firstName",
                    onChange: (e) => setSignUp({...signUp, firstName: e.currentTarget.value}),
                    value: firstName
                }}
            />
            <UserInput 
                id="lastName"
                label="Last Name"
                userInput={{
                    type: "text",
                    id: "lastName",
                    onChange: (e) => setSignUp({...signUp, lastName: e.currentTarget.value}),
                    value: lastName
                }}
            />
            <UserInput 
                id="email"
                label="Email"
                userInput={{
                    type: "text",
                    id: "email",
                    onChange: (e) => setSignUp({...signUp, email: e.currentTarget.value}),
                    value: email
                }}
            />
            <UserInput 
                id="password"
                label="Password"
                userInput={{
                    type: "password",
                    id: "newPassword",
                    onChange: (e) => setSignUp({...signUp, password: e.currentTarget.value}),
                    value: password
                }}
            />
            <UserInput 
                id="confirm"
                label="Confirm"
                userInput={{
                    type: "password",
                    id: "confirm",
                    onChange: (e) => setSignUp({...signUp, confirm: e.currentTarget.value}),
                    value: confirm
                }}
            />
        </div>
    )
}