import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  p {
    color: ${({ theme }) => theme.text}!important;
  }
  input {
    color: ${({ theme }) => theme.text}!important;
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid ${({ theme }) => theme.underline}!important;
  }
  .MuiBox-root.MuiBox-root-1 {
    background: ${({ theme }) => theme.background};
  }
  .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-marginDense {
    color: ${({ theme }) => theme.secondaryText}!important;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
  `;
