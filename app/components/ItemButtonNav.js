"use client";
import React from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";

const ItemButtonNav = ({ children, onClick, linkTo="/" }) => {
  return (
    <Link href={linkTo}>
      <Button onClick={onClick} variant="contained">
        {children}
      </Button>
    </Link>
  );
};

export default ItemButtonNav;
