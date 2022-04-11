import {useEffect, useState} from 'react'
import Tabelas from "../../components/Datatable/index"
import {loadUsers, addUsuario, DeleteUsuario, EditUsuario} from '../../api/controleDeVendas/index'
import { Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/Modal';
import Modal2 from '../../components/Modal2'
import Modal3 from '../../components/Modal3'
import {Modal4} from '../../components/Modal4'

import {errorToast, successToast} from '../../helpers/toasts';

interface Props{
    token: string
}

const handleEditClick = (event:any , cellValues:any ) => {
    console.log(cellValues.row);
  };
  const handleDeleteClick = (event:any , cellValues:any ) => {
    console.log(cellValues.row);
  };

export default (props: Props) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [senhaEdit, setSenhaEdit] = useState("");

  const [id, setId] = useState(0)

    const [rows, setRows] = useState<any[]>([]);
    const [editOpen, setEditOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      console.log(addUsuario(props.token, email, senha));
  }

    useEffect(() => {
        const tryLoad = async () => {
            const salvaclientes = (await loadUsers(props.token))
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

    const handleEditClick = () => {
      const tryEdit = async () => {
        console.log(await EditUsuario(props.token, id, emailEdit, senhaEdit))
      }
      tryEdit()
    }

    return <div className="page">
              <Modal2></Modal2>
              <Modal3
              
              ></Modal3>
              <Modal4></Modal4>
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
            { field: 'codigo', headerName: 'Código', width: 90, flex: 1},
            { field: 'email', headerName: 'E-mail', width: 90, flex: 1},
            { field: 'id', headerName: 'ID', width: 90, flex: 1},
            { field: 'senha', headerName: 'Senha', width: 90, flex: 1 },
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
                      const deletarVendas = (await DeleteUsuario(props.token, id))
                      if(deletarVendas?.data.error){
                        errorToast(deletarVendas.data.errorMsg)
                      }else{
                        successToast("Usuario deletado com sucesso!")
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
    <label>Email:</label><input onChange={(e) => setEmail(e.target.value)}></input> 
    <label>Senha:</label><input onChange={(e) => setSenha(e.target.value)}></input>  
    
    <button onClick={handleClick}>Enviar</button>
   </Modal>
        <Modal
         handleClose={()=> setEditOpen(false)}
         open={editOpen}
        >
        <label>Email:</label><input onChange={(e) => setEmailEdit(e.target.value)}></input> 
        <label>Senha:</label><input onChange={(e) => setSenhaEdit(e.target.value)}></input>  
        
        <button onClick={handleEditClick}>Enviar</button>
        </Modal>
    </div>
}