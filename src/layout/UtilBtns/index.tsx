import { useState, useEffect } from "react"
import { WbSunny, Brightness4, ExitToApp } from "@material-ui/icons"
import { setNextTheme } from '../../helpers/themes'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/bearerToken'

interface Props{
    setDarkMode: (value: boolean) => void,
    onLogout: () => void
}

export default (props: Props) =>{
    const [dark, setDark] = useState(false)
    const [icon, setIcon] = useState(<WbSunny />)
    const dispatch = useDispatch()

    useEffect(() => {
        setIcon(dark ? <Brightness4 /> : <WbSunny />)
        props.setDarkMode(dark)
    }, [dark])

    const handleModeChange = () => {
        setDark(!dark)
        setNextTheme()
    }

    const handleLogout = () => {
        dispatch(logout())
        props.onLogout()
    }

    return <div className="util-btns">
        <button onClick={handleModeChange}>
            {icon}
        </button>
        <button onClick={handleLogout}>
            <ExitToApp />
        </button>
    </div>
}