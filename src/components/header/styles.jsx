import styled from "styled-components";

export const Container_header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: width 0.3s ease;
    width: ${props => props.$toogleMenu ? "calc(100% - 190px)" : "calc(100% - 50px)"};
    height: 45px;
    padding: 0 10px;
    position: fixed;
    border-bottom: 4px solid  #007E2A;
    background-color: var( --color-bg-primary );
    right: 0;
    z-index: 99;
    gap: 20px;

    @media (min-width:  1910px) {
        height: 5vh;
        padding: 0 1vh;
    }


    .title {
        display: flex;
        align-items: center;
        gap: 1vh;

        img {
            height: 40px;

            @media (min-width: 1910px) {
                height: 4vh;
            }
        }

        h3 {
            font-size: 0.9rem;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.34);
            color: var(--color-text-primary);

            @media (min-width:  1910px) {
                font-size: 2vh;
            }
        }
    }

    .box_right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;

        .notification {

            .icon-alert {
                color: var(--color-text-primary);
                height: 30px;
                width: 30px;
            }
            
            .icon-notification {
                color: var(--color-text-primary);
                width: 25px;
                height: 25px;
                animation: ${props => props.$alert > 0 ? "notification" : "none"} 1s linear infinite;
                cursor: pointer; 
            }

            @keyframes notification {
                0%   { transform: rotate(0deg); color: rgb(0, 13, 255); }
                25%  { transform: rotate(10deg); color: rgb(255, 0, 0); }
                50%  { transform: rotate(-10deg); color: rgb(255, 221, 0); }
                75%  { transform: rotate(10deg); color: rgb(0, 255, 255); }
                100% { transform: rotate(0deg); color: rgb(0, 13, 255); }
            }
        }

        .notification:hover  {
            transform: scale(1.1);
        }

        .exit {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;

            .icon {
                color: var(--color-text-primary);
                height: 20px;
                width: 20px;
            }

            button {          
                padding: 4px 10px;
                border-radius: 4px;
                font-size: 0.8rem;

                @media (min-width: 1910px) {
                    font-size: 1.5vh;
                }
            }
            
        }
    }
    

    .menu {
        color: #ffffff;
        width: 30px;
        height: 30px;
        position: fixed;
        left: 6px ;
        cursor: pointer;
        z-index: 9999;

        @media (min-width: 1910px) {
            width: 4vh;
            height: 4vh;
        }
    }


`