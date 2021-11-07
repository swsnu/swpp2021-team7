import { Grid } from "@mui/material";
import React from "react";

const CustomGridRow = ({components}) => {
    const col = Math.floor(12/components.length);

    return <Grid container spacing={1} justifyContent="center" alignItems="center">
        {components.map((Component, index) => {
            return <Grid item xs={col} key={index}>
                {Component}
            </Grid>
        })}
    </Grid>
}

export default CustomGridRow;