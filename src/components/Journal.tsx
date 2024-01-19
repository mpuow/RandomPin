import { Box, Grid, Input } from '@mui/material'
import Button from '@mui/material-next/Button'
import React, { useEffect, useState } from 'react'
import { PhysicalSize, appWindow } from '@tauri-apps/api/window'
import { invoke } from "@tauri-apps/api/tauri"

export async function changeWindowSize(width:number, height:number) {
    await appWindow.setSize(new PhysicalSize(width,height))

    console.log("change size")
}


function Journal(props: { setAuth: (arg0: boolean) => void }) {
    
    const [journalArray, setJournalArray]:any = useState([])
    const [addValues, setAddValues] = useState({
        title: "",
        content: ""
    })
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        addToSQLite(addValues.title, addValues.content)
        setAddValues({
            title: "",
            content: ""
        })
        
    }

    function addToSQLite(title: string, content: string) {
        invoke("add_from_frontend", ({title: title, content: content}))
    }
    
    function deleteFromSQLite(title: string, content: string) {
        invoke("delete_from_frontend", ({title: title, content: content}))
        dataFromSQLite()
    }
    
    function dataFromSQLite() {
        invoke("send_data_to_react").then((message) => setJournalArray(message))
    }

    useEffect(() => {
        dataFromSQLite()
    }, [])

    return (
        <>
            <Box bgcolor={'green'}>
                AUTH
                <Button onClick={() => props.setAuth(false)}>GO BACK</Button>
            </Box>

            <Box>
                CREATE NEW ENTRY
                <form
                    className="row"
                    onSubmit={(e) => { handleSubmit(e) }}
                >
                    <Input onChange={(e) => setAddValues({ ...addValues, title: e.target.value })} placeholder='Add title'></Input>
                    <Input onChange={(e) => setAddValues({ ...addValues, content: e.target.value })} placeholder='Add content'></Input>
                    <Button type='submit'>Add</Button>
                </form>
            </Box>

            <Box>
                VIEW PREVIOUS ENTRIES (w/ time & date, title, content)
                {/* <Button onClick={() => dataFromSQLite()}>Data from rust</Button> */}
                {journalArray.map((val: any) => (
                    <Grid key={val.title}>
                        <Box bgcolor={'cyan'}>{val.title}</Box>
                        <Box bgcolor={'violet'}>{val.content}</Box>
                        <Button onClick={() => deleteFromSQLite(val.title, val.content)}>Delete</Button>
                    </Grid>
                ))}
            </Box>

            <Button variant='filled' onClick={() => changeWindowSize(800, 600)}>Change window size</Button>

        </>
    )
}

export default Journal