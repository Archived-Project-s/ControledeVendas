import styled from "styled-components"

export const Button = styled.button`
    /*flexbox*/
    display: flex;
    justify-content: center;
    align-items: center;

    /*estilização*/
    border: none;
    outline: 0;
    height: 50px;
    margin: 20px 0;

    /*tipografia*/
    font-size: 1.5rem;
    color: var(--textcolor);

    /*outros*/
    cursor: pointer;

    &.selected{
        /*estilização*/
        background-color: var(--purple);

        /*tipografia*/
        color: white;
    }

    &:not(.selected):not(:hover){
        background-color: var(--backgroundcolor);
    }

`