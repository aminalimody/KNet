import { Button, makeStyles } from "@material-ui/core"
import { useEthers } from "@usedapp/core"

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "5%",
    right: "5%",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1)
  },
  headderBuon: {
    backgroundColor: "#a8528cff"

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

  const { account, activateBrowserWallet, deactivate } = useEthers()

  const isConnected = account !== undefined

  return (
    <div className={classes.container}>
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
    </div>
  )
}
