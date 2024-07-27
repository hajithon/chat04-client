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
  $disabled?: boolean;
}

const defaultVariant: ButtonVariant = 'stroke';

export const Button = ({ variant = defaultVariant, children, ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...props} disabled={props.disabled}>
      {children}
    </StyledButton>
  );
};

const getVariantStyle = ($variant: ButtonVariant, $disabled?: boolean) => {
  if ($disabled) {
    return css`
      background-color: ${({ theme }) => theme.colors.gray20};
      color: ${({ theme }) => theme.colors.gray40};
      border: 1px solid ${({ theme }) => theme.colors.gray40};
      cursor: not-allowed;
    `;
  }
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
  ${({ $variant, $disabled }) => getVariantStyle($variant, $disabled)}

  width: 335px;
  height: 56px;
  padding: 16px 96px;
  border-radius: 28px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
