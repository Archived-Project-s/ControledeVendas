import { useEffect, useState } from "react"
import {loadClients, DeleteClient, EditClient, lerClientePorid, addClient,} from '../../api/controleDeVendas/index'
import Tabelas from "../../components/Datatable/index"
import { Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../components/Modal';
import AddIcon from '@mui/icons-material/Add';

import {errorToast, successToast} from '../../helpers/toasts';

interface Props{
    token: string
}

export default (props: Props) => {
const [nome, setNome] = useState("");
const [tratamento, setTratamento] = useState("");
const [telefone1, setTelefone1] = useState("");
const [telefone2, setTelefone2] = useState("");
const [email1, setEmail1] = useState("");
const [email2, setEmail2] = useState("");
const [observacoes, setObservacoes] = useState("");
const [foto, setFoto] = useState("");
const [status, setStatus] = useState("");

const [nomeEdit, setNomeEdit] = useState("");
const [tratamentoEdit, setTratamentoEdit] = useState("");
const [telefone1Edit, setTelefone1Edit] = useState("");
const [telefone2Edit, setTelefone2Edit] = useState("");
const [email1Edit, setEmail1Edit] = useState("");
const [email2Edit, setEmail2Edit] = useState("");
const [observacoesEdit, setObservacoesEdit] = useState("");
const [fotoEdit, setFotoEdit] = useState("");
const [statusEdit, setStatusEdit] = useState("");

const [editOpen, setEditOpen] = useState(false);

const [open, setOpen] = useState(false);
const [rows, setRows] = useState<any[]>([]);
const [id, setId] = useState(0)

const handleClick = () => {
    console.log(addClient(props.token, nome, tratamento,telefone1, telefone2,
        email1, email2, observacoes ,foto, status));
}

const handleEditClick = () => {
  const tryEdit = async () => {
    console.log(await EditClient(props.token, id,  nomeEdit, tratamentoEdit,telefone1Edit, telefone2Edit,
      email1Edit, email2Edit, observacoesEdit,fotoEdit, statusEdit))
  }
  tryEdit()
}
    useEffect(() => {
        const tryLoad = async () => {
            const salvaclientes = (await loadClients(props.token))
            console.log(salvaclientes?.data)
            var geraId = []
            for(let i = 0; i< salvaclientes?.data.length; i++){
                geraId.push(salvaclientes?.data[i])
                geraId[i].id = i;
            }

            setRows(geraId);
        }
        tryLoad()
    }, [])

    return <div className="page">
    <Button
        color='inherit'
        onClick={(event) => {
        setOpen(true);
        }}
        >
        <AddIcon/>
    </Button>
        <Tabelas 
        rows={rows}
        columns={[
            { field: 'codigo', headerName: 'Código', width: 60},
            { field: 'data', headerName: 'Data', width: 90, flex: 1},
            { field: 'email1', headerName: 'E-mail1', width: 90, flex: 1},
            { field: 'email2', headerName: 'E-mail2', width: 90, flex: 1},
            { field: 'foto', headerName: 'Foto', width: 90, flex: 1},
            { field: 'id', headerName: 'ID', width: 90, flex: 1},
            { field: 'nome', headerName: 'Nome', width: 90, flex: 1 },
            { field: 'observacoes', headerName: 'Observações', width: 90, flex: 1},
            { field: 'status', headerName: 'Status', width: 90, flex: 1 },
            { field: 'telefone1', headerName: 'Telefone1', width: 90, flex: 1},
            { field: 'telefone2', headerName: 'Telefone2', width: 90, flex: 1},
            { field: 'tratameno', headerName: 'Tratamento', width: 90, flex: 1},
            {
                field: "Edit",
                sortable: false,
                renderCell: (cellValues: any) => {
                  const tryEdit = async (id: number) => {
                    setId(id)
                    handleEditClick()
                  }
                  const onClickEdit = () =>{
                    tryEdit(cellValues.getValue(cellValues.id, 'codigo'))
                    setEditOpen(true)
                  }
                  return (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={onClickEdit}
                    >
                      <EditIcon/>
                    </Button>
                  );
                }
                },
                {
                  field: "Delete",
                  sortable: false,
                  renderCell: (cellValues: any) => {
                    const tryDelete = async (id: number) => {
                      const deletarVendas = (await DeleteClient(props.token, id))
                      if(deletarVendas?.data.error){
                        errorToast(deletarVendas.data.errorMsg)
                      }else{
                        successToast("Cliente deletado com sucesso!")
                    }
                  }
                    const onClickDelete = () =>{
                      tryDelete(cellValues.getValue(cellValues.id, 'codigo'))
                    }
                    return (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={onClickDelete}
                      >
                        <DeleteIcon/>
                      </Button>
                    );
                  }
            },
        ]}
        />
        <Modal
         handleClose={()=> setOpen(false)}
         open={open}
        >
         <label>Nome:</label><input onChange={(e) => setNome(e.target.value)}></input> 
         <label>Tratamento</label><input onChange={(e) => setTratamento(e.target.value)}></input>   
         <label>Telefone 1</label><input onChange={(e) => setTelefone1(e.target.value)}></input>   
         <label>Telefone 2</label><input onChange={(e) => setTelefone2(e.target.value)}></input>   
         <label>E-mail 1</label><input onChange={(e) => setEmail1(e.target.value)}></input> 
         <label>E-mail 2</label><input onChange={(e) => setEmail2(e.target.value)}></input> 
         <label>Observações</label><input onChange={(e) => setObservacoes(e.target.value)}></input>
         <label>Foto</label><input onChange={(e) => setFoto(e.target.value)}></input>     
         <label>Status</label><input onChange={(e) => setStatus(e.target.value)}></input>
         <button onClick={handleClick}>Enviar</button>
        </Modal>
        <Modal
         handleClose={()=> setEditOpen(false)}
         open={editOpen}
        >
         <label>Nome:</label><input onChange={(e) => setNomeEdit(e.target.value)}></input> 
         <label>Tratamento</label><input onChange={(e) => setTratamentoEdit(e.target.value)}></input>   
         <label>Telefone 1</label><input onChange={(e) => setTelefone1Edit(e.target.value)}></input>   
         <label>Telefone 2</label><input onChange={(e) => setTelefone2Edit(e.target.value)}></input>   
         <label>E-mail 1</label><input onChange={(e) => setEmail1Edit(e.target.value)}></input> 
         <label>E-mail 2</label><input onChange={(e) => setEmail2Edit(e.target.value)}></input> 
         <label>Observações</label><input onChange={(e) => setObservacoesEdit(e.target.value)}></input>
         <label>Foto</label><input onChange={(e) => setFotoEdit(e.target.value)}></input>     
         <label>Status</label><input onChange={(e) => setStatusEdit(e.target.value)}></input>
         <button onClick={handleEditClick}>Enviar</button>
        </Modal>
        </div>
}