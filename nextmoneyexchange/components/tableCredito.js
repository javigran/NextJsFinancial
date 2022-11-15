import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'no_cuota', label: '# Cuota' },
  { id: 'capital',
   label: 'Capital', 
   align:'right',
    minWidth: 170,
    format: (value) => value.toLocaleString('es-CO'),
  },
  {
    id: 'intereses',
    label: 'Intereses',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('es-CO'),
  },
  {
    id: 'total_cuota',
    label: 'Total Cuota',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('es-CO'),
  },
  {
    id: 'saldo_credito',
    label: 'Saldo Credito',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('es-CO'),
  },
];



/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function TableCredito({vp,cp,ir,cf}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  function createData(no_cuota, capital, intereses, total_cuota,saldo_credito) {
    //const density = population / size;
    return {no_cuota, capital, intereses, total_cuota,saldo_credito };
  }

  const rows = [createData(0,'','','', parseFloat(vp))];
  var intereses = vp * ir;
  var capital = cf - intereses; 
  var vp_updated = vp - capital;
  for (let index = 0; index < cp; index++) {
    rows.push(createData(index+1,capital,intereses,parseFloat(cf) , vp_updated)); 
    intereses = vp_updated * ir;
    capital = cf - intereses;
    vp_updated = vp_updated - capital;

  }

 
   
   /* createData('0',42525,13241713,cf, vp),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),*/
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
