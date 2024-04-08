
import styled from 'styled-components'
const Div = styled.div``
export const Button = styled.button`
    outline: none;
    font-size: inherit;
    outline: none;
`

export const FileContainer = styled(Div)`
    left: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all  cubic-bezier(0, 0.01, 0, 1.04);
`
export const SelectButton = styled(Button)`
    width: 45px;
    height: 45px;
    border-radius:50%;
    background:rgb(25 118 210);
    display: grid;
    place-items: center;
    color: #fff;

    &:active{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    svg{
        transform: ${({ x }) => `rotate(${x}deg)`};
        transition: all  cubic-bezier(0.4, 0, 1, 1) 100ms;
    }
    `
export const FileList = styled(Button)`
    cursor: default;
    height: 50px;
    padding-left: 12px;
    display: flex;
    align-items: center;
    margin: 6px 0px;
    transform: ${({ show }) => !show ? 'scale(0)' : 'scale(1)'};
    &:nth-child(1){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.25s' : 'all 0.1s linear 0.10s'} ;
    }
    &:nth-child(2){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.20s' : 'all 0.1s linear 0.15s'} ;
    }
    &:nth-child(3){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.15s' : 'all 0.1s linear 0.20s'} ;
    }
    &:nth-child(4){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.10s' : 'all 0.1s linear 0.25s'} ;
    }
    input{
        display: none;
    }
`
export const FileIcon = styled.div`
    cursor: pointer;
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    place-items:center;
    justify-content: center;
    color: #457678;
    font-size:20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    margin-right: 10px;

    &:hover{
        color: #1976d2;
        label:nth-child(1){
            color: #1976d2;
            opacity: 1;
            visibility: visible;
            transform: translate(20%, -50%);
        }
    }
    `
export const Label = styled.label`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: pointer;
    &:hover ~ label{
        color: #1976d2;
            opacity: 1;
            visibility: visible;
            transform: translate(20%, -50%);
    }
`
export const Title = styled.label`
    visibility: hidden;
    position: absolute;
    cursor: pointer;
    font-size: 12px;
    opacity: 0;
    padding: 4px 10px;
    background: #fff;
    border-radius: 8px;
    border-bottom-left-radius: 0px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    left: 100%;
    top: 50%;
    /* transform: translate(-50%); */
    transform: translate(0%, -50%);
    transition: all 0.2s linear;
    /* color: #fff; */
`
export const SelectFileBox = styled(Div)`
    backdrop-filter: blue(3px);
    position: absolute;
    bottom: 100%;
    left: 0px;
    transition: all  cubic-bezier(0.01, 0.16, 0.85, 1.02);
    visibility: ${({ show }) => show};
    `