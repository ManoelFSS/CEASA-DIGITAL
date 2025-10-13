import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    width: 240px;
    height: 200px;
    padding: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 584px) {
        width: 420px;
    }

    @media (max-width: 490px) {
        width: 100%;
    }

    .chart-header {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        background-color:  #f2f2f2;
        border-radius: 8px 8px 0px 0px;

        h3 {
            font-size: 0.8rem;
            font-weight: 700;
            color: var( --color-text-primary );

            @media (max-width: 481px) {
                font-size: 0.8rem;
            }
        }

        p {
            font-size: 0.7rem;
            font-weight: 500;
            color: var( --color-text-primary );
        }

        .icon {
            color: var( --color-text-primary );
            font-size: 1.5rem;
        }
    }

    .chart-main {
        padding:  0px 0;
    }

    .chart-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px 0px 8px 8px;
        cursor: pointer;
        padding: 5px 0px;
        background-color:  #f2f2f2;
        color: var( --color-text-primary );
        font-weight: 900;
        font-size: 0.9rem;
        transition: background-color 0.3s ease;

        .link {
            text-decoration: none;
            color: var( --color-text-primary );
        }

        &:hover {
            background-color:rgb(210, 210, 210);
        }
    }
`;
