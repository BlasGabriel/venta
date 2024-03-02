import { Button } from "@mui/material";
import React from "react";

const ButtonDE = ({ children, type = "button", onClick }) => {
  return (
    <>
      <Button type={type} onClick={onClick} variant="contained">
        {children}
      </Button>
    </>
  );
};

export default ButtonDE;
