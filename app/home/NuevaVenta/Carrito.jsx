import ButtonDE from '@/app/components/ButtonDE';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

const Carrito = ({cart}) => {
    //Contro de venta emergente
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

export default Carrito