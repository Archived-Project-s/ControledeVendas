import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close'

 interface Props {
    children: React.ReactNode,
    open: boolean,
    handleClose:()=> void
 }

export default (props: Props) => {
    return <div style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        position: "fixed",
        height: "600px",
        width: "400px",
        display: props.open? "flex":"none",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "5px",
        backgroundColor: "white",
    }}>
        <button style={{
       top: "15px",
       right: "15px",
       position: "absolute",
       width: "36px",
       height: "36px",
       border: "none",
       outline: "0",
       backgroundColor: "transparent",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       cursor: "pointer"
        }}
        onClick={props.handleClose}
        >        
        <CloseIcon/>        
        </button>
        {props.children}
    </div>
}