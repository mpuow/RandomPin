import { useEffect, useState } from "react"
// import { invoke } from "@tauri-apps/api/tauri"
import Button from '@mui/material-next/Button'
import { Box, Container, Grid } from '@mui/material'
import "./App.css"
import PinPad from "./components/PinPad"
import { Store } from "tauri-plugin-store-api"
import SetPin from "./components/SetPin"
import Journal from "./components/Journal"

function App() {

    // const [greetMsg, setGreetMsg] = useState("")
    // const [name, setName] = useState("")

    // async function greet() {
    //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //   setGreetMsg(await invoke("greet", { name }))
    // }

    const defaultNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Del"]
    const [randomisedNumbers, setRandomisedNumbers]: any = useState([])
    const [auth, setAuth] = useState(true)
    const store = new Store(".pin.json")

    // Recursion to deal with misswapping
    const placeClearDelButtons = (array: any[]) => {
        let index = 0
        array.forEach(function (value) {
            if (value == "Clear") {
                if (array[9] == "Del") {
                    [array[index], array[9]] = [array[9], array[index]]
                    placeClearDelButtons(array)
                } else {
                    [array[index], array[9]] = [array[9], array[index]]
                }
            } else if (value == "Del") {
                if (array[11] == "Clear") {
                    [array[index], array[11]] = [array[11], array[index]]
                    placeClearDelButtons(array)
                } else {
                    [array[index], array[11]] = [array[11], array[index]]
                }
            }

            index++
        })
    }

    const randomise = (array: any[]) => {
        for (let i = 0; i < array.length; i++) {
            const j: any = Math.floor(Math.random() * (i + 1)) as Number
            [array[i], array[j]] = [array[j], array[i]]
        }

        placeClearDelButtons(array)

        return array
    }

    function randomiseButton() {
        setRandomisedNumbers(randomise(defaultNumbers))
        // setPin(defaultPin)
    }

    useEffect(() => {
        randomiseButton()
    }, [])

    return (
        <div className="container">

            {/* <Button variant="filled" onClick={() => randomiseButton()}>Randomise</Button>

            <SetPin store={store} />

            <PinPad randomisedNumbers={randomisedNumbers} setAuth={setAuth} store={store} /> */}


            {/* <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p> */}

            {!auth ?
                <>
                    <Button variant="filled" onClick={() => randomiseButton()}>Randomise</Button>

                    <SetPin store={store} />

                    <PinPad randomisedNumbers={randomisedNumbers} setAuth={setAuth} store={store} />

                    <Box bgcolor={'red'}>
                        NOT AUTH
                    </Box>

                    {}
                </>
                :
                // <Box bgcolor={'green'}>
                //     AUTH
                //     <Button onClick={() => setAuth(false)}>GO BACK</Button>
                // </Box>
                <Journal setAuth={setAuth} />
            }

        </div>
    )
}

export default App