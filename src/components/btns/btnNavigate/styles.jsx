import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // min-width: 206px;
  padding: 1.5vh 1.5vh;
  background-color: var(--color-bg-btn-secondary);
  border-radius: 4px;
  border: solid 2px var(--color-bord-btn-primary);
  color: var(--color-text-primary);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3),
    inset 0px 0px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size:  1rem;
  font-weight: 700;

  .icon {
    // height: 25px;
    // width: 25px;
    font-size: 1.5rem;
  }

  &:hover {
    border: solid 2px var(--color-bord-btn-hover);
  }

  @media (min-width: 1920px) {
    font-size: 2vh;
    padding: 1vh;
    border: solid 0.4vh var(--color-bord-btn-primary);
  }
`;