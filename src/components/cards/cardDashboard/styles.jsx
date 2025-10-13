import styled from "styled-components";

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 140px;
    width: 100%;
    min-width: 240px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 5px;
        padding: 0 15px;

        @media (max-width: 570px) {
            justify-content: space-between;
        }

        h3 {
            font-size: 1rem;
            font-weight: 900;
            color: var(  --color-text-primary );
            text-align: center;
        }

        .icon {
            height: 60px;
            width: 60px;
        }

        .rotate-icon {
            transform: rotate(180deg);
        }

        .list-valores {
            display: flex;
            width: auto;
            flex-direction: column;
            gap: 10px;

            .valor {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }

            h4 {
                color: var( --color-text-primary );
                font-size: 0.8rem;
                font-weight: 900;
            }

            span {
                color: var( --color-text-primary );
                font-size: 0.7rem;
                font-weight: 600;
            }
        }
    }

    p {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: var( --color-text-secondary );
        border-radius: 0px 0px 8px 8px;
    }

    .alert {
        border: solid 2px rgb(60, 190, 99);
    }

`