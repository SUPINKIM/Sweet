import styled from 'styled-components';

const FormContainer = styled.div`
  width: 500px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

const Form = styled.form`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 16px;
  align-items: center;
  margin-top: 60px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  line-height: 40px;
  border: none;
  border-bottom: 1px solid #666;
  outline: none;
`;

const InputSubmit = styled.input`
  all: unset;
  width: 250px;
  height: 30px;
  line-height: 200%;
  color: #fff;
  background-color: #e57373;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-bottom: 2px solid #e57373;
`;

const Span = styled.span`
  width: 100%;
  font-size: 14px;
  font-weight: 200;
  color: #666;
  text-align: center;
  margin: 100px 0px 10px 0px;
`;

const ConfirmSpan = styled.span`
  color: ${(props) => (props.color ? props.color : '#666')};
`;

export {
  ConfirmSpan,
  Span,
  Button,
  InputSubmit,
  Input,
  Label,
  Form,
  FormContainer,
};
