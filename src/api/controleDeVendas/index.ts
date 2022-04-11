import api from './axiosConfig'
import axios from 'axios'

/*export const login = (email: string, password: string) =>{
    return api.post('/usuarios/login',  {
        headers: {
            email: email,
            password: password
    }})
}*/

const baseUrl = 'https://localhost:44314/api'

const generateUrl = (endpoint: string) => {
    return baseUrl + endpoint
}

const load = (token: string, endpoint: string) => {
    return axios.get(generateUrl(endpoint),
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
            return null
        })
}

export const login = (email: string, password: string) => {
    return axios.post(generateUrl('/usuarios/login'), {}, {
        headers: {
            email: email,
            password: password
        }
    }).then((result) => {
        return result
    }).catch((err) => {
        console.log(err)
        return null
    })
}

export const loadUsers = (token: string) => {
    return load(token, '/usuarios')
}

export const loadClients = (token: string) => {
    return load(token, '/clientes')
}

export const loadProducts = (token: string) => {
    return load(token, '/produto')
}

export const loadSales = (token: string) => {
    return load(token, '/vendas')
}

/* export const addClient = (token: string, nome: string, tratamento: string,
    data: string, telefone1: string, telefone2: string,
    email1: string, email2: string, observacoes: string,
    foto: string, status: string) => {

    let cliente = {
        Nome: nome,
        Tratameno: tratamento,
        Telefone1: telefone1,
        Telefone2: telefone2,
        Email1: email1,
        Email2: email2,
        Observacoes: observacoes,
        Foto: foto,
        Status: status
    };
    return axios({
        method: "post",
        url: generateUrl('/clientes/adicionar'),
        data: cliente,
        headers: {
            "Authorization": 'Bearer ' + token
        }
    })
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
            return null
        })
}
 */
export const addClient = (token: string, nome: string, tratamento: string,
    telefone1: string, telefone2: string,
    email1: string, email2: string, observacoes: string,
    foto: string, status: string) => {

    let cliente = {
        nome: nome,
        tratameno: tratamento,
        telefone1: telefone1,
        telefone2: telefone2,
        email1: email1,
        email2: email2,
        observacoes: observacoes,
        foto: foto,
        status: status
    };
    return api.post('/clientes/adicionar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const addProduto = (token: string, descricao: string, valor: number) => {

    let cliente = {
        descricao,
        valor,
    };
   return api.post('/produto/cadastrar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const addVendas = (token: string, CodCli: number, NomeCli: string, tratamento: string,
    status: string, telefone1: string, telefone2: string,
    email1: string, email2: string, CodItem: number,
    descricaoItem: string, Valor: number, NumCompra: number, TotalItens: number, Observacoes: string,foto: string) => {

    let cliente = {
        CodCli, 
        NomeCli, 
        tratamento,
        status, 
        telefone1,
        telefone2,
        email1, 
        email2, 
        CodItem,
        descricaoItem, 
        Valor, 
        NumCompra, 
        TotalItens, 
        Observacoes,
        foto
    };
    return api.post('/vendas/cadastrar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const addUsuario = (token: string, email: string, senha: string) => {

    let cliente = {
        email,
        senha
    };
    return api.post('/usuarios/cadastrar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const lerClientePorid = (token: string, id: number) => {
    return axios.get(generateUrl('/clientes/cliente'),
        {
            headers: {
                Authorization: 'Bearer ' + token, id: id.toString()
            }
        }
    )
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
            return null
        })
}

export const lerProdutoPorid = (token: string, id: number) => {
    return axios.get(generateUrl('/produto/produto'),
        {
            headers: {
                Authorization: 'Bearer ' + token, id: id.toString()
            }
        }
    )
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
            return null
        })
}

export const lerVendasPorid = (token: string, id: number) => {
    return axios.get(generateUrl('/vendas/venda'),
        {
            headers: {
                Authorization: 'Bearer ' + token, id: id.toString()
            }
        }
    )
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
            return null
        })
}

export const EditUsuario = (token: string, id:number, email: string, senha: string) => {

    let cliente = {
        codigo: id,
        email,
        senha
    };
   return api.post('/usuarios/atualizar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const EditVendas = (token: string, id:number, CodCli: number, NomeCli: string, tratamento: string,
    status: string, telefone1: string, telefone2: string,
    email1: string, email2: string, CodItem: number,
    descricaoItem: string, Valor: number, NumCompra: number, TotalItens: number, Observacoes: string,foto: string) => {

    let cliente = {
        codigo: id,
        CodCli, 
        NomeCli, 
        tratamento,
        status, 
        telefone1,
        telefone2,
        email1, 
        email2, 
        CodItem,
        descricaoItem, 
        Valor, 
        NumCompra, 
        TotalItens, 
        Observacoes,
        foto
    };
    return api.post('/vendas/atualizar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const EditProduto = (token: string, id:number, descricao: string, valor: number) => {

    let cliente = {
        codigo: id,
        descricao,
        valor,
    };
    return api.post('/produto/atualizar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const EditClient = (token: string, id:number,  nome: string, tratamento: string,
    telefone1: string, telefone2: string,
    email1: string, email2: string, observacoes: string,
    foto: string, status: string) => {

    let cliente = {
        codigo: id,
        nome: nome,
        tratameno: tratamento,
        telefone1: telefone1,
        telefone2: telefone2,
        email1: email1,
        email2: email2,
        observacoes: observacoes,
        foto: foto,
        status: status
    };
    return api.post('/clientes/atualizar', cliente, {headers: {
        "Authorization": 'Bearer ' + token
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const DeleteUsuario = (token: string, id: number) => {

    let cliente = {
    };
    return api.post('/usuarios/deletar', cliente, {headers: {
        "Authorization": 'Bearer ' + token, id: id.toString()
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const DeleteVendas = (token: string, id: number) => {

    let cliente = {
    };
    return api.post('/vendas/deletar', cliente, {headers: {
        "Authorization": 'Bearer ' + token, id: id.toString()
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const DeleteProduto = (token: string, id: number) => {

    let cliente = {
    };
    return api.post('/produto/deletar', cliente, {headers: {
        "Authorization": 'Bearer ' + token, id: id.toString()
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}

export const DeleteClient = (token: string , id: number)=> {
    let cliente = {

    };
    return api.post('/clientes/deletar', cliente, {headers: {
        "Authorization": 'Bearer ' + token , id: id.toString()
    }})
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err)
            return null;
        })
}