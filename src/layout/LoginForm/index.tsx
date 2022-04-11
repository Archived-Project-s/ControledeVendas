import {Form} from './styles'
import {Person, LockOpen} from '@material-ui/icons'
import {login} from '../../api/controleDeVendas/index'
import {errorToast, successToast} from '../../helpers/toasts'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {login as setBearerToken} from '../../store/bearerToken'

interface Props{
    onLogin: () => void,
    setToken: (token: string) => void
}

export default (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = () => {
        const tryLogin = async () => {
            const response = await login(email, password)
            if(response == null){
                errorToast("Ocorreu um erro inesperado, tente novamente mais tarde")
            }else if(response?.data.error){
                errorToast(response?.data.errorMsg)
            }else{
                successToast("Login efetuado com sucesso!")
                props.setToken(response.data.data)
                props.onLogin()
            }
        }
        tryLogin()
    }

    return <Form>
        <div className="formInput">
              <div className="inputIcon">
                    <Person />
                </div>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="formInput">
            <div className="inputIcon">
                <LockOpen />
            </div>
            <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Logar</button>
    </Form>
}