import React from 'react'
import { Button, makeStyles, withWidth } from "@material-ui/core"

/*
--violet-crayola: #993a79ff;
--magenta-haze: #a8528cff;
--emerald: #67cf8aff;
--medium-sea-green: #41b066ff;
--blue-ncs: #238dc2ff;
*/
const useStyles = makeStyles((theme) => ({
    bottomland: {
        backgroundColor: "#f5f5f5",
        position: "absolute",
        top: "100%",
        left: "0",
        width: "100%",
        height: "100%",
        color: "#000000",
        //display: "flex",
        //justifyContent: "flex-end",
        gap: theme.spacing(1),
        // set background image
    },
    points: {
        // top right corner

        zIndex: 10,
        top: "20%",
        width: "33%",
        marginTop: "5%",
        marginLeft: "5%",
    },
    point: {
        fontSize: "2rem",
    },
    pointtext: {
        fontSize: "1rem",
    },
}));

export const Whitepaper = () => {
    const classes = useStyles()
    return (
        <div className={classes.bottomland}>
            <div className={classes.points}>

                <div className={classes.point}>
                    Start earning NOW!
                    <p className={classes.pointtext}>
                        <ul>
                            <li>
                                Start earning a passive income from your publications or other scientific reosources.
                            </li>
                            <li>
                                Never again review an article or paper for free!
                            </li>
                            <li>

                            </li>
                        </ul>
                    </p>
                </div>

            </div>

        </div>
    )
}
