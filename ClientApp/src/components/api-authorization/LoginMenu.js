import React, { Component, Fragment } from 'react';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { Divider, ListItemText} from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Link } from "react-router-dom";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            anchorEl: null,
            loginPath: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
      };
    
    handleClose = () => {
        this.setState({anchorEl: null});
      };

    

    render() {
        const { isAuthenticated, userName, anchorEl} = this.state;
        const open = Boolean(anchorEl); 
        let loginPath,  profilePath, logoutPath, registerPath;
        if (isAuthenticated) {
            profilePath = `${ApplicationPaths.Profile}`;
            logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
           
        } else {
            registerPath = `${ApplicationPaths.Register}`;
            loginPath = `${ApplicationPaths.Login}`;
        }

        return (
          <React.Fragment>
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={this.handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {this.state.isAuthenticated ? (
                    <Avatar sx={{ width: 40, height: 40, bgcolor: indigo[500]}}>
                      {userName.toUpperCase().charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: 40, height: 40 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={this.state.anchorEl}
              id="account-menu"
              open={open}
              onClose={this.handleClose}
              onClick={this.handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box>
              {this.state.isAuthenticated ? (
                <MenuItem> Welcome, {this.state.userName} </MenuItem>
              ) : (
                <MenuItem> You are not logged in </MenuItem>
              )}

              <Divider />

              { this.state.isAuthenticated ? (
                <MenuItem component={Link} to={logoutPath}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
                ) : (
                 <>
                  <MenuItem component={Link} to={registerPath}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Register
                  </MenuItem>

                  <MenuItem component={Link} to={loginPath}>
                    <ListItemIcon>
                      <Login fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                </>
              )}
              </Box>
            </Menu>
          </React.Fragment>
        );
    }
}
