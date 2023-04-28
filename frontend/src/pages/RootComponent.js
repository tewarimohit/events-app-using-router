import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

const RootComponent = () => {
  // const navigation = useNavigation();

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
