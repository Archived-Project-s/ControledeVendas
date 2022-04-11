import styled from 'styled-components'

export const Form = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    z-index: 2;

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #2c3338;

    & > .formInput{
        width: 320px;
        height: 53px;
        margin: 10px;
        display: flex;
    }

    & > .formInput > input{
        height: 100%;
        width: calc(100% - 53px);
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        background-color: #3b4148;
        border: none;
        outline: 0;
        padding: 1rem;
        color: white;
    }

    & > .formInput > .inputIcon{
        background-color: #363b41;
        width: 53px;
        height: 53px;
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > .formInput > .inputIcon > svg{
        fill: #606468;
        transform: scale(1.5);
    }

    & > button{
        background-color: #ea4c88;
        width: 320px;
        font-weight: 700;
        color: #eee;
        padding: 1rem;
        border-radius: 0%.25rem;
        border: none;
        outline: 0;
        cursor: pointer;
    }
`