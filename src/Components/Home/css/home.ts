import styled from 'styled-components';

export const Page = styled.div`
    width: 100%;
    height: 1000px;
    background-color: #7A5CFA;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    width: 760px;
    height: 800px;
    border-radius: 30px;
    background-color: white;
    display: flex;
    justify-content: center;
    margin-top: 80px;
`;

export const Label = styled.label`
    font-family: sans-serif;
    color: #6666;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const InputForm = styled.input`
    width: 564px;
    height: 56px;
    background-color:#C7BBFA;
    border-radius: 8px;
    border: none;
    padding-left: 30px;
`;

export const FileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`;

export const FileInputLabel = styled.label`
    width: 304px;
    height: 56px;
    background-color: #C7BBFA;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
`;
