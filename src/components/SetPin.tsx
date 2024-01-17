import Button from '@mui/material-next/Button'
import { sha256 } from 'js-sha256'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'

function SetPin(props: any) {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    function FormDialog() {

        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const formJson = Object.fromEntries((formData as any).entries())
                            const email = formJson.email
                            console.log(email)
                            handleClose()
                        },
                    }}
                >
                    <DialogTitle>Change Pin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To change pin, enter 4 numbers without spaces. eg: "1234"
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Enter Pin"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            // autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Confirm Pin"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Confirm</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    async function setPin() {
        // const store = new Store(".pin.json")
        setOpen(true)
        await props.store.set("pin", [1, 1, 1, 1])
        await props.store.save()

        console.log(sha256("[1,1,1,1]"))
    }

    return (
        <>
            <Button variant="filled" onClick={() => setPin()}>Set Pin</Button>

            <FormDialog />
        </>
    )
}

export default SetPin