import React from "react";
import { useStateContext } from "../Context/index";

const index = () => {
  // State management variable
  const { DAP_NAME, membershipList } = useStateContext();
  return (
    <div className="icon-custom">
      <p>{DAP_NAME}</p>
      <button onClick={membershipList}>Membership List</button>
    </div>
  );
};

export default index;
