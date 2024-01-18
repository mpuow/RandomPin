import { Box } from '@mui/material'
import Button from '@mui/material-next/Button'
import React from 'react'
import { PhysicalSize, appWindow } from '@tauri-apps/api/window'
import { invoke } from "@tauri-apps/api/tauri"

export async function changeWindowSize(width:number, height:number) {
    await appWindow.setSize(new PhysicalSize(width,height))

    console.log("change size")
}

async function test() {
    await invoke("test")
}

function Journal(props: { setAuth: (arg0: boolean) => void }) {

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

            <Button variant='filled' onClick={() => changeWindowSize(800, 600)}>Change window size</Button>

            <Button onClick={() => test()}>Invoke</Button>
        </>
    )
}

export default Journal