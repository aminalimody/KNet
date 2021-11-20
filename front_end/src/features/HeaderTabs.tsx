import React, { useState } from "react"
import { useEthers } from "@usedapp/core"
import { Tab, makeStyles, Box } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import {
    ConnectionRequiredMsg
} from "../components"
import { Token } from "./Main"
import { WalletBalance } from "./AssetForm/WalletBalance"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
    tabContent: {
        //display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: theme.spacing(4),



    },
    box: {
        borderRadius: "25px",
        width: "42px",
        height: "42px",
        overflow: "hidden",
        textIndent: "200%",
        color: "#31B6BDff",
        whiteSpace: "nowrap",
        transition: "all .42s ease-in-out",
        "&:hover": {
            width: "450px",
            height: "150px",
            textIndent: "0px",

            color: "#04525Fff",

        },

    },
    header: {
        color: "#EC7F21ff"
    }
}))
/*
       --cadmium-orange: #EC7F21ff;
      --midnight-green-eagle-green: #04525Fff;
      --arylide-yellow: #EBD66Dff;
      --metallic-sunburst: #A1924Dff;
      --maximum-blue-green: #31B6BDff;
        */

export const HeaderTabs = ({ supportedTokens, AssetToken }: YourWalletProps, _handleCreateAsset) => {
    // wtf is this? 
    // Reacts way of holding state between components 
    // Could do it without <number> 
    // saving state between renders of components 
    // You'd have to pass it through as a prop to have another component use it 
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }

    const { account } = useEthers()

    const isConnected = account !== undefined

    const classes = useStyles(isConnected)
    console.log(supportedTokens[selectedTokenIndex])
    return (
        <Box>
            <Box className={classes.box} style={{ backgroundColor: ((isConnected ? "#31B6BDff" : "#EC7F21ff")) }}>
                <div>
                    {isConnected ? (
                        <>
                            <TabContext value={selectedTokenIndex.toString()}>
                                <TabList onChange={handleChange} aria-label="stake form tabs">
                                    {supportedTokens.map((token, index) => {
                                        return (
                                            <Tab
                                                label={token.name}
                                                value={index.toString()}
                                                key={index}
                                            />
                                        )
                                    })}
                                </TabList>
                                {supportedTokens.map((token, index) => {
                                    return (
                                        <TabPanel value={index.toString()} key={index}>
                                            <div className={classes.tabContent}>
                                                <WalletBalance
                                                    token={supportedTokens[selectedTokenIndex]}
                                                />
                                                {/* this is the same as */}
                                                {/* The chainlink_defi props passing */}
                                            </div>
                                        </TabPanel>
                                    )
                                })}
                            </TabContext>
                        </>
                    ) : (
                        <ConnectionRequiredMsg />
                    )}
                </div>
            </Box>
        </Box>
    )
}
