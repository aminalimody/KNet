import { Button } from "@material-ui/core"
import { HeaderTabs } from "./HeaderTabs"
import eth from "../eth.png"
import dapp from "../dapp.png"
import dai from "../dai.png"
import { TokenFarmContract } from "./tokenFarmContract"
import { useEthers } from "@usedapp/core"
import React, { useEffect, useState } from "react"
import { constants } from "ethers"
import DappToken from "../chain-info/Asset.json"
import networkMapping from "../chain-info/map.json"
import brownieConfig from "../brownie-config-json.json"
import helperConfig from "../helper-config.json"
import { Snackbar, Typography, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"




export type Token = {
  image: string
  address: string
  name: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "0%",
    right: "0%",
    width: "100%",
    height: "10%",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
    zIndex: 2,
  },
  headderBuon: {
    height: "42px",
    width: "150px",
    backgroundColor: "#a8528cff",
    color: "#000000",
  }

}))

/*
--violet-crayola: #993a79ff;
--magenta-haze: #a8528cff;
--emerald: #67cf8aff;
--medium-sea-green: #41b066ff;
--blue-ncs: #238dc2ff;
*/



export const Header = () => {
  const classes = useStyles()


  const [showNetworkError, setShowNetworkError] = useState(false)

  const handleCloseNetworkError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    showNetworkError && setShowNetworkError(false)
  }

  const { account, activateBrowserWallet, deactivate } = useEthers()

  const isConnected = account !== undefined



  const { chainId, error } = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  console.log(typeof chainId)
  // We need to pull the DAPP token address from the .json file written to by Brownie
  const AssetAddress = chainId ? networkMapping[String(chainId)]["Asset"][0] : constants.AddressZero
  const fundAddress = chainId ? networkMapping[String(chainId)]["Fund"][0] : constants.AddressZero
  const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
  //console.log(AssetAddress)
  /**
   * Our single central location to store info on support tokens.
   * This is the only place you'll need to add a new token to get it to display in the UI!
   * 
   * Modularize the addresses like with `dappTokenAddress`
   * To make it chain agnostic
   */
  const supportedTokens: Array<Token> = [
    {
      image: eth,
      address: wethTokenAddress,
      name: "WETH",
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: "FAU",
    },
    {
      image: dapp,
      address: fundAddress,
      name: "FUN",
    },
  ]

  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      !showNetworkError && setShowNetworkError(true)
    } else {
      showNetworkError && setShowNetworkError(false)
    }
  }, [error, showNetworkError])

  return (
    <div className={classes.container}>
      <HeaderTabs supportedTokens={supportedTokens} AssetToken={{
        image: eth,
        address: AssetAddress,
        name: "ASS",
      }} />
      {isConnected ? (
        <Button variant="contained" className={classes.headderBuon} onClick={deactivate}>
          Disconnect
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          className={classes.headderBuon}
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </Button>

      )}
      <Snackbar
        open={showNetworkError}
        autoHideDuration={5000}
        onClose={handleCloseNetworkError}>
        <Alert onClose={handleCloseNetworkError} severity="warning">
          You gotta connect to the Kovan or Rinkeby network!
        </Alert>
      </Snackbar>
    </div>
  )
}
