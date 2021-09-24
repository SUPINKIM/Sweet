import styled from 'styled-components';
import { ContentsContainer, HomeContainer } from '../Home/HomePresenter';

const MyProfileContainer = styled(HomeContainer)`
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 870px) {
    justify-content: center;
    align-items: center;
  }
`;

const ProfileContentContainer = styled(ContentsContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 870px) {
    flex-direction: column;
    row-gap: 10px;
    margin-top: 50px;
  }
`;

const ContentsCotainer = styled.div`
  width: 90%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.08);
  margin-top: 10px;
  @media (max-width: 870px) {
    width: 80%;
    height: 700px;
    padding: 10px 0px;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    margin-top: 260px;
  }
`;

const ImgContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 870px) {
    margin-top: 60px;
    height: 50%;
  }
`;

const ProfileImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #e0e0e0;
`;

const ImgChangeButton = styled.label`
  all: unset;
  width: 30px;
  height: 30px;
  line-height: 33px;
  border-radius: 50%;
  border: 3px solid #e57373;
  background-color: #e57373;
  cursor: pointer;
  text-align: center;
  transform: translate(70px, -40px);
  color: #fff;
`;

const EditProfileForm = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  @media (max-width: 870px) {
    height: 40%;
  }
`;

const EditContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 80%;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  font-size: 13px;
`;

const Input = styled.input`
  all: unset;
  outline: none;
  border: 1px solid #e0e0e0;
  width: 80%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background-color: ${(props) => (props.notselected ? '#e0e0e0' : '#fff')};
  color: ${(props) => (props.notselected ? '#999' : '#333')};
`;

const SaveButton = styled.button`
  all: unset;
  width: 100px;
  height: 30px;
  line-height: 32px;
  cursor: pointer;
  background-color: #e57373;
  color: #fff;
  font-weight: 400;
  border-radius: 4px;
  text-align: center;
  align-self: flex-end;
  margin-right: 90px;
  @media (max-width: 870px) {
    align-self: center;
    margin-right: 0px;
  }
`;

const SweetContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 870px) {
    height: 600px;
  }
`;

const H2 = styled.h2`
  margin-top: 20px;
`;

export {
  MyProfileContainer,
  ProfileContentContainer,
  SaveButton,
  Input,
  Label,
  ImgChangeButton,
  ImgContainer,
  EditContainer,
  EditProfileForm,
  ContentsCotainer,
  ProfileImg,
  SweetContainer,
  H2,
};
