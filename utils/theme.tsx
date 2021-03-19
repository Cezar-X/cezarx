import styled from 'styled-components';
import { Button, Dialog } from 'evergreen-ui';

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