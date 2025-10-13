import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    max-width: 300px;
    user-select: none;

    .icon-left {
        min-width: 30px;
        min-height: 30px;
        cursor: pointer;
        transition: color 0.3s ease;
        padding: 2px;
        border-radius: 4px;
        background: rgb(255, 255, 255); /* fundo semi-transparente */
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3); /* sombra suave */
        
        &:hover {
            color: #007E2A;
        }
    }

    .body-pages {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
    }

    button {
        min-width: 25px;
        min-height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
        font-size: 1rem;
        border: none;
        transition: background-color 0.3s ease;
        background: rgb(255, 255, 255); /* fundo semi-transparente */
        font-weight: 900;
        border-radius: 2px;

        &:hover {
            color: #007E2A;
        }
    }

    .active {
        min-width: 25px;
        min-height: 25px;
        color: #FE7E01;
        
        &:hover {
            color: #FE7E01 !important;
        }
    }

    .icon-right {
        min-width: 30px;
        min-height: 30px;
        cursor: pointer;
        color: #000000;
        transition: color 0.3s ease;
        padding: 2px;
        border-radius: 4px;
        background: #ffffff; /* fundo semi-transparente */
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3); /* sombra suave */
        
        &:hover {
            color: #007E2A;
        }
    }
`