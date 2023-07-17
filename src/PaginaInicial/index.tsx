import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  makeStyles,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,

} from '@material-ui/core';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';



const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  textField: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
});

interface Transferencia {
  id: number;
  dataTransferencia: string;
  valor: number;
  tipo: string;
  nomeOperadorTransacao: string;
}


function PaginaInicial() {
  const classes = useStyles();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nome, setNome] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transferencias, setTransferencias] = useState<Transferencia[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + '/v1/transferencia');
      console.log(response.data)
      setTransferencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL + `/v1/transferencia?dataInicio=${dataInicio}&dataFim=${dataFim}&nome=${nome}`);
      console.log(response.data)
      setTransferencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleDataInicioChange = (date: Date | null) => {
    const adjustedDate = date ? new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000) : null;
    setDataInicio(adjustedDate ? adjustedDate.toISOString().slice(0, 10) : '');
  };

  const handleDataFimChange = (date: Date | null) => {
    const adjustedDate = date ? new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000) : null;
    setDataFim(adjustedDate ? adjustedDate.toISOString().slice(0, 10) : '');
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems="center">
        
        
      <Grid item xs={3}>
        <DatePicker
          selected={dataInicio !== '' ? new Date(dataInicio) : null}
          onChange={handleDataInicioChange}
          className={classes.textField}
          dateFormat="dd/MM/yyyy" // Formato de exibição da data
          locale={pt}
        />
      </Grid>

      <Grid item xs={3}>
        <DatePicker
          selected={dataFim !== '' ? new Date(dataFim) : null}
          onChange={handleDataFimChange}
          className={classes.textField}
          dateFormat="dd/MM/yyyy" // Formato de exibição da data
          locale={pt}
        />
      </Grid>



        <Grid item xs={3}>
          <TextField
            label="Nome do Operador"
            variant="outlined"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className={classes.button}
            fullWidth
          >
            Pesquisar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data Transferencia</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Nome Operador</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(transferencias) && transferencias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transferencia) => (
                <TableRow key={transferencia.id}>
                  <TableCell>{format(new Date(transferencia.dataTransferencia), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{transferencia.valor}</TableCell>
                  <TableCell>{transferencia.tipo}</TableCell>
                  <TableCell>{transferencia.nomeOperadorTransacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transferencias.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default PaginaInicial;
