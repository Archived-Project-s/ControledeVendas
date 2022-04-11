interface Props{
    texto: string,
    onClick: () => void
}

export default (props: Props) => {

    return <button className="btn center" onClick={props.onClick}>
        {props.texto}
    </button>
}