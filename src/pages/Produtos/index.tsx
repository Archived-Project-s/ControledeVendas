import React, {useEffect, useState} from "react"
import Tabelas from "../../components/Datatable/index"
import {loadProducts, lerProdutoPorid, addProduto, EditProduto, DeleteProduto} from '../../api/controleDeVendas/index'
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
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [valorEdit, setValorEdit] = useState(0);
    const [descricaoEdit, setDescricaoEdit] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    
  const [id, setId] = useState(0)

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<any[]>([]);

    const handleClick = () => {
        console.log(addProduto(props.token, descricao, valor));
    }

    useEffect(() => {
        const tryLoad = async () => {
            const salvaclientes = (await loadProducts(props.token))
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
            console.log(await EditProduto(props.token, id, descricaoEdit, valorEdit))
          }
          tryEdit()
        }

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
            { field: 'codigo', headerName: 'Código', width: 90, flex: 1},
            { field: 'descricao', headerName: 'Descrição', width: 90, flex: 1},
            { field: 'id', headerName: 'ID', width: 90, flex: 1},
            { field: 'valor', headerName: 'Valor', width: 90, flex: 1 },
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
                      const deletarVendas = (await DeleteProduto(props.token, id))
                      if(deletarVendas?.data.error){
                        errorToast(deletarVendas.data.errorMsg)
                      }else{
                        successToast("Produto deletado com sucesso!")
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
         <label>Descrição: </label><input onChange={(e) => setDescricao(e.target.value)}></input> 
         <label>Valor: </label><input onChange={(e) => setValor(parseFloat(e.target.value))}></input>   
         <button onClick={handleClick}>Enviar</button>
        </Modal>
        <Modal
         handleClose={()=> setEditOpen(false)}
         open={editOpen}
        >
        <label>Descrição: </label><input onChange={(e) => setDescricaoEdit(e.target.value)}></input> 
         <label>Valor: </label><input onChange={(e) => setValorEdit(parseFloat(e.target.value))}></input>   
         <button onClick={handleEditClick}>Enviar</button>
        </Modal>
        </div>
}