import {styled} from 'styled-components';

export const Page = styled.div`
    width: 100%;
    height: 1000px;
    background-color: #7A5CFA;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UlProducts = styled.ul`
    list-style: none;
    background-color: white;
    width: 700px;
    height: 900px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LiProducts = styled.li`
    width: 450px;
    height: 56px;
    box-shadow: -1px -2px 15px -2px rgba(0,0,0,0.43);
        -webkit-box-shadow: -1px -2px 15px -2px rgba(0,0,0,0.53);
        -moz-box-shadow: -1px -2px 15px -2px rgba(0,0,0,0.53);
    margin-top: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    justify-content: space-around;
`;

export const ButtonNavLink = styled.button`
    width: 172px;
    height: 56px;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #7A5CFB;
    color: #7A5CFB;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin-top: 20px;
`;

export const ButtonDelete = styled.button`
    margin-left: 40px;
    border: none;
    background-color: white;
    color: red;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
`;