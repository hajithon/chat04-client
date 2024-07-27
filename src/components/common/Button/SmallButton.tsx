import styled, { css } from 'styled-components';

type ButtonVariant = 'small' | 'small_active' | 'small_disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  width?: string;
  height?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $width?: string;
  $height?: string;
}

const defaultVariant: ButtonVariant = 'small';

export const SmallButton = ({
  variant = defaultVariant,
  width = '100%',
  height = 'auto',
  children,
  icon: Icon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $width={width} $height={height} {...props}>
      {Icon && <Icon />}
      {children}
    </StyledButton>
  );
};

const getVariantStyle = ($variant: ButtonVariant) => {
  switch ($variant) {
    case 'small':
      return css`
        border: 1px solid ${({ theme }) => theme.colors.main};
        background-color: ${({ theme }) => theme.colors.subpurplepale};
        color: ${({ theme }) => theme.colors.main};
      `;
    case 'small_active':
      return css`
        background-color: ${({ theme }) => theme.colors.main};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'small_disabled':
      return css`
        border: 1px solid ${({ theme }) => theme.colors.gray40};
        background-color: ${({ theme }) => theme.colors.gray20};
        color: ${({ theme }) => theme.colors.gray40};
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  ${({ theme }) => theme.fonts.caption11};
  ${({ $variant }) => getVariantStyle($variant)}

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 5px 10px;
  border-radius: 28px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1px;

  svg {
    font-size: 16px;
  }
`;
