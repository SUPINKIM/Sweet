import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  row-gap: 10px;
`;

const TextArea = styled.textarea`
  width: 450px;
  height: 100px;
  resize: none;
  outline: none;
  border: 1px solid #c62828;
  border-radius: 4px;
  padding: 4px;
`;

const Label = styled.label`
  width: 450px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ced6e0;
  color: #8395a7;
  font-size: 12px;
  padding-left: 10px;
  cursor: pointer;
`;

const AddButton = styled.button`
  all: unset;
  width: 150px;
  height: 30px;
  line-height: 200%;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#a5b1c2' : '#e57373')};
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
`;

const File = styled.input`
  display: none;
`;

export { File, AddButton, Label, TextArea, Container };
