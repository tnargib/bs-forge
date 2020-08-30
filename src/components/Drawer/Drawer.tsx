import React from "react";
import { Card, CardContent, Hidden, Toolbar, Drawer as MuiDrawer } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

import { darkTheme } from "../../styles/themes";

const DRAWER_WIDTH = 400;

const useStyles = makeStyles({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  floatingDrawer: {
    flexGrow: 1,
    margin: 15,
    borderRadius: 15,
    overflowY: "auto",
  },
  floatingDrawerPaper: {
    width: DRAWER_WIDTH,
    background: "none",
    border: "none",
  },
  floatingDrawerContent: {
    padding: 0,
  },
});

type Props = {
  open?: boolean;
};
const Drawer: React.FC<Props> = ({ open = false, children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp>
        <MuiDrawer
          open={open}
          anchor="right"
          variant="temporary"
          classes={{
            root: classes.drawer,
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={handleDrawerToggle}
        >
          {children}
        </MuiDrawer>
      </Hidden>
      <Hidden smDown>
        <MuiDrawer
          open={open}
          anchor="right"
          variant="persistent"
          classes={{
            root: classes.drawer,
            paper: classes.floatingDrawerPaper,
          }}
        >
          <Toolbar />
          <Card classes={{ root: classes.floatingDrawer }} elevation={6}>
            <CardContent classes={{ root: classes.floatingDrawerContent }}>{children}</CardContent>
          </Card>
        </MuiDrawer>
      </Hidden>
    </ThemeProvider>
  );
};

export default Drawer;
