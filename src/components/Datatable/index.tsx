import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { DataGrid,
        GridColDef, 
        GridValueGetterParams, 
        GridToolbar, 
        GridToolbarContainer,
        GridToolbarColumnsButton,
        GridToolbarFilterButton,
        GridToolbarExport,
        GridToolbarDensitySelector,
        useGridApiContext, 
        useGridState 
       } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { bgBG as coreBgBG } from '@mui/material/locale';
import { Button, Link } from "@material-ui/core";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from 'react-select'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import withReactContent from "sweetalert2-react-content";
import React from 'react';

interface Props {
  rows: any[],
  columns: any[]
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
 
const modalCompras = async () => {
  await Swal.fire({
        title: 'Multiple inputs',
        html:<Select  onChange={(e) => console.log(e)} isMulti={true} options={options} />,
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById('swal-input1') as any).value,
            (document.getElementById('swal-input2') as any).value
          ]
        }
      })
  }

const modaledit = async () => {
await Swal.fire({
      title: 'Editar Produtos',
      html:
        '<label>Produto:</label><input id="swal-input1" class="swal2-input">' +
        '<label>Status</label><input onChange={(e) => setStatus(e.target.value)}></input>' ,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as any).value,
          (document.getElementById('swal-input2') as any).value
        ]
      }
    })
}

const modaldelete = async () => {

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
})

swalWithBootstrapButtons.fire({
  title: 'Tem certeza?',
  text: "Você não será capaz de desfazer isso!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sim, Deletar!',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Não, Cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Deletado!',
      'Produto deletado com sucesso!.',
      'success'
    )
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelado',
      'seu Produto está seguro :)',
      'error'
    )
  }
})
}

const handleEditClick = (event:any , cellValues:any ) => {
  console.log(cellValues.row);
  modaledit();
};
const handleDeleteClick = (event:any , cellValues:any ) => {
  console.log(cellValues.row);
  modaldelete();
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: "Edit",
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="success"
          onClick={(event) => {
            handleEditClick(event, cellValues);
          }}
        >
          <EditIcon/>
        </Button>
      );
    }
    },
    {
      field: "Delete",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={(event) => {
              handleDeleteClick(event, cellValues);
            }}
          >
            <DeleteIcon/>
          </Button>
        );
      }
      },
      {
        field: "Info",
        sortable: false,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="warning"
              onClick={(event) => {
                handleDeleteClick(event, cellValues);
              }}
            >
              <InfoIcon/>
            </Button>
          );
        }
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 13 },
  { id: 6, lastName: 'Melisandre', firstName: 'null', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page + 1}
      count={state.pagination.pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

function CustomToolbar(onClick: () => void) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Tabelas(props: Props) {
    const [state, setstate] = useState(null);
    useEffect(() => {
      console.log(state)
    }, [state])

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      {...data}
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        localeText={{
            // Root
  noRowsLabel: 'Nenhuma linha',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',
  errorOverlayDefaultLabel: 'Ocorreu um erro.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Exibir seletor de colunas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Exibir filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Exibir filtros',
  toolbarFiltersTooltipActive: (count) =>
    `${count} ${count !== 1 ? 'filtros' : 'filtro'} ${count !== 1 ? 'ativos' : 'ativo'}`,

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar como CSV',
  toolbarExportPrint: 'Print',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Localizar coluna',
  columnsPanelTextFieldPlaceholder: 'Título da coluna',
  columnsPanelDragIconLabel: 'Reordenar Coluna',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelHideAllButton: 'Ocultar todas',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelDeleteIconLabel: 'Excluir',
  filterPanelOperators: 'Operadores',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Filtrar valor',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'é igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'após',
  filterOperatorOnOrAfter: 'em ou após',
  filterOperatorBefore: 'antes de',
  filterOperatorOnOrBefore: 'em ou antes de',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Exibir colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Desfazer ordenação',
  columnMenuSortAsc: 'Ordenar do menor para o maior',
  columnMenuSortDesc: 'Ordenar do maior para o menor',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    `${count} ${count !== 1 ? 'filtros' : 'filtro'} ${count !== 1 ? 'ativos' : 'ativo'}`,
  columnHeaderFiltersLabel: 'Exibir Filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total rows footer text
  footerTotalRows: 'Total de linhas:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleção',

  // Boolean cell text
  booleanCellTrueLabel: 'sim',
  booleanCellFalseLabel: 'não',

  // Actions cell more text
  actionsCellMore: 'mais',

  // Tree Data
  // treeDataGroupingHeaderName: 'Group',
  // treeDataExpand: 'see children',
  // treeDataCollapse: 'hide children',
 }} 
        components={{
          Pagination: CustomPagination,
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

