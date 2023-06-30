// @flow 
import { AppBar, Toolbar, Theme, Typography, makeStyles } from '@material-ui/core'
import * as React from 'react'
import logo from "../../../static/logo.png"

const useStyles = makeStyles( (theme: Theme) => ({
    tollbar: {
        backgroundColor: '#000000'
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    logo: {
        width: 100,
        [theme.breakpoints.up('sm')]: {
            width: 170
        }
    }
}))

export const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar className={classes.tollbar}>
                <Typography className={classes.title}>
                    <img src={logo} alt="Codeflix" className={classes.logo}/>
                </Typography>

            </Toolbar>
        </AppBar>
    );
};
