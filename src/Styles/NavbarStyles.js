import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavContainer = styled.nav`
  width: 100%;
  height: 60px;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eceff1;
  padding: 10px 0px;
  @media (max-width: 870px) {
    width: 100px;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    border-right: 1px solid #eceff1;
    border-bottom: none;
  }
`;

const Icon = styled.i`
  color: #c62828;
  margin-left: 40px;
  @media (max-width: 870px) {
    margin-left: 10px;
    margin-top: 4px;
  }
`;

const NavUl = styled.ul`
  width: 30%;
  height: 100%;
  list-style-type: none;
  display: grid;
  grid-template-columns: 0.4fr 0.8fr 0.5fr;
  align-items: center;
  @media (max-width: 870px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;
  }
`;

const NavList = styled.li`
  text-align: center;
  width: 100px;
  height: 40px;
  line-height: 42px;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #c62828;
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  width: 90px;
  height: 30px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #c62828;
  border-radius: 20px;
  background-color: #c62828;
  color: #fff;
  &:hover {
    transform: scale(0.98);
  }
`;

export { Button, NavContainer, Navlink, NavList, NavUl, Icon };
