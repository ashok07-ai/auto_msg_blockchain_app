import React from "react";
import { MdPaid } from "react-icons/md";

const Help = () => {
  return (
    <div
      className="tab-pane fade"
      id="help"
      role="tab-panel"
      aria-labelledby="help"
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
            <h3>FAQ</h3>
          </div>
          <a href="" className="premium-btn" data-cursor="pointer">
            <i className="iconsax" data-icon="crown-2"></i>
            <MdPaid /> Get <span>Premium</span>
          </a>
        </div>

        <div className="faq-section main-section">
          <div className="container card p-0">
            <div className="card-header">
              <h3
                className="text-white text-basic aos-init aos-animate"
                data-aos-duration="1000"
                data-aos-delay="100"
              >
                Frequently Answered Questions
              </h3>
            </div>

            <div className="card-body px-sm-4 px-3">
              <div className="accordion" id="accordionPanelStayOpenExample">
                {[1, 2, 3, 4, 5].map((element, index) => (
                  <div
                    className="accordion-item aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={100 * index + 1}
                  >
                    <h2
                      className="accordion-header"
                      id={`panelsStayOpen-heading${index}`}
                    >
                      <button
                        data-cursor="pointer"
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapse${index}`}
                        aria-controls={`panelsStayOpen-collapse${index}`}
                        aria-expanded="true"
                      >
                        What are the features of Blockchain Technology?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collaps show"
                      id={`panelsStayOpen-collapse${index}`}
                      aria-labelledby={`panelsStayOpen-heading${index}`}
                    >
                      <div className="accordion-body">
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Rem necessitatibus at ad eligendi fugiat
                          distinctio, quaerat deserunt ipsa saepe deleniti
                          laboriosam asperiores sint est nemo voluptatem fuga in
                          dolorem. Eligendi?
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
