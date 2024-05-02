import ButtonDE from '@/app/components/ButtonDE';
import BoxTable from '@/app/components/containers/BoxTable';
import { useUser } from '@/app/context/UserContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

const Carrito = ({ cart, cliente }) => {
    const { user } = useUser();
    // Control de venta emergente
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = React.useState('');

    const handleChange = (event) => {
        setTipoOperacion(event.target.value);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submit");
        // console.log(cart);
        // console.log(cliente);
        // 1234567
        // console.log(cliente);
        console.log(
            // data: 
            {
                id_cliente: cliente.id_cliente,
                fecha: calcularFecha(),
                total: calcularTotal(),
                estado: 1,
                id_usuario: user.id_usuario,
                id_deposito: 1,
                tipo_operacion: tipoOperacion,
                descuento: 0,
                subtotal: calcularSubtotal(),
                total_iva: calcularTotalIva(),
                productos: cart
            }
        );
        handleClose();
    };

    // Función para calcular el total
    const calcularTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.precio_venta_maximo * item.quantity + (item.porcentaje_iva * item.precio_venta_maximo * item.quantity / 100);;
        });
        return total;
    };

    // Función para calcular el subtotal
    const calcularSubtotal = () => {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.precio_venta_maximo * item.quantity;
        });
        return subtotal;
    }

    //Función para calcular total iva
    const calcularTotalIva = () => {
        let totalIva = 0;
        cart.forEach(item => {
            totalIva += item.porcentaje_iva * item.precio_venta_maximo * item.quantity / 100;
        });
        return totalIva;
    }
    // function calcular fecha
    const calcularFecha = () => {
        const fecha = new Date();
        let dia = fecha.getDate(); // Cambiar a let
        let mes = fecha.getMonth() + 1; // Cambiar a let
        const ano = fecha.getFullYear();
        
        if (dia < 10) {
            dia = '0' + dia;
        }
    
        if (mes < 10) {
            mes = '0' + mes;
        }
    
        return `${ano}-${mes}-${dia}`;
    }
    

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
                        {/* tipo_operacion */}
                        <FormControl fullWidth>
                            <InputLabel id="tipo_operacion_label">Tipo de operación</InputLabel>
                            <Select
                                labelId="tipo_operacion_label"
                                id="tipo_operacion"
                                value={tipoOperacion}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="contado">Contado</MenuItem>
                                <MenuItem value="credito">Crédito</MenuItem>
                            </Select>
                        </FormControl>
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
