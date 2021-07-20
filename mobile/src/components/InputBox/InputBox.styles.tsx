import styled from 'styled-components';

export const InputBoxContainer = styled.View``;

export const InputBoxLabel = styled.Text`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const InputBoxTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #f0f5ff;
  border-radius: 14px;
  padding: 0 15px;
  border: 1px solid ${({isFocused}) => (isFocused ? '#0A58ED' : 'transparent')};
  color: ${({isFocused}) => (isFocused ? '#0A58ED' : '#31353a')};
`;
