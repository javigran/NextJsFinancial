import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

import PMT from '../utils/pmt';

const columns = [
    { id: 'id_credito', label: 'Id Credito' },
    {
      id: 'createdAt',
      label: 'Fecha Credito',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleDateString(),
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
        id: 'cuotas_pagar',
        label: 'Cuotas a pagar',
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
    function createData(id_credito,createdAt,id_inversionista,valor_inversion,cuota_mes,tasa,cuotas_pagar,proyection_total) {
        //const density = population / size;
        return {id_credito, createdAt,id_inversionista,valor_inversion,cuota_mes,tasa,cuotas_pagar,proyection_total};
    }
    
    function subtotal(items, param) {
      if(param === 1 ){
        return items.map(({ valor_inversion }) => valor_inversion).reduce((sum, i) => sum + i, 0);

      }
      else if(param===2){
        return items.map(({ cuota_mes }) => cuota_mes).reduce((sum, i) => sum + i, 0);

      }
      else if(param===3){
        return items.map(({ proyection_total }) => proyection_total).reduce((sum, i) => sum + i, 0);
  
      }

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
        let date_created = new Date(inv.attributes.credito.data.attributes.createdAt);
       // console.log(date_created.toLocaleDateString());
        let cuota_fija = parseFloat(PMT(inv.attributes.credito.data.attributes.tasa_mes_vcdo/100,inv.attributes.credito.data.attributes.cuotas_pagar,inv.attributes.credito.data.attributes.valor_prestamo).toFixed(0));
        rows.push(createData(inv.attributes.credito.data.id,date_created.toLocaleDateString(),inv.attributes.credito.data.attributes.id_inversionista, parseFloat(inv.attributes.valor_inversion),cuota_fija , parseFloat(inv.attributes.credito.data.attributes.tasa_mes_vcdo).toFixed(1),inv.attributes.credito.data.attributes.cuotas_pagar,  cuota_fija * inv.attributes.credito.data.attributes.cuotas_pagar))
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const total_valor_invs = subtotal(rows,1).toLocaleString('es-CO'); 
      const total_cuota_mes = subtotal(rows,2).toLocaleString('es-CO');
      const total_proyection = subtotal(rows,3).toLocaleString('es-CO');
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
                  <Link
                 href={{
              pathname: '/meinv/[id]',
              query: { id: row['id_credito'] },
            }}>
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
                  </Link>
                );
              })}
          
          <TableRow>
            <TableCell colSpan={3}  align="center">Total</TableCell>
            <TableCell align="right">{total_valor_invs}</TableCell>
            <TableCell align="right">{total_cuota_mes}</TableCell>
            <TableCell align="right"></TableCell>   
            <TableCell align="right"></TableCell>
            <TableCell align="right">{total_proyection}</TableCell>
          </TableRow>
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