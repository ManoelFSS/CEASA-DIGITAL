import styled from "styled-components";

export const Input = styled.input`
    height:  50px;
    width: 100%;
    background-color:rgb(255, 255, 255);
    padding-left: 16px;
    border-radius: 5px;
    border: none;
    color: var( --color-text-primary );
    box-shadow: inset 1px 2px 8px rgb(143, 143, 143);
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    transition: background-color 0.3s ease;

    &:focus ~ .info-balloon {
        display: flex;
    }

    &:hover {
        background-color: #f2f2f2;
    }

    @media (min-width: 1920px) {
        font-size: 2vh;
        padding: 1vh;
        height: 5vh;
    }
    
`
export const Container = styled.div`
    position: relative;
    
    .icon {
        position: absolute;
        top: 16px;
        right: 10px;
        cursor: pointer;
        transition: color 0.3s ease;
        font-size: 1.2rem;

        @media (min-width: 1920px) {
            top: 1.4vh;
            right: 1.4vh;
            font-size: 2.5vh;
        }

        &:hover {
            color: var( --color-icon-hover );
        }
    }

    .icon-info {
        position: absolute;
        top: -22px;
        left: 60px;
        cursor: pointer;
        transition: color 0.3s ease;
        font-size: 1.2rem;
        color: var( --color-icon-hover );
        border-radius: 50%;

        &:hover {
            color: #000;
        }

        @media (min-width: 1920px) {
            top: -3vh;
            left: 7.5vh;
            font-size: 2.5vh;
        }
    }

    .info-balloon{
        display: none;
        width: 320px;
        height: 220px;
        gap: 10px;
        flex-direction: column;
        position: absolute; 
        top: -260px !important;
        left: 0px !important;
        cursor: pointer;
        transition: color 0.5s ease;
        color: #000;
        background-color:rgb(255, 255, 255);
        border-radius: 6px;
        padding: 20px 16px;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.5);
        z-index:2;
        

        h4 {
            text-align: center;
            color: var( --color-icon-hover );
            padding-bottom: 5px;
            font-size: 1.3rem;
            font-weight: 900;
        }

        p {
            display: flex;
            align-items: center;
            height: 20px;
            width: 100%;
            gap: 8px;
            font-weight: 500;
            font-size: 0.8rem;
            color: #000;
            word-spacing: 4px;
            text-transform: capitalize;
            padding: 4px 0;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                border-radius: 4px;
                color: #fff;
                background-color: #FE7E01;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
                padding: 2px;
            }

            .check-required {
                background-color: rgb(0, 255, 68);
                font-weight: 900;
                font-size: 0.9rem;
                border-radius: 50%;
                padding: 2px;
            }

            @media (min-width: 1920px) {
                font-size: 1.5vh;
            }

           
        }

        &::after {
            content: "";
            position: absolute;
            top: 99%;
            left: 24%;
            margin-left: -10px;
            border-width: 10px;
            border-style: solid;
            border-color: rgb(255, 255, 255) transparent transparent transparent;
        }

        @media (min-width: 1920px) {
            top: -2vh;
            left: 6vh;
            font-size: 2.5vh;
        }

    }  

    .icon-info:hover + .info-balloon {
        display: flex;
    }
`