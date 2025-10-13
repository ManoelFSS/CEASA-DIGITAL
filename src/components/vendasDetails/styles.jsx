import styled from "styled-components";

export const Container_datails = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.767);
    z-index: 9999999;
    overflow-y: auto;
    padding: 20px 5px;

    &::-webkit-scrollbar {
        width: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FE7E01;
    }

    @media (max-width: 68px) {
        padding: 20px 5px;
    }


    .datails-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 15px;
        gap: 20px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
        margin: auto;
    

        .close-container {
            display: flex;
            align-items: center;
            width: 100%;
            height: 20px;
            position: relative;

            h1 {
                width: 100%;
                text-align: center;
                font-size: 1rem;
                font-weight: 900;
                padding-bottom: 5px;
            }

            .close{
                position: absolute;
                right: 0;
                top: -3px;
                cursor: pointer;
                font-size: 1.5rem;
                transition: color 0.3s ease;
                color:rgb(250, 61, 61);
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.46);
                border-radius: 4px;
                padding: 3px;

                &:hover {
                    color:rgb(209, 0, 0);
                }
            }
        }

        h2 {
            width: 100%;
            text-align: center;
            font-size: 1rem;
            font-weight: 900;
            color: #fff;
            background-color:rgba(127, 127, 127, 0.95);
            padding: 8px 0;
        }

        .datails-client {
            display: flex;
            flex-direction: column;
            width: 100%;

            .datails-date {
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding-right: 25px;

                .name {
                    width: 160px;
                }
            }

            h4 {
                font-size: 0.8rem;
                font-weight: 700;
                color: #000;
            }

            p {
                font-size: 0.7rem;
                font-weight: 500;
                color: #000;
                padding: 3px 0;
                margin-bottom: 2px;
            }

            .datails-client-info {
                display: flex;
                justify-content: space-between;
                width: 100%;
                gap: 10px;

                div {
                    width: 100%;
                    
                    h4 {
                        font-size: 0.8rem;
                        font-weight: 900;
                        color: #000;
                    }

                    p {
                        font-size: 0.7rem;
                        font-weight: 500;
                        color: #000;
                        padding: 3px 0;
                    }
                }
            }
        }

        .datails-payment {
            display: flex;
            width: 100%;
            flex-direction: column;
            gap: 3px;

            h3 {
                font-size: 0.9rem;
                font-weight: 600;
                color: #000;
            }
        
            .payment-header{
                display: flex;
                width: 100%;
                list-style: none;
                background-color: #007E2A;


                li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    border-radius: 4px;
                    text-align: center;

                    p {
                        width: 100%;
                        text-align: center;
                        font-size: 0.8rem;
                        font-weight: 600;
                        color: rgba(255, 255, 255, 0.95);
                        padding: 5px 6px;
                    }
                }
            }

            .payment-list {
                display: flex;
                width: 100%;
                list-style: none;
                background-color: #f2f2f2f2;

                .status {
                    font-size: 0.7rem;
                }

                .cancel-icon {
                    color: red;
                    font-size: 1rem;
                }

                .checkbox {
                    cursor: pointer;
                }

                .checkbox[type="checkbox"]:checked {
                    accent-color: green;
                }

                li {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    color: #000;
                    height: 26px;

                    p {
                        width: 100%;
                        text-align: center;
                        font-size: 0.7rem;
                        font-weight: 500;
                    }
                }
            }

            .payment-list:nth-child(even) {
                background-color:rgba(225, 225, 225, 0.95);
            };

            .payment-total {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                padding: 5px 5px 0;
                font-size: 0.8rem;
                font-weight: 700;

                .title {
                    font-weight: 900;
                    font-size: 0.9rem;
                    color:rgb(239, 10, 10);
                }
                    

                div {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        font-size: 1rem;
                        font-weight: 900;
                        padding-right: 3px;
                    }
                    
                    p{
                        font-weight: 500;
                        text-align: center;
                        padding: 2px 0;
                    }
                }
            }
        }

        .datails-download {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 45px;
            width: 100%;
            position: relative;
            padding: 10px;
            border: solid 1px #ccc;

            p {
                font-size: 0.9rem;
                font-weight: 600;
                color: #fff;
                border-radius: 4px;
                padding: 6px 20px;
            }

            .icon{
                position: absolute;
                right: 10px;
                bottom: 9px;
                font-size: 1.7rem;
                cursor: pointer;
                transition: color 0.3s ease;
                box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.56);
                border-radius: 4px;
                padding: 3px;

                &:hover {
                    color: #FE7E01;
                }
            }

        }
    }

`