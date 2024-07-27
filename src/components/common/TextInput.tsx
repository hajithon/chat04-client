import { useState } from 'react';

import styled from 'styled-components';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const StyledInputContainer = styled.div<{ isFocused: boolean }>`
  width: 335px;
  height: 52px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div<{ isFocused: boolean }>`
  padding: 12px 20px;
  background: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.subpurplepale : theme.colors.white};
  border-radius: 8px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.colors.main : theme.colors.gray60)};
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input<{ isFocused: boolean }>`
  width: 295px;
  border: none;
  background: transparent;
  color: ${({ isFocused, theme }) => (isFocused ? theme.colors.gray90 : theme.colors.gray30)};
  ${({ theme }) => theme.fonts.body21}

  &:focus {
    outline: none;
  }
`;

const TextInput = (props: TextInputProps) => {
  const { value, onChange, placeholder } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <StyledInputContainer isFocused={isFocused}>
      <InputContainer isFocused={isFocused}>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isFocused={isFocused}
        />
      </InputContainer>
    </StyledInputContainer>
  );
};

export default TextInput;
