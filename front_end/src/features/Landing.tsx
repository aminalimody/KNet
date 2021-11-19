import { Button, makeStyles, withWidth } from "@material-ui/core"
import grid_logo from "../images/grid_logo.jpg"
import { useEthers } from "@usedapp/core"


/*
--violet-crayola: #993a79ff;
--magenta-haze: #a8528cff;
--emerald: #67cf8aff;
--medium-sea-green: #41b066ff;
--blue-ncs: #238dc2ff;
*/
const useStyles = makeStyles((theme) => ({
    // style for title div
    // top right corner, sci-fi style
    upper: {
        position: "absolute",
        top: "0%",
        left: "0%",
        display: "flex",
        flexDirection: "row",
        textAlign: "justify",
        color: "white",
        zIndex: 1,

        background: "linear-gradient(135deg, #147278, #174978, #2741a0 );",

        padding: theme.spacing(4),
        width: "100%",
        height: "100%",
        //display: "flex",
        //justifyContent: "flex-end",
        gap: theme.spacing(1),


    },
    titlebox: {
        width: "45%",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        color: "white",
        zIndex: 10,
    },
    // style for h1 in title div, sci-fi style
    titleh1: {
        fontSize: "5rem",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 2px black",

    },
    // style for h2 in title div, sci-fi style
    titleh2: {
        fontSize: "2rem",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 2px black",

    },

    circleSpot: {
        // circle pinned to the top right corner
        position: "absolute",
        top: "5%",
        left: "2%",
        width: "125px",
        height: "125px",
        borderRadius: "50%",
        // hide overflow
        //move contents to the left by 10 pixels
        overflow: "hidden",
        padding: "0px 475px  475px 0px",
        transparancy: "100",
        //set opacity to 0.5 for images
        opacity: "0.125",
        //set background color to white
        backgroundColor: "#993a79ff",

        zIndex: 0,
        /*
        --violet-crayola: #993a79ff;
        --magenta-haze: #a8528cff;
        --emerald: #67cf8aff;
        --medium-sea-green: #41b066ff;
        --blue-ncs: #238dc2ff;
        */

    },
    bottomland: {
        backgroundColor: "#f5f5f5",
        position: "absolute",
        top: "100%",
        left: "0",
        width: "100%",
        height: "100%",
        //display: "flex",
        //justifyContent: "flex-end",
        gap: theme.spacing(1),
        // set background image
    },
    points: {
        // top right corner
        zIndex: 10,
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
    buton: {
        height: "72px",
        fontSize: "1.5rem",
        color: "black",
        backgroundColor: " #67cf8aff",
    }
}))


export const Landing = () => {
    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    // Return the landing page for the GRID or a Decentralized Public Community
    return (
        <div className={classes.upper}>
            <div className={classes.titlebox}>

                <h1 className={classes.titleh1}>
                    The Knowledge Network
                </h1>
                <p>
                    The Knowledge Network is a Decentralized Public Community platform that allows users to share scientific resources and publications founded in Trust.
                </p>
            </div>
            <div className={classes.points}>

                <div className={classes.point}>
                    Start earning NOW!
                    <p className={classes.pointtext}>
                        <ul>
                            <li>
                                Get paid everytime your publication is cited.
                            </li>
                            <li>

                                Earn a passive income from your publications or other scientific reosources.
                            </li>

                            <li>
                                Never again review a paper for free!
                            </li>
                            <li>
                                Get requested or submit your own reviews for any paper and get paid when the reviw is accepted.

                            </li>
                        </ul>
                    </p>
                </div>

                <div >
                    <br />
                    <Button variant="contained" onClick={() => activateBrowserWallet()} color="primary" className={classes.buton}>
                        Join the Community
                    </Button>
                </div>
            </div>

            <div className={classes.circleSpot}>

                <img src={grid_logo} alt="grid_logo" />
            </div>

            <div className={classes.bottomland}>
                Bottom

            </div>


        </div >
    )
}
