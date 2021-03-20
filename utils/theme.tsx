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

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  flex-wrap: wrap;
  height: var(--body-height);
  padding-top: var(--space-xxxl);
  backdrop-filter: grayscale(92%) contrast(100%) brightness(40%);
`

export const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 250px);
  grid-template-columns: repeat(4, calc((100% - var(--space-m) * 3) / 4));
  gap: var(--space-m);
  position: relative;
  height: var(--body-height);
  padding: var(--space-xxxl) var(--space-m);
  backdrop-filter: grayscale(92%) contrast(100%) brightness(40%);
`

export const DashboardWrapper = styled.div`
  position: relative;
`
export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/images/caesar2.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
`