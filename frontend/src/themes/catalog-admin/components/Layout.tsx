import { Box, Card, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Navbar } from './Navbar';
import LocaleSelect from './LocaleSelect';
import Alert, { Color } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        height: "100%",
        paddingTop: "70px",
    },
    cardWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    card: {
        width: 600,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginLeft: theme.spacing(1),
            marginRigth: theme.spacing(1)
        }
    },
    title: {
        color: "#999999",
        textAlign: "center",
      },
}));

export interface LayoutProps {
    children: React.ReactNode;
    // loginTitle: string;
    i18nEnabled?: boolean;
    message?: { type: Color; content: string };
    locale?: {
        currentLocale: string;
        locales: {
            label: string;
            url: string;
        }[]
    };
    title: string;
    isAppInitiatedAction: boolean;
};

export const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    const {
        i18nEnabled, 
        locale, 
        title, 
        message, 
        isAppInitiatedAction, 
        children
    } = props;
    const classes = useStyles();

    return (
        <div>
            <Navbar/>
            <Box className={classes.content}>
                <Grid container alignItems="center" justify="center"  alignContent='center' direction="column">
                    <Grid item className={classes.cardWrapper}>
                        <Card className={classes.card}>
                            <CardHeader className={classes.title} title={title}/>
                            <CardContent>
                            {message &&
                                (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <Alert
                                        severity={message.type}
                                        variant="filled"
                                        elevation={6}
                                    >
                                    {message.content}
                                    </Alert>
                                )}
                                {children}
                            </CardContent>
                        </Card>
                    </Grid>
                    {i18nEnabled && locale && 
                        <Grid item>
                            <LocaleSelect 
                                locales={locale.locales} 
                                defaultValue={locale.currentLocale}
                                disableUnderline={true}
                            />
                        </Grid>}
                </Grid>
            </Box>
        </div>
    );
};