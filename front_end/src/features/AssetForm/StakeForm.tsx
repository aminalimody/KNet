import React, { useEffect, useState } from "react"
import { SliderInput } from "../../components"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import KFarm from "../KFarm"
import { Token } from "../Main"
import { CreateAsset } from "../../hooks"
import { utils } from "ethers"
import Alert from "@material-ui/lab/Alert"
import "../../App.css"

// This is the typescript way of saying this compent needs this type
export interface StakeFormProps {
  token: Token
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
  },
  slider: {
    width: "100%",
    maxWidth: "400px",
  },
}))

// token is getting passed in as a prop
// in the ping brackets is an object/variable 
// That object is of the shape StakeFormProps
export const StakeForm = ({ token1, token2 }: StakeFormProps) => {
  const { address: tokenAddress, name } = token1
  const { address: AssetAddress, name2 } = token2

  const { account } = useEthers()
  const tokenBalance = useTokenBalance(tokenAddress, account)
  const { notifications } = useNotifications()

  const classes = useStyles()
  const [filetoUpload, setFiletoUpload] = useState<File>()
  const { send: stakeTokensSend, state: stakeTokensState } =
    CreateAsset(tokenAddress, AssetAddress)

  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0
  const handleCreateAsset = async () => {
    // upload the file from the input using uploadMetadataToIPFS
    //get the file from the input
    Kfarm.uploadMetadataToIPFS(filetoUpload)
  }

  const [amount, setAmount] =
    useState<number | string | Array<number | string>>(0)

  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] =
    useState(false)
  const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false)

  const handleCloseSnack = () => {
    showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
    showStakeTokensSuccess && setShowStakeTokensSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(true)
      showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {
      showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
      !showStakeTokensSuccess && setShowStakeTokensSuccess(true)
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess])

  const isMining = stakeTokensState.status === "Mining"

  const hasZeroBalance = formattedTokenBalance === 0
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0
  const setFiletoUploadfunc = (e) => {
    setFiletoUpload(e.target.files[0])
  }
  return (
    <>
      <div className={classes.container}>
        <SliderInput
          label={`Stake ${name}`}
          maxValue={formattedTokenBalance}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount}
          onChange={setAmount}
          disabled={isMining || hasZeroBalance}
        />
        <div>

          Please upload your publication or enter the Doi of the publication
          <br />


          <input type="file" name="file" onChange={setFiletoUploadfunc} />
          <input type="text" name="doi" />
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleCreateAsset}
          disabled={isMining}
        >
          {isMining ? <CircularProgress size={26} /> : "Create"}
        </Button>
      </div>
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          initiate the staking transfer.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens staked successfully!
        </Alert>
      </Snackbar>
    </>
  )
}
