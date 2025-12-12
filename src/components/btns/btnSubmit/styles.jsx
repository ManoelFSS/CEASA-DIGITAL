import styled from "styled-components"; 

export const Button = styled.button`
    width: 100%;
    padding: 1.5vh 1.5vh;
    background-color: var( --color-bg-btn-primary );
    border-radius: 4px;
    border: none;
    color: var( --color-text-secondary );
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 800;
    transition: background-color 0.3s ease; 
    position: relative;

    span {
        position: absolute;
        color: var( --color-text-secondary );
        font-size: 1rem;
        font-weight: 700;
        right: 10px;
        top: 6px;

        @media (min-width: 1920px) {
            font-size: 2vh;
            top: 1vh;
        }
    }

    &:hover {
        background-color: var( --color-bg-btn-hover );
    }

    @media (min-width: 1920px) {
        font-size: 2.2vh;
        padding: 1vh;
        border-radius: 1.2vh;
        border: solid 0.4vh var( --color-bord-btn-primary );
    }

`