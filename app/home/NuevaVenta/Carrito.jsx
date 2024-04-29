import ButtonDE from '@/app/components/ButtonDE';
import BoxTable from '@/app/components/containers/BoxTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

const Carrito = ({ cart }) => {
    // Control de venta emergente
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submit");
        handleClose();
    };

    // Función para calcular el total
    const calcularTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.precio_venta_maximo * item.quantity;
        });
        return total;
    };

    return (
        <>
            <ButtonDE onClick={handleClickOpen}>Finalizar</ButtonDE>
            <Dialog
                style={{}}
                sx={{ bannerColor: "#2F528F" }}
                fullWidth
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Venta</DialogTitle>
                    <DialogContent>
                        <BoxTable>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item) => (
                                        <TableRow key={item.id_producto}>
                                            <TableCell>
                                                {item.descripcion} - Cantidad: {item.quantity}
                                            </TableCell>
                                            <TableCell>
                                                {item.precio_venta_maximo * item.quantity}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </BoxTable>

                        <DialogContent>
                            <strong>Total: {calcularTotal()}</strong>
                        </DialogContent>

                        <DialogActions>
                            <ButtonDE color="#e91d63" onClick={handleClose}>
                                Salir
                            </ButtonDE>
                            <ButtonDE type={"submit"} onClick={handleClose}>
                                Guardar
                            </ButtonDE>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}

export default Carrito;
