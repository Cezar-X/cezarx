import styled from 'styled-components';
import { Button, Dialog } from 'evergreen-ui';

export const StyledInput = styled.input`
  font-size: var(--font-size-l);
  padding: var(--space-xxs) var(--space-xxs);
  border: 1px solid;
`

export const PrimaryButton = styled(Button)`
  height: auto;
  font-size: var(--font-size-m);
  font-family: 'Inter', sans-serif;
  color: var(--body-text-color);
  line-height: 1;
  background: transparent;
  padding: var(--space-xxxs) var(--space-xxs);
  border: 1px solid;
  border-radius: 30px;
  box-shadow: none;

  &:not([disabled]):hover {
    background: var(--bg-blue-light) !important;
  }
`;

export const SecondaryButton = styled(Button)`
  height: auto;
  font-size: var(--font-size-l);
  font-family: 'Inter', sans-serif;
  color: var(--grey-lightest);
  line-height: 1;
  background: var(--bg-blue);
  padding: var(--space-xs) var(--space-xl);
  border: 1px solid;
  border-radius: 4px;
  box-shadow: none;

  &:not([disabled]):hover {
    background: var(--bg-blue-light) !important;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-l) 0 var(--space-xs);
`