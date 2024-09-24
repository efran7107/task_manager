import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { AllData, Page, User } from "../../types/objectTypes";
import { validations } from "../../functions/validations";
import { defaultAllData, defaultUser } from "../../functions/defaultStates";
import { apiFunctions } from "../../functions/apiFunctions";
import { functions } from "../../functions/functions";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>("loading");
  const [allData, setAllData] = useState<AllData>(defaultAllData());
  const [user, setUser] = useState<User>(defaultUser);

  const reloadData = () => {
    apiFunctions
      .getAllData()
      .then((res) => {
        setAllData(res);
      })
      .catch(() => {
        setPage("error");
      });
  };

  useEffect(() => {
    const isUserLogged = validations.isUserLoggedIn();
    apiFunctions
      .getAllData()
      .then((res) => {
        setAllData(res);
        if (!isUserLogged) {
          setPage("login/signup");
          return;
        }
        const username = localStorage.getItem("user");
        functions.logInUser(setUser, username!, res.users);
        document.querySelectorAll(".site-title")[0].classList.add("logged-in");
        setPage("dashboard");
      })
      .catch(() => {
        setPage("error");
      });
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        page,
        setPage,
        allData,
        setAllData,
        user,
        setUser,
        reloadData,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
