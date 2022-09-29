import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AuthContext from "../../context/AuthContext";
import Head from "../common/Head";
import Heading from "../typography/Heading";
import AddForm from "./addAccommodation/AddForm";
import EnquiryList from "./enquiries/EnquiryList";
import ContactMessageList from "./messages/ContactMessageList";
import styles from "./Dashboard.module.css";

const DashboardPage = () => {
  const [auth] = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head title="Dashboard" addPostfixTitle={true} keywords description="Admin dashboard" />
      <Heading title="Dashboard" />
      <div className={styles.flex}>
        <div className={styles.leftColumn}>
          <h2>Hi there!</h2>
          <p className="">You are now logged in. </p>
          <p>(To log out, use the logout-button in the menu.)</p>
          <span>Here you can: </span>
          <ul>
            <li>&bull; check messages</li>
            <li>&bull; administrate enquiries</li>
            <li>&bull; add new accommodations</li>
          </ul>
        </div>
        <div className={styles.rightColumn}>
          <Tabs>
            <TabList className={styles.tabList}>
              <Tab>Messages</Tab>
              <Tab>Enquiries</Tab>
              <Tab>Add accommodation</Tab>
            </TabList>

            <TabPanel>
              <ContactMessageList />
            </TabPanel>
            <TabPanel>
              <EnquiryList />
            </TabPanel>
            <TabPanel>
              <p className={styles.notification}>
                <span>NB! Be patient!</span> Sometimes it takes a few seconds after you press "add product" till you get a confirmation about success.
              </p>
              <AddForm />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
