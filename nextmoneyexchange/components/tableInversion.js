import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PMT from '../utils/pmt';

const columns = [
    { id: 'id_inversion', label: 'Id Inversion' },
    {
      id: 'createdAt',
      label: 'Fecha Credito',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('es-CO'),
    },

    {
        id: 'id_inversionista',
        label: 'CC Inversionista',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },

      {
        id: 'valor_inversion',
        label: 'Valor Inversión',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },
      {
        id: 'cuota_mes',
        label: 'Cuota Fija Mensual',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },
      {
        id: 'tasa',
        label: 'Tasa (Mes Vencido)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },
      {
        id: 'garantia',
        label: 'Garantia',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },
      {
        id: 'proyection_total',
        label: 'Proyección Total Recaudado',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('es-CO'),
      },

  ];
  
export default function TableInversion({data}) {
  //  console.log("iNVERISONES EN TABLA" + JSON.stringify(data));
  //  console.log("Inversion 0 " + JSON.stringify(data.inversions[0]));
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    function createData(id_inversion,createdAt,id_inversionista,valor_inversion,cuota_mes,tasa,garantia) {
        //const density = population / size;
        return {id_inversion, createdAt,id_inversionista,valor_inversion,cuota_mes,tasa,garantia};
    }

    // var intereses =  vp * ir;
    // var capital = cf - intereses; 
    // var vp_updated = vp - capital;
    // for (let index = 0; index < cp; index++) {

    //   intereses = vp_updated * ir;
    //   capital = cf - intereses;
    //   vp_updated = vp_updated - capital;
  
    // }
    
    const rows = [];
    data.forEach(inv => {

        console.log(inv.attributes.credito);
        rows.push(createData(inv.id,inv.attributes.credito.data.attributes.createdAt,inv.attributes.credito.data.attributes.id_inversionista, parseFloat(inv.attributes.valor_inversion), parseFloat(PMT(inv.attributes.credito.data.attributes.tasa_mes_vcdo/100,inv.attributes.credito.data.attributes.cuotas_pagar,inv.attributes.credito.data.attributes.valor_prestamo).toFixed(0)), parseFloat(inv.attributes.credito.data.attributes.tasa_mes_vcdo).toFixed(1),inv.attributes.credito.data.attributes.tipo_garantia))
    });
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


        
};

export async function getStaticProps(context) {
    // const res = await fetch(`https://...`)
     const data = {}
   
     if (!data) {
       return {
         redirect: {
           destination: '/',
           permanent: false,
           // statusCode: 301
         },
       }
     }
   
     return {
       props: { data }, // will be passed to the page component as props
     }
   }