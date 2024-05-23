import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from "@mui/material";
import ButtonDE from "@/app/components/ButtonDE";
import BoxTable from "@/app/components/containers/BoxTable";
import { useDeudasCobrar } from "@/app/context/DeudasCobrarContext";

const Deudas = ({ itemCobro, onCobrar, onClose }) => {
  const { cobrarDeuda, getDeudas } = useDeudasCobrar();

  const handleCobrar = async (id) => {
    await cobrarDeuda(id);
    await getDeudas();
    onClose(); // Llamar a handleClose después de cobrar la deuda
  };

  return (
    <div>
      <Box display="flex" flexDirection="row">
        <BoxTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Monto Real</TableCell>
                <TableCell align="right">Monto Nominal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemCobro.map((item) => (
                <TableRow key={item.id_item_cobro}>
                  <TableCell component="th" scope="row">
                    {item.monto_real}
                  </TableCell>
                  <TableCell align="right">${item.monto_nominal}</TableCell>
                  <TableCell>
                    {item.es_cobrado == 0 ? (
                      <ButtonDE
                        onClick={() => handleCobrar(item.id_item_cobro)}
                        children={"Pagar"}
                      />
                    ) : (
                      "Cobrado"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BoxTable>
      </Box>
    </div>
  );
};

export default Deudas;
