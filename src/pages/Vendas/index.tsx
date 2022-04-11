import {useEffect, useState} from 'react'
import {loadSales, addVendas, EditVendas, DeleteVendas, lerVendasPorid} from '../../api/controleDeVendas/index'
import Tabelas from "../../components/Datatable/index"
import { Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../components/Modal';
import AddIcon from '@mui/icons-material/Add';
import {errorToast, successToast} from '../../helpers/toasts';
import {useNavigate} from 'react-router-dom'

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
        const navigate = useNavigate()
        const [codCli, setCodCli] = useState(0);
        const [codItem, setCodItem] = useState(0);
        const [nomeCli, setNomeCli] = useState("");
        const [tratamento, setTratamento] = useState("");
        const [telefone1, setTelefone1] = useState("");
        const [telefone2, setTelefone2] = useState("");
        const [email1, setEmail1] = useState("");
        const [email2, setEmail2] = useState("");
        const [descricaoItem, setDescricaoItem] = useState("");
        const [status, setStatus] = useState("");
        const [valor, setValor] = useState(0);
        const [numCompra, setNumCompra] = useState(0);
        const [totalItens, setTotalItens] = useState(0);
        const [observacoes, setObservacoes] = useState("");
        const [foto, setFoto] = useState("");

        const [codCliEdit, setCodCliEdit] = useState(0);
        const [codItemEdit, setCodItemEdit] = useState(0);
        const [nomeCliEdit, setNomeCliEdit] = useState("");
        const [tratamentoEdit, setTratamentoEdit] = useState("");
        const [telefone1Edit, setTelefone1Edit] = useState("");
        const [telefone2Edit, setTelefone2Edit] = useState("");
        const [email1Edit, setEmail1Edit] = useState("");
        const [email2Edit, setEmail2Edit] = useState("");
        const [descricaoItemEdit, setDescricaoItemEdit] = useState("");
        const [statusEdit, setStatusEdit] = useState("");
        const [valorEdit, setValorEdit] = useState(0);
        const [numCompraEdit, setNumCompraEdit] = useState(0);
        const [totalItensEdit, setTotalItensEdit] = useState(0);
        const [observacoesEdit, setObservacoesEdit] = useState("");
        const [fotoEdit, setFotoEdit] = useState("");
        
        const [id, setId] = useState(0)

        const [open, setOpen] = useState(false);
        const [rows, setRows] = useState<any[]>([]);
        const [editOpen, setEditOpen] = useState(false);

        useEffect(() => {
          if(sessionStorage.getItem('token') == null){
            navigate('/')
          }
        }, [])

        const handleClick = () => {
            console.log(addVendas(props.token, codCli, nomeCli, tratamento,
                status, telefone1, telefone2,
                email1, email2, codItem,
                descricaoItem, valor, numCompra, totalItens, observacoes,foto));
        }

        const handleEditClick = () => {
          const tryEdit = async () => {
            console.log(await EditVendas(props.token, id, codCliEdit,
               nomeCliEdit, tratamentoEdit, statusEdit, telefone1Edit, 
               telefone2Edit, email1Edit, email2Edit, codItemEdit,
                descricaoItemEdit, valorEdit, numCompraEdit, totalItensEdit, 
                observacoesEdit, fotoEdit))
          }
          tryEdit()
        }

    useEffect(() => {
        const tryLoad = async () => {
            const salvaclientes = (await loadSales(props.token))
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
            { field: 'codCli', headerName: 'Código Clientes', width: 60},
            { field: 'codItem', headerName: 'Código Itens', width: 60},
            { field: 'codigo', headerName: 'Código', width: 60},
            { field: 'dataCompra', headerName: 'Data Compra', width: 90, flex: 1},
            { field: 'email1', headerName: 'E-mail1', width: 90, flex: 1},
            { field: 'email2', headerName: 'E-mail2', width: 90, flex: 1},
            { field: 'foto', headerName: 'Foto', width: 90, flex: 1},
            { field: 'id', headerName: 'ID', width: 90, flex: 1},
            { field: 'nomeCli', headerName: 'Nome Cliente', width: 90, flex: 1 },
            { field: 'numCompra', headerName: 'Nº Compra', width: 90, flex: 1},
            { field: 'observacoes', headerName: 'Observações', width: 90, flex: 1},
            { field: 'status', headerName: 'Status', width: 90, flex: 1 },
            { field: 'telefone1', headerName: 'Telefone1', width: 90, flex: 1},
            { field: 'telefone2', headerName: 'Telefone2', width: 90, flex: 1},
            { field: 'totalItens', headerName: 'Total de Itens', width: 90, flex: 1},
            { field: 'valor', headerName: 'Valor', width: 90, flex: 1},
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
                      const deletarVendas = (await DeleteVendas(props.token, id))
                      if(deletarVendas?.data.error){
                        errorToast(deletarVendas.data.errorMsg)
                      }else{
                        successToast("Venda deletada com sucesso!")
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
         <label>Codigo Cliente:</label><input onChange={(e) => setCodCli(parseFloat(e.target.value))}></input> 
         <label>Nome Cliente:</label><input onChange={(e) => setNomeCli(e.target.value)}></input>
         <label>Tratamento</label><input onChange={(e) => setTratamento(e.target.value)}></input>   
         <label>Status</label><input onChange={(e) => setStatus(e.target.value)}></input>
         <label>Telefone 1</label><input onChange={(e) => setTelefone1(e.target.value)}></input>   
         <label>Telefone 2</label><input onChange={(e) => setTelefone2(e.target.value)}></input>  
         <label>E-mail 1</label><input onChange={(e) => setEmail1(e.target.value)}></input> 
         <label>E-mail 2</label><input onChange={(e) => setEmail2(e.target.value)}></input> 
         <label>Codigo Item:</label><input onChange={(e) => setCodItem(parseFloat(e.target.value))}></input> 
         <label>Descrição Item</label><input onChange={(e) => setDescricaoItem(e.target.value)}></input>
         <label>Valor</label><input onChange={(e) => setValor(parseFloat(e.target.value))}></input>  
         <label>numCompra</label><input onChange={(e) => setNumCompra(parseFloat(e.target.value))}></input>  
         <label>TotalItens</label><input onChange={(e) => setTotalItens(parseFloat(e.target.value))}></input>  
         <label>Observações</label><input onChange={(e) => setObservacoes(e.target.value)}></input>  
         <label>Foto</label><input onChange={(e) => setFoto(e.target.value)}></input>     
         
         <button onClick={handleClick}>Enviar</button>
        </Modal>
        <Modal
         handleClose={()=> setEditOpen(false)}
         open={editOpen}
        >     
        <label>Codigo Cliente:</label><input onChange={(e) => setCodCliEdit(parseFloat(e.target.value))}></input> 
        <label>Nome Cliente:</label><input onChange={(e) => setNomeCliEdit(e.target.value)}></input>
        <label>Tratamento</label><input onChange={(e) => setTratamentoEdit(e.target.value)}></input>   
        <label>Status</label><input onChange={(e) => setStatusEdit(e.target.value)}></input>
        <label>Telefone 1</label><input onChange={(e) => setTelefone1Edit(e.target.value)}></input>   
        <label>Telefone 2</label><input onChange={(e) => setTelefone2Edit(e.target.value)}></input>  
        <label>E-mail 1</label><input onChange={(e) => setEmail1Edit(e.target.value)}></input> 
        <label>E-mail 2</label><input onChange={(e) => setEmail2Edit(e.target.value)}></input> 
        <label>Codigo Item:</label><input onChange={(e) => setCodItemEdit(parseFloat(e.target.value))}></input> 
        <label>Descrição Item</label><input onChange={(e) => setDescricaoItemEdit(e.target.value)}></input>
        <label>Valor</label><input onChange={(e) => setValorEdit(parseFloat(e.target.value))}></input>  
        <label>numCompra</label><input onChange={(e) => setNumCompraEdit(parseFloat(e.target.value))}></input>  
        <label>TotalItens</label><input onChange={(e) => setTotalItensEdit(parseFloat(e.target.value))}></input>  
        <label>Observações</label><input onChange={(e) => setObservacoesEdit(e.target.value)}></input>  
        <label>Foto</label><input onChange={(e) => setFotoEdit(e.target.value)}></input>     
        
        <button onClick={handleEditClick}>Enviar</button></Modal>
    </div>
}