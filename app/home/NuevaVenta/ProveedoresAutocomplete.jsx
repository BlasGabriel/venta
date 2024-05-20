import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
// import { useProveedores } from '@/context/ProveedoresContext';
import { useClientes } from '@/app/context/ClientesContext';

// const ProveedoresOptions = [
//     { id_Proveedores: 1, Proveedores: 'Caja' },
//     { id_Proveedores: 2, Proveedores: 'Cuenta Corriente' }
// ];

const ProveedoresAutocomplete = ({ onProveedoresChange }) => {
    const [selectedProveedores, setSelectedProveedores] = useState(null);
    const { getClientes,
        clientes
    } = useClientes();

    useEffect(() => {
        getClientes();
    }, []);
    useEffect(() => {
        console.log(clientes)
    }, [clientes]);

    const handleChangeProveedores = (event, newValue) => {
        setSelectedProveedores(newValue);
        if (onProveedoresChange) {
            onProveedoresChange(newValue ? newValue : null);
            // onProveedoresChange(newValue ? newValue.id_proveedor : null);
        }
    };

    // useEffect(() => {
    //     console.log(selectedProveedores);
    // }, [selectedProveedores]);

    return (
        <Autocomplete
            options={clientes}
            required
            getOptionLabel={(option) => option.descripcion}
            value={selectedProveedores}
            onChange={handleChangeProveedores}
            renderInput={(params) => <TextField {...params} label="Proveedor" variant="outlined" />}
        />
    );
};

export default ProveedoresAutocomplete;
