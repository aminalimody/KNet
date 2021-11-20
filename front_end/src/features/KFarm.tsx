/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { create } from 'ipfs-http-client';
import { Typography, makeStyles } from '@material-ui/core';

// Why not in a css folder? 
// For material UI
// https://material-ui.com/styles/basics/
const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4),
    },
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    },
}))


export const KFarm = () => {

    const classes = useStyles()
    // function to upload file to pinata IPFS
    const uploadToIPFS = async (file: File) => {
        /* Create an instance of the client */
        const client = create('https://ipfs.infura.io:5001/api/v0')

        /* upload the file */
        const added = await client.add(file)

        const uri = `https://ipfs.infura.io/ipfs/${added.path}`
        return uri
    }

    // function tu create metatadata using file uri
    const createMetadata = async (uri: string) => {
        const metadata = {
            'content-type': 'text/plain',
            'uri': uri
        }
        return metadata
    }
    // function to upload metadata to pinata IPFS
    const uploadMetadataToIPFS = async (metadata: any) => {
        const meta_url = uploadToIPFS(JSON.stringify(metadata))
        return meta_url
    }
    /**
     * useEthers will return a populated 'error' field when something has gone wrong.
     * We can inspect the name of this error and conditionally show a notification
     * that the user is connected to the wrong network.
     */

    return (
        <div className={classes.container}>
            <Typography
                variant="h2"
                component="h1"
                classes={{
                    root: classes.title,
                }}
            >
                Welcome
            </Typography>


        </div>
    )
}
