import { ReactNode } from "react"

interface Props{
    texto: string,
    icon: ReactNode
}

export default (props: Props) => {
    return <div className="card">
        <div className="icon-container center">
            {props.icon}
        </div>
        <span>{props.texto}</span>
    </div>
}