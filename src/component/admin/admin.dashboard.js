import { Navbar, Group, ScrollArea, Button, Container } from "@mantine/core";
import { LinksGroup } from "../navlink/navlink";
import { mockdata } from "./admin.helper";
import useStyles from "./admin.dashboard.style";
import { useState } from "react";
import { IconHeartbeat } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import style from "./admin.module.css";

const AdminDashboard = () => {
  const { classes } = useStyles();
  const [isOpen, setisOpne] = useState(true);
  const [openModel, setOpenModel] = useState(false);

  const handleSidenavbar = () => {
    setisOpne(!isOpen);
  };
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  const onLogout = () => {
    console.log("first");
  };

  return (
    <>
      <Navbar
        height={600}
        style={{
          width: isOpen ? "250px" : "60px",
          position: "fixed",
          top: "0",
        }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Button
              variant="outline"
              onClick={handleSidenavbar}
              size={!isOpen ? "xsm" : "sm"}
              p={5}
            >
              {isOpen ? " Admin👤" : <IconHeartbeat />}
            </Button>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
        <Navbar.Section grow className={classes.footer}>
          <Button variant="filled" onClick={() => setOpenModel(true)}>
            Log out
          </Button>
        </Navbar.Section>
      </Navbar>
      <Container size={700} mt={50} mb={50}>
        <>
          {openModel && (
            <div className={style.model}>
              <p>Are You Sure you want to logOut ?</p>
              <div>
                <button
                  className={style.button}
                  onClick={() => setOpenModel(false)}
                >
                  No
                </button>
                <button className={style.button} onClick={onLogout}>
                  Yes
                </button>
              </div>
            </div>
          )}
          <Outlet />
        </>
      </Container>
    </>
  );
};

export default AdminDashboard;
