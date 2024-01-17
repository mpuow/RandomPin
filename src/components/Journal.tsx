import { Box } from '@mui/material'
import Button from '@mui/material-next/Button'
import React from 'react'
import { PhysicalSize, appWindow } from '@tauri-apps/api/window'

function Journal(props: { setAuth: (arg0: boolean) => void }) {

    async function changeWindowSize() {
        await appWindow.setSize(new PhysicalSize(500,500))

        console.log("change size")
    }

    return (
        <>
            <Box bgcolor={'green'}>
                AUTH
                <Button onClick={() => props.setAuth(false)}>GO BACK</Button>
            </Box>

            <Box>
                CREATE NEW ENTRY
            </Box>

            <Box>
                VIEW PREVIOUS ENTRIES (w/ time, date, title, content)
            </Box>

            <Button onClick={() => changeWindowSize()}>Change window size</Button>
        </>
    )
}

export default Journal