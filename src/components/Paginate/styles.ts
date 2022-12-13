import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "styled-components";

export const PaginateRoot = styled(RadioGroup.Root)`
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-block: 0.5rem;
    list-style: none;
  
    li {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const PaginateButton = styled(RadioGroup.Item)`
background: ${(props) => props.theme['gray-700']};
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
width: 40px;
height: 40px;
border-radius: 6px;
cursor: pointer;
border: 0;
color: ${(props) => props.theme['gray-300']};

&[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

&[data-state='unchecked']:not(:disabled):hover {
  transition: background-color 0.2s;
  background: ${(props) => props.theme['gray-600']};
}

&[data-state='checked'] {
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme['green-500']};
}
`

export const MoreLessButton = styled.button`
background: transparent;
width: 20px;
height: 40px;
border-radius: 6px;
cursor: pointer;
border: 0;
color: ${(props) => props.theme['gray-300']};
display: flex;
align-items: center;

&:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

&:not(:disabled):hover {
  transition: background-color 0.2s;
  background: ${(props) => props.theme['gray-600']};
}
`