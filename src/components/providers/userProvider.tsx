import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { AllData, Page } from "../../types/objectTypes";
import { validations } from "../../functions/validations";
import { defaultAllData } from "../../functions/defaultStates";
import { apiFunctions } from "../../functions/apiFunctions";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>("loading");
  const [allData, setAllData] = useState<AllData>(defaultAllData());

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
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
