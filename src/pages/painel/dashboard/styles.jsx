import styled from "styled-components";

export const Container_dashboard = styled.div`
    width: 100%;
    padding: 10px 0px ;
    background-color:rgb(255, 255, 255);
    height: calc(100vh - 45px);
    overflow: auto;

    &::-webkit-scrollbar {
        width: 8px;
        height: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FE7E01;
    }

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 10px;
        padding: 0 10px;
    }

    .charts-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 100%;
        gap: 15px;
        padding: 15px;
        
        .charts-x {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            
            @media (max-width: 500px) {
                width: 100%;
            }
        }
    }

    .chart-stock {
        width: 100%;
        overflow: auto;
        
        @media (max-width: 500px) {
            padding: 0px 10px;
        }
    }

    .charts-container-vendas {
        width: 100%;
        padding: 5px 10px ;
        overflow: auto;

        .chart-vendas {
            overflow: auto;
            
        }
    }

`