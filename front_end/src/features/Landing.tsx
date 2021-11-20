import { Button, makeStyles } from "@material-ui/core"
import grid_logo from "../images/grid_logo.jpg"
import { useEthers } from "@usedapp/core"
import { Whitepaper } from "./Whitepaper"
import { IoIosArrowDropdown } from "react-icons/io"

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
        overflow: "hidden",
        background: "linear-gradient(135deg, #147278, #174978, #2741a0 );",

        width: "100%",
        height: "100%",
        //display: "flex",
        //justifyContent: "flex-end",
        gap: theme.spacing(1),


    },
    titlebox: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        color: "white",
        zIndex: 10,

        padding: theme.spacing(4),
        paddingLeft: "7%",

    },
    // style for h1 in title div, sci-fi style
    titleh1: {
        fontSize: "5rem",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 2px black",

    },
    titleh3: {
        fontSize: "1.3rem",
        width: "45%",

    },
    // style for h2 in title div, sci-fi style
    titleh2: {
        fontSize: "3rem",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 2px black",

    },

    circleSpot: {
        // circle pinned to the top right corner
        position: "absolute",
        top: "42%",
        left: "70%",
        width: "125px",
        height: "125px",
        borderRadius: "50%",
        // hide overflow
        //move contents to the left by 10 pixels
        overflow: "hidden",
        padding: "0px 475px  475px 0px",
        opacity: "0.5",

        zIndex: 0,

    },
    pointer: {
        position: "absolute",
        bottom: "5%",
        left: "40%",

    },

    buton: {
        height: "72px",
        fontSize: "1.5rem",
        color: "black",
        backgroundColor: " #67cf8aff",
        zIndex: 10,
    }
}))


export const Landing = () => {
    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()


    // Return the landing page for the GRID or a Decentralized Public Community
    return (
        <>
            <div className={classes.upper}>
                <div className={classes.titlebox}>

                    <h1 className={classes.titleh1}>
                        The Knowledge Network
                    </h1>
                    <h3 className={classes.titleh3}>
                        The Knowledge Network is a Decentralized Public Community platform that allows users to share scientific knowledge and resources founded in trust.
                    </h3>
                    <h2>
                        Join now and get a <em style={{ fontSize: "1.15em" }}>$500 </em>sign-up bonus. <br /><br /> Limited Coupons available!
                    </h2>
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
                {/* create a div containing a white arrow pointing to the bottom */}
                <div className={classes.pointer}>

                    <IoIosArrowDropdown size="100px" color="white" />

                </div>


            </div >

            <Whitepaper />
        </>
    )
}
