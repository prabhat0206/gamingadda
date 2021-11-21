import { createContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { backend_url } from "./backend";

export const userContext = createContext({});

export default function Context(props: any) {
  const [userObject, setUserObject] = useState<any>({});
  useEffect(() => {
    axios(backend_url + "auth/login/success", { withCredentials: true }).then(
      (response: AxiosResponse) => {
        if (response.data) {
          setUserObject(response.data.user);
        } else {
          setUserObject(null);
        }
      }
    );
  }, []);

  return (
    <userContext.Provider value={userObject}>
      {props.children}
    </userContext.Provider>
  );
}
