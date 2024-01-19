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
    
    function deleteFromSQLite(date: string) {
        invoke("delete_from_frontend", ({date: date}))
        dataFromSQLite()
    }
    
    function dataFromSQLite() {
        invoke("send_data_to_react").then((message) => setJournalArray(message))
    }

    function formatTime(time:string) {

        let timeSplitArray = time.split(":")
        let hour:number = +timeSplitArray[0]
        let minute = timeSplitArray[1]
        let end = "AM"

        if (hour == 0) {
            hour = 12
        } else if (hour == 12) {
            end = "PM"
        } else if (hour > 12) {
            hour = hour - 12
            end = "PM"
        }

        let returnTime = [hour, minute].join(":") + end

        return returnTime
    }

    function formatDate(date:string) {

        let count = 0
        let beforeSplit = ""

        for(let i = 0; i < date.length; i++) {

            if (date[i] == ":") {
                count++
            }

            if (count > 1) {
                break
            }
            beforeSplit = beforeSplit + date[i]
            
            console.log(date[i])
        }

        let splitArray = beforeSplit.split(" ")

        let beforeDateFormat = splitArray[0]
        let preDateSplit = ""

        for(let i = 0; i < beforeDateFormat.length ; i++) {
            preDateSplit = preDateSplit + beforeDateFormat[i]
        }
        let splitDate = preDateSplit.split("-")
        let d = [splitDate[2], splitDate[1], splitDate[0] ].join("/")

        let finalDate = [formatTime(splitArray[1]), d].join(" ")

        return finalDate
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
                    <Input onChange={(e) => setAddValues({ ...addValues, title: e.target.value })} placeholder='Add title' inputProps={{ maxLength: 20 }}></Input>
                    <Input onChange={(e) => setAddValues({ ...addValues, content: e.target.value })} placeholder='Add content' inputProps={{ maxLength: 200 }}></Input>
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
                        <Box bgcolor={'limegreen'}>{formatDate(val.date)}</Box>
                        <Button onClick={() => deleteFromSQLite(val.date)}>Delete</Button>
                    </Grid>
                ))}

                ENCRYPT AND DECRYPT DATABASE
            </Box>

            <Button variant='filled' onClick={() => changeWindowSize(800, 600)}>Change window size</Button>

        </>
    )
}

export default Journal