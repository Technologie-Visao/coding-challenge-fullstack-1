import React from "react";
import {TextField} from "@material-ui/core";


type CustomTextFieldProps = {
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CustomTextField = (props: CustomTextFieldProps) => {
    return (
        <TextField
            onChange={props.changeHandler}
            variant={"outlined"}
            inputProps={{ style: { color: "white", width:"200px", border:"white" } }}
            placeholder={"Input texture"}
        />
    );
}

export default CustomTextField