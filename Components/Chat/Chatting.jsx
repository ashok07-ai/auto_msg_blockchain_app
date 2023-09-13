import React from "react";
import { Sidebar, Chat, Help, History, Subscription, Setting } from "./index";

const Chatting = () => {
  return (
    <div>
      <section className="chatting-wrapper pt-0">
        <Sidebar />
        <div className="tab-content">
          <Chat />
          <History />
          <Subscription />
          <Help />
          <Setting />
        </div>
      </section>
    </div>
  );
};

export default Chatting;
