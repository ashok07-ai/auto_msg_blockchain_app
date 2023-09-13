import React, { useEffect, useState } from "react";
import { useStateContext } from "../../Context";
import { BiMenu } from "react-icons/bi";
import { MdPaid } from "react-icons/md";

const Chat = () => {
  // State Variables
  const [active, setActive] = useState("Ask anything");
  const [hide, setHide] = useState(true);
  const [proMember, setProMember] = useState({});
  const [freeTrial, setFreeTrial] = useState();

  // Statemanagement Context
  const { freeMembershipTrail, address } = useStateContext();

  const close = (e) => {
    e.preventDefault();
    setHide(false);
  };

  const serviceMenuList = [
    "Ask anything",
    "Content Writer",
    "Code generator",
    "Translate anything",
    "Social Media",
    "Email generator",
    "Personal advise",
    "Password generator",
    "Travel/Hangout",
    "Essay writer",
  ];

  const loadData = () => {
    const userDetail = localStorage.getItem("proMemberDetail");
    const member = JSON.stringify(userDetail);
    setProMember(member);

    // Free trial
    const freeTrial = localStorage.getItem("freeTrial");
    setFreeTrial(freeTrial);
    console.log(freeTrial);
  };

  useEffect(() => {
    loadData();
  }, []);

  const display = freeMembershipTrail?.replace(/['"]+/g, "");
  return (
    <div
      className="tab-pane fade show active"
      id="chat"
      role="tabpanel"
      area-labelledby="chat"
      tabIndex="0"
    >
      <div className="main-wrapper">
        {/* Navbar start */}
        <nav className="navbar navbar-expand-lg bg-light p-0">
          <button
            className="navbar-toggler d-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BiMenu className="mobil_custom_menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="inner-menu-panel">
              <button
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className="inner-close d-block d-lg-none"
              >
                Back
              </button>

              <div className="search-box">
                <i className="iconsax" data-icon="search-normal-2"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              <ul className="inner-links-list" id="innerLink">
                {serviceMenuList.map((items, i) => (
                  <li
                    key={i + 1}
                    onClick={() => setActive(items)}
                    className={items === active ? "active" : ""}
                  >
                    <a href="#!" data-title="Ask anything">
                      {items}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        {/* End nav bar */}

        {/* Chat header start */}
        <div className="chat-header">
          <div className="d-flex align-items-center gap-2">
            <button
              className="navbar-toggler d-md-none d-block"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainnavbarNav"
              aria-controls="mainnavbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <BiMenu className="mobil_custom_menu" />
            </button>
            <a href="/" className="logo-icon d-flex d-none d-md-none">
              <img
                src="assets/svg/logo-icon.svg"
                className="img-fluid"
                alt=""
              />
            </a>
            <h3 id="targetDiv">{active}</h3>
          </div>

          <div className="header-option">
            {display == "Pro Member" ? (
              <a href="#">{display}</a>
            ) : (
              <a className="del-btn" data-cursor="pointer" href="#">
                Free Left (<span id="freeTry">{freeMembershipTrail | 0}</span>)
              </a>
            )}

            <a
              href="#!"
              className="premium-btn"
              id="subscriptionBtn"
              data-cursor="pointer"
            >
              <MdPaid /> Get <span>Premium</span>
            </a>
          </div>
        </div>
        {/* End of chat header */}

        {/* Chat body */}
        <div className="main-chat">
          <div className="no-chat">
            {hide ? (
              <div>
                <img src="assets/svg/no-chat.svg" alt="img-fluid" />
                <h3>{active === "Ask anything" ? "" : "Ask"}</h3>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="" id="chat_container"></div>
          {/* <Form
            close={close}
            proMember={proMember}
            address={address}
            freeMembershipTrail={freeMembershipTrail}
          /> */}
        </div>
        {/* End of chat body */}
      </div>
    </div>
  );
};

export default Chat;
