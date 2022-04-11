import {Button} from './styles'

interface Props{
    selected: boolean,
    text: string,
    onClick: () => void
}

export default (props: Props) => {
    return <Button className={props.selected ? "selected" : ""} onClick={props.onClick}>
        {props.text}
    </Button>
}