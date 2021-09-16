import styled from 'styled-components';

export const MapHolder = styled.div`
    padding: 10px;
    background-color: yellowgreen;

    svg {
    display: inline-block;
    vertical-align: middle;
    }

    .controls {
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: 1.25rem 0;
    text-align: center;
    transform: translateX(-50%);
    }

    .controls > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 2rem;
    width: 2rem;
    background: #ff5533;
    color: #fff;
    border-radius: 100%;
    border: 0;
    }
    .controls > button:first-child {
    margin-right: 0.25rem;
    }
`;