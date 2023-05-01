import React, { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getTokenDuration } from "../util/auth";

const RootComponent = () => {
  const token = useLoaderData(); // data of same route loader
  const submit = useSubmit();
  // const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <div>
      <MainNavigation />
      {/* {navigation.state === "loading" && <p>Loading...</p>} */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootComponent;
