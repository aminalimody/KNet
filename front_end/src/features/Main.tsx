/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React, { Component, useEffect, useState } from "react"
import eth from "../eth.png"
import dapp from "../dapp.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet"
import { KnowledgeContract } from "./KnowledgeContract"
import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
import { Snackbar, Typography, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import networkMapping from "../chain-info/map.json"
import brownieConfig from "../brownie-config-json.json"
import helperConfig from "../helper-config.json"
import { KFarm } from "./KFarm"
import { Landing } from "./Landing"
import { Header } from "./Header"

// Why not in a css folder? 
// For material UI
// https://material-ui.com/styles/basics/
const useStyles = makeStyles((theme) => ({
    Main: {
        position: "absolute",
        top: "0%",
        left: "0%",
        display: "flex",
        flexDirection: "row",
        textAlign: "justify",
        color: "white",
        zIndex: 1,


        width: "100%",
        height: "100%",
        //display: "flex",
        //justifyContent: "flex-end",
        gap: theme.spacing(1),


    }
}))




export const Main = () => {

    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined
    return (
        <div className={classes.Main}>



            <Header />

            {isConnected ? (
                <>
                    <KFarm />
                </>
            ) : (
                <Landing />

            )}

        </div>
    )
}
