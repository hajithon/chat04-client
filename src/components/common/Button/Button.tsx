import styled, { css } from 'styled-components';

type ButtonVariant =
  | 'stroke'
  | 'stroke_active'
  | 'stroke_disabled'
  | 'fill'
  | 'fill_active'
  | 'fill_disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
}

const defaultVariant: ButtonVariant = 'stroke';

export const Button = ({ variant = defaultVariant, children, ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

const getVariantStyle = ($variant: ButtonVariant) => {
  switch ($variant) {
    case 'stroke':
      return css`
        border: 1px solid ${({ theme }) => theme.colors.main};
        background-color: ${({ theme }) => theme.colors.subpurplepale};
        color: ${({ theme }) => theme.colors.main};
      `;
    case 'stroke_active':
      return css`
        background-color: ${({ theme }) => theme.colors.main};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'stroke_disabled':
      return css`
        border: 1px solid ${({ theme }) => theme.colors.gray40};
        background-color: ${({ theme }) => theme.colors.gray20};
        color: ${({ theme }) => theme.colors.gray40};
      `;
    case 'fill':
      return css`
        background-color: ${({ theme }) => theme.colors.main};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'fill_active':
      return css`
        background-color: ${({ theme }) => theme.colors.subpurpledeep};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'fill_disabled':
      return css`
        background-color: ${({ theme }) => theme.colors.gray20};
        color: ${({ theme }) => theme.colors.gray40};
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  ${({ theme }) => theme.fonts.body11};
  ${({ $variant }) => getVariantStyle($variant)}

  width: 335px;
  height: 56px;
  padding: 16px 96px;
  border-radius: 28px;
`;
