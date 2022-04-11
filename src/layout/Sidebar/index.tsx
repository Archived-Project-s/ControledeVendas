import { useState } from 'react';
import dark from '../../assets/images/dark.png';
import light from '../../assets/images/light.png';
import Button from './Button';
import {Menu, Close} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

interface Props{
    darkmode: boolean
}

export default (props: Props) => {
    const buttons = ['Home', 'Clientes', 'Produtos', 'Vendas', 'Usuarios']
    const [selecionado, setSelecionado] = useState(0)
    const navigate = useNavigate()

    const setPagina = (novo: number) =>{
        setSelecionado(novo)
        navigate(buttons[novo].toLowerCase())
    }

    return <>
        <label htmlFor="sidebarBtn">
            <Menu />
        </label>
        <input type="checkbox" id="sidebarBtn" name="sidebar"></input>
        <aside className="sidebar main-background">
            <div className="img-container">
                <img src={props.darkmode ? dark : light} />
            </div>
            {buttons.map((item, index) => {
                return <Button key={index} text={item} selected={index == selecionado} onClick={() => setPagina(index)}/>
            })}
        </aside>
        <button className="dismiss-sidebar" onClick={() => {(document.getElementById('sidebarBtn') as any).checked = false}}>
            <Close />
        </button>
    </>
}