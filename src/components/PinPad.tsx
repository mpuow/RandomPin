import { Box, Grid } from '@mui/material'
import Button from '@mui/material-next/Button'
import { useState } from 'react'

function pinPad(props: any) {

    const defaultPin = ["", "", "", ""]
    const [pin, setPin]: any = useState(defaultPin)

    const changePin = (newValue: any) => {
        let changeIndex = -1
        for (let i = 0; i < pin.length; i++) {
            if (pin[i] === "") {
                changeIndex = i
                break
            }
        }

        setPin(pin.map(
            (value: any, index: any) => index === changeIndex ? newValue : value
        ))
    }

    const clearButton = () => {
        setPin(defaultPin)
    }

    const deleteButton = () => {

        let changeIndex = -1
        for (let i = pin.length - 1; i > -1; i--) {
            if (pin[i] !== "") {
                changeIndex = i
                break
            }
        }

        setPin(pin.map(
            (value: any, index: any) => index === changeIndex ? "" : value
        ))
    }

    const enterButton = () => {
        let code = [1, 1, 1, 1]
        if (JSON.stringify(code) == JSON.stringify(pin)) {
            console.log("CORRECT PIN")
            props.setAuth(true)
            setPin(defaultPin)
        } else {
            console.log("INCORRECT PIN")
            setPin(defaultPin)
        }
    }

    const handleButton = (val: string | number) => {
        switch (val) {
            case "Clear": {
                clearButton()
                break
            }
            case "Del": {
                deleteButton()
                break
            }
            default: {
                changePin(val)
                break
            }
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }} bgcolor={'gold'} padding={2} height={40}>
                <Grid
                    container
                    item
                    // xs={12}
                    spacing={0}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '0px',
                        alignItems: 'stretch'
                    }}
                >
                    {pin.map((val: any) => (
                        <Grid>
                            <Box padding={2} border={2} borderColor={"gray"} height={10}>{val}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    item
                    // xs={12}
                    spacing={0}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0px',
                        alignItems: 'stretch'
                    }}
                >
                    {props.randomisedNumbers.map((val: any) => (
                        <Grid key={val}>
                            <Button onClick={() => handleButton(val)}>{val}</Button>
                        </Grid>
                    ))}
                    <Button variant="filled" onClick={() => enterButton()}>Enter</Button>
                </Grid>
            </Box>
        </>
    )
}

export default pinPad