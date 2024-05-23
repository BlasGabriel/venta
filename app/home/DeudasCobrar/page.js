"use client";
import React, { useEffect, useState } from "react";
import { useDeudasCobrar } from "@/app/context/DeudasCobrarContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  TablePagination,
  InputAdornment,
  Box,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import ButtonDE from "@/app/components/ButtonDE";
import BoxTable from "@/app/components/containers/BoxTable";
import SearchIcon from "@mui/icons-material/Search";
import Deudas from "./Deudas";

function Page() {
  const { deudas, loading, getDeudas } = useDeudasCobrar();

  const refreshDeudas = async () => {
    await getDeudas();
  };

  useEffect(() => {
    // Llama a getDeudasCobrar cuando el componente se monta
    const fetchData = async () => {
      await getDeudas();
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Registra las deudas en la consola cuando cambian
    console.log("Deudas:", deudas);
  }, [deudas]);

  // Control de cantidad de items moviles
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(0);
  };

  const filteredDeudas = deudas.filter((deuda) =>
    filter !== null ? deuda.pagos_completados === filter : true
  );

  const paginatedItem = filteredDeudas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (!paginatedItem) {
    return <div>Cargando productos...</div>;
  }

  // Control del modal
  const [open, setOpen] = useState(false);

  const [selectedItemCobro, setSelectedItemCobro] = useState([]);

  const handleOpen = (itemCobro) => {
    setSelectedItemCobro(itemCobro);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemCobro([]);
  };

  return (
    <div>
      <h1>Deudas a Cobrar</h1>

      <Box display="flex" flexDirection="row" mb={2}>
        <Button variant="contained" onClick={() => handleFilterChange(0)}>
          Pagos Incompletos
        </Button>
        <Button variant="contained" onClick={() => handleFilterChange(1)}>
          Pagos Completados
        </Button>
        <Button variant="contained" onClick={() => handleFilterChange(null)}>
          Todos
        </Button>
      </Box>

      <Box display="flex" flexDirection="row">
        <BoxTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell align="right">RUC</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItem.map((deudas) => (
                <TableRow key={deudas.id_venta}>
                  <TableCell component="th" scope="row">
                    {deudas.cliente.descripcion}
                  </TableCell>
                  <TableCell align="right">${deudas.cliente.ruc}</TableCell>
                  <TableCell>{deudas.monto}</TableCell>
                  <TableCell>
                    {(deudas.pagos_completados == 0) ? ( <ButtonDE linkTo={`/home/Pagos/${deudas.id_venta}`} children={"PAGOS"} onClick={() => handleOpen(deudas.item_cobro)} />) : "COBRADO" }
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredDeudas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </BoxTable>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles de Deudas</DialogTitle>
        <DialogContent>
          <Deudas itemCobro={selectedItemCobro} onCobrar={refreshDeudas} onClose={handleClose} />
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Page;
