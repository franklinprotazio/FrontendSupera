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
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');
  const [textField3, setTextField3] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transferencias, setTransferencias] = useState<Transferencia[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL+'/v1/transferencia');
      console.log(response.data)
      setTransferencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL+`/v1/transferencia?nome=${textField1}`);
      console.log(response.data)
      setTransferencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Data de início"
            variant="outlined"
            value={textField1}
            onChange={(e) => setTextField1(e.target.value)}
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Data de Fim"
            variant="outlined"
            value={textField2}
            onChange={(e) => setTextField2(e.target.value)}
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Nome do operador transacionado"
            variant="outlined"
            value={textField3}
            onChange={(e) => setTextField3(e.target.value)}
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
  {transferencias?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transferencia) => (
    <TableRow key={transferencia.id}>
      <TableCell>{transferencia.dataTransferencia}</TableCell>
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
