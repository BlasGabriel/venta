import ButtonDE from '@/app/components/ButtonDE';
import BoxTable from '@/app/components/containers/BoxTable';
import { useUser } from '@/app/context/UserContext';
import { useVentas } from '@/app/context/VentasContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Carrito = ({ cart, cliente }) => {
    const { user } = useUser();
    const { insertarVenta } = useVentas();
    // Control de venta emergente
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = React.useState('');
    const [interes, setInteres] = useState('');
    const [cantidadPagos, setCantidadPagos] = useState('');

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
        // '0000-00-00 00:00:00'
        console.log(
            // data: 
            {
                id_cliente: cliente.id_cliente,
                fecha: calcularFecha(),
                fecha_anulacion: '0000-00-00 00:00:00',
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

        insertarVenta(
            {
                id_cliente: cliente.id_cliente,
                fecha_anulacion: calcularFecha(),
                fecha: 0,
                total: calcularTotal(),
                estado: 1,
                id_usuario: 1,
                // id_usuario: user.id_usuario,
                id_deposito: 1,
                tipo_operacion: tipoOperacion,
                descuento: 0,
                subtotal: calcularSubtotal(),
                total_iva: calcularTotalIva(),
                productos: cart,
                interes: interes,
                cantidadPagos: cantidadPagos

            })
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
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        const ano = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        if (dia < 10) {
            dia = '0' + dia;
        }

        if (mes < 10) {
            mes = '0' + mes;
        }

        if (hora < 10) {
            hora = '0' + hora;
        }

        if (minutos < 10) {
            minutos = '0' + minutos;
        }

        if (segundos < 10) {
            segundos = '0' + segundos;
        }

        return `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    }

    const handleInteresChange = (event) => {
        setInteres(event.target.value);
    };

    const handleCantidadPagosChange = (event) => {
        setCantidadPagos(event.target.value);
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
                    <DialogTitle>Cliente: {cliente.descripcion}</DialogTitle>
                    {/* <Typography variant="h5">Cliente: {cliente.descripcion}</Typography> */}

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
                                required
                            >
                                <MenuItem value="0">Contado</MenuItem>
                                <MenuItem value="1">Crédito</MenuItem>
                            </Select>
                        </FormControl>
                        {tipoOperacion == '1' && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Porcentaje de interés"
                                    type="number"
                                    value={interes}
                                    onChange={handleInteresChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Cantidad de pagos"
                                    type="number"
                                    value={cantidadPagos}
                                    onChange={handleCantidadPagosChange}
                                    required
                                />
                            </>
                        )}

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
                            <ButtonDE type={"submit"} >
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
