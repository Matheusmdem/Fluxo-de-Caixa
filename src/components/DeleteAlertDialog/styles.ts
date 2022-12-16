import styled from 'styled-components'
import * as AlertDialog from '@radix-ui/react-alert-dialog';



export const Overlay = styled(AlertDialog.Overlay)`
    position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(AlertDialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  .actionButtons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
`

export const Description = styled(AlertDialog.Description)`
  align-self: center;
  text-align: center;
`

export const Cancel = styled(AlertDialog.Cancel)`
  background: ${(props) => props.theme['green-500']};
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme.white};

  &:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme['green-700']};
  }
`

export const Action = styled(AlertDialog.Action)`
  background: ${(props) => props.theme['red-500']};
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme.white};

  &:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme['red-700']};
  }
`