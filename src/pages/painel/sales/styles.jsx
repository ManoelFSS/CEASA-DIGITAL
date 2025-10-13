import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    gap: 10px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: calc( 100vh - 50px );
    padding: 15px 15px 0px;
    margin:auto;
    
    .box-right {
        display: flex;
        flex-direction: column;
        
        p {
            font-size: 0.7rem;
            color: #000;
        }
    }
    
    .box-filter {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        width: 100%;
        background-color: #f2f2f2f2;
        padding: 10px;
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        .title {
            display: flex;
            align-items: center;
            gap: 10px;
            
            .icon {
                font-size: 2.2rem;
                color: #007E2A;
            }

            p {
                font-size: 1.1rem;
                font-weight: 700;
                color: #007E2A;
                padding: 2px 20px 0;
            }
        }

        .filter {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 15px;
            background-color: #f2f2f2f2;

            .box-icon {
                display: flex;
                margin-left: 10px;
                gap: 15px;
                
                .icon-square, .icon-list {
                    cursor: pointer;
                    font-size: 1.7rem;
                    trasition: color 0.3s ease;
                    box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.4);
                    background-color:rgb(255, 255, 255);
                    padding: 4px;
                    border-radius: 4px;
                    
                    &:hover {
                        color: var( --color-icon-hover );
                        transform: scale(1.1);
                    }
                }
                
                .ative-icon  {
                    color: var( --color-icon-hover );
                }
            }
        }
    }
`

export const ContainerTable = styled.section`
    display: flex;
    width: 100%;
    height: calc(100vh - 130px);
    overflow: auto;

    .body-card{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0px;
        width: 100%;
        padding: 5px;
        overflow: auto;
        
        &::-webkit-scrollbar {
            width: 8px;
        }
        
        &::-webkit-scrollbar-track {
            background:rgba(241, 241, 241, 0);
        }
        
        &::-webkit-scrollbar-thumb {
            background: #FE7E01;
        }
    }
    
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 1200px;
        // height: calc(100vh - 130px);

        // @media (max-width: 1065px) {
        //     height: calc(100vh - 170px);
        // }

        // @media (max-width: 605px) {
        //     height: calc(100vh - 213px);
        // }

        // @media (max-width: 433px) {
        //     height: calc(100vh - 258px);
        // }

        // @media (max-width: 309px) {
        //     height: calc(100vh - 299px);
        // }
        
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            border-radius: 6px;
            
            .header-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 99%;
                padding:  10px 0;
                
                li {
                    display: flex;
                    height: 40px;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    gap: 10px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    background-color: #FE7E01;
                    border-radius: 4px;
                    color: var( --color-text-secondary );
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                    
                    .icon  {
                        width: 20px;
                        height: 20px;
                    }
                }
                
                li:nth-child(1) {  /////////////////////////////////////////
                    width: 50px;
                    justify-content: center;
                }

                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 140px;
                    .icon{
                        width: 18px;
                        height: 18px;
                    }
                }

                li:nth-child(4){
                    width: 100px;
                }

                li:nth-child(5) {
                    width: 130px;
                    text-align: center;

                    .icon  {
                        width: 30px;
                        height: 30px;
                    }
                }

                li:nth-child(6){
                    width: 130px;
                }

                li:nth-child(7){
                    width: 130px;
                    text-align: center;

                    .icon  {
                        width: 25px;
                        height: 25px;
                    }
                }

                li:nth-child(8){
                    width: 130px;
                }

                li:nth-child(9) {
                    width: 150px;
                }
                
            }
        }

        .body {
            display: flex;
            align-items: center;
            justify-content: ;
            flex-direction: column;
            gap: 16px;
            list-style: none;
            width: 100%;
            padding: 10px 0;
            overflow: auto;
            height: calc(100vh - 192px);
            
            &::-webkit-scrollbar {
                width: 8px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(241, 241, 241, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #FE7E01;
            }

            .body-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 99%;
                background-color: #f2f2f2f2;     
                border-radius: 6px;    
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.19);
                padding: 5px 0;

                &:nth-child(even) {
                    background-color:rgba(175, 175, 175, 0.32);
                }

                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 10px;
                    font-weight: 500;
                    font-size: 0.8rem;
                    color: #000;
                    color: var( --color-text-primary );
                }
                
                li:nth-child(1) {
                    display: flex;
                    align-items: center;
                    width: 50px;
                    padding: 0;
                    
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius:50%;
                        background-color: #fff;
                    }
                }
                
                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    display: flex;
                    gap: 10px;
                    width: 140px;
                    font-weight: 500;
                    font-size: 0.8rem;
                    
                    span {
                        font-weight: 500;
                        font-size: 0.8rem;
                    }
                }
                
                li:nth-child(4) {
                    display: flex;
                    gap: 10px;
                    width: 100px;
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                
                li:nth-child(5) {
                    width: 130px;
                    font-weight: 500;
                    font-size: 1rem;
                }

                li:nth-child(6){
                    width: 130px;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                li:nth-child(7){
                    width: 130px;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                li:nth-child(8){
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 130px;
                    font-weight: 500;
                    font-size: 0.9rem;
                    
                    span {
                        color: #ffffff;
                        width: 100px;
                        text-align: center;
                        padding: 8px 10px;
                        border-radius: 4px;
                    }
                }

                li:nth-child(9) {
                    display: flex;
                    width: 140px;

                    span {    
                        font-weight: 900;
                        font-size: 1rem;
                    }
                }
                
                .icons {
                    width: 170px;
                    justify-content: center;
                    gap: 10px;
                    
                    .icon {
                        width: 35px;
                        height: 35px;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        padding: 6px;
                        border-radius: 4px;
                        background: rgba(255, 255, 255, 0); /* fundo semi-transparente */
                        backdrop-filter: blur(10px); /* desfoque no fundo */
                        border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                        -webkit-backdrop-filter: blur(10px); /* Safari */
                        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.8); /* sombra suave */
                    }

                    .icon:nth-child(2) {
                        color:rgb(0, 0, 0);
                    }

                    .icon:nth-child(2) {
                        color:rgb(21, 0, 255);
                    }
                    
                    .icon:nth-child(3) {
                        color:rgb(0, 0, 0);
                    }

                    .icon:nth-child(3) {
                        color:rgb(255, 0, 0);
                    }

                    .icon-whatsapp {
                        width: 35px;
                        height: 35px;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        color:rgb(0, 133, 44);
                        padding: 6px;
                        border-radius: 4px;
                        background: rgba(255, 255, 255, 0); /* fundo semi-transparente */
                        backdrop-filter: blur(10px); /* desfoque no fundo */
                        border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                        -webkit-backdrop-filter: blur(10px); /* Safari */
                        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.8); /* sombra suave */

                        &:hover {
                            color:rgb(0, 133, 44);
                        }
                    }
                }
            }
        }
    }

`
