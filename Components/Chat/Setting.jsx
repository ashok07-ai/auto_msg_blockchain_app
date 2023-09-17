import React, { useEffect, useState } from "react";
import { MdPaid } from "react-icons/md";
import { useStateContext } from "../../Context/index";

const Setting = () => {
  const [user, setUser] = useState();
  const { userMembership } = useStateContext();

  useEffect(() => {
    const str = localStorage.getItem("loggedINUserDetails");
    const parsedObj = JSON.parse(str);

    if (parsedObj?.firstName) {
      setUser(parsedObj);
    }
  }, []);

  const [newUser, setNewUser] = useState({
    firstName: user?.firstName || "",
    lastName: "",
    email: user?.email || "",
    newPassword: user?.newPassword || "",
    confirmPassword: user?.confirmPassword || "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setNewUser({ ...newUser, [fieldName]: e.target.value });
  };

  const updateUser = () => {
    const jsonObj = JSON.stringify(newUser);
    localStorage.setItem("loggedINUserDetails", jsonObj);
  };
  return (
    <div
      className="tab-pane fade"
      id="settings"
      role="tab-panel"
      aria-labelledby="settings"
      tabIndex="0"
    >
      <div className="main-wrapper p-0">
        <div className="fixed-header">
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
              <i className="iconsax" data-icon="text-align-justify"></i>
            </button>
            <a href="/" className="logo-icon d-flex d-md-none">
              <img
                src="assets/svg/logo-icon.svg"
                className="img-fluid"
                alt=""
              />
            </a>
            <h3>Settings</h3>
          </div>
          <a href="" className="premium-btn" data-cursor="pointer">
            <i className="iconsax" data-icon="crown-2"></i>
            <MdPaid /> Get <span>Premium</span>
          </a>
        </div>

        <div className="main-section d-flex gap-4 flex-column">
          <div className="container card p-0">
            <div className="card-header">
              <h3 className="text-white">Accound Details</h3>
            </div>

            {/* Card Membership */}
            <div className="card-body px-sm-4 px-3">
              <div className="my-account">
                <div className="user-detail"></div>
                <div className="user-main">
                  <div className="user-profile">
                    <img
                      src="theblockchaincoders.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <i className="iconsax" data-icon="camera"></i>
                  </div>
                  <div className="user-option">
                    <h4>{user?.name}</h4>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <form className="msger-inputarea mb-0">
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          placeholder={user?.name}
                          onChange={(e) =>
                            handleFormFieldChange("firstName", e)
                          }
                          className="msger-input"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 col-12">
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="email"
                          id="lastName"
                          placeholder={user?.lastName}
                          onChange={(e) => handleFormFieldChange("lastName", e)}
                          className="msger-input"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 col-12">
                      <div className="mb-3">
                        <label htmlFor="emal" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder={user?.email}
                          onChange={(e) => handleFormFieldChange("email", e)}
                          className="msger-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="card-footer">
              <div className="setting-btn">
                <button className="select-plan" onClick={() => updateUser()}>
                  Update
                </button>

                <button className="on-select-plan select-plan">Cancel </button>
              </div>
            </div>
          </div>

          {/* Second component */}
          {userMembership && userMembership.userMembershipId != 0 && (
            <div className="container card p-0">
              <div className="card-header">
                <h3 className="text-white">Membership</h3>
              </div>
              <div className="card-body px-sm-4 px-3">
                <div className="my-account">
                  <form className="msger-inputarea mb-0">
                    <div className="row">
                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label
                            htmlFor="membershipPlan"
                            className="form-label"
                          >
                            Membership Plan
                          </label>
                          <input
                            type="disabled"
                            id="membershipPlan"
                            placeholder={
                              userMembership.userMembershipId == 1
                                ? "One Year"
                                : userMembership.userMembershipId == 2
                                ? "One Month"
                                : userMembership.userMembershipId == 3
                                ? "Six Months"
                                : "No Membership selected"
                            }
                            className="msger-input"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label
                            htmlFor="membershipCost"
                            className="form-label"
                          >
                            Last Name
                          </label>
                          <input
                            type="disabled"
                            id="membershipCost"
                            placeholder={
                              userMembership.cost == 1
                                ? "5 Ethers"
                                : userMembership.cost == 2
                                ? "1 Ether"
                                : userMembership.cost == 3
                                ? "3 Ethers"
                                : "----"
                            }
                            className="msger-input"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="userId" className="form-label">
                            User Id
                          </label>
                          <input
                            type="disabled"
                            id="userId"
                            placeholder={userMembership.userId}
                            className="msger-input"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="expiredDate" className="form-label">
                            Expires In
                          </label>
                          <input
                            type="disabled"
                            id="userId"
                            placeholder={`${
                              userMembership.expiredDate || "----"
                            }`}
                            className="msger-input"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label htmlFor="userAddress" className="form-label">
                            Address
                          </label>
                          <input
                            type="disabled"
                            id="address"
                            placeholder={`${
                              userMembership.userAddress || "----"
                            }`}
                            className="msger-input"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="container card p-0">
            <div className="card-header">
              <h3 className="text-white">Change Password</h3>
            </div>

            <div className="card-body px-sm-4 px-3">
              <div className="my-account">
                <form className="msger-inputarea mb-0">
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          placeholder={`Enter new password`}
                          onChange={(e) =>
                            handleFormFieldChange("newPassword", e)
                          }
                          className="msger-input"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 col-12">
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          placeholder={`Confirm new password`}
                          onChange={(e) =>
                            handleFormFieldChange("confirmPassword", e)
                          }
                          className="msger-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-footer">
              <div className="setting-btn">
                <button className="select-plan" onClick={() => updateUser()}>
                  Update password
                </button>

                <button className="on-select-plan select-plan">Cancel </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
