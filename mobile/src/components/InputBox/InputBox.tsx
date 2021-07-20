import React, {useState} from 'react';

import {
  InputBoxContainer,
  InputBoxLabel,
  InputBoxTextInput,
} from './InputBox.styles';

const InputBox: React.FC = ({
  inputRef,
  inputValue,
  inputOnChangeText,
  inputLabel,
  inputAutoFocus = false,
  inputSubmitEditing,
}) => {
  const [isFocused, setIsFocus] = useState<Boolean>(false);

  return (
    <InputBoxContainer>
      {inputLabel && <InputBoxLabel>{inputLabel}</InputBoxLabel>}
      <InputBoxTextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={inputOnChangeText}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        blurOnSubmit={inputSubmitEditing ? false : true}
        autoFocus={inputAutoFocus}
        onSubmitEditing={inputSubmitEditing}
        isFocused={isFocused}
      />
    </InputBoxContainer>
  );
};

export default InputBox;
