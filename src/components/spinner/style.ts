import styled from 'styled-components';

interface IPropContainer {
    top?: string;
    right?: string;
    left?: string;
    bottom?: string;
}
export const Container = styled.div<IPropContainer>`
    position: absolute;
    top: 20%;
    left: ${({ left }) => left ? left : '48%'};
    width: 56px;
    height: 56px;
    border-top: 5px solid transparent;
    border-right: 5px solid #DA2F37;
    border-left: 5px solid #DA2F37;
    border-bottom: 5px solid #DA2F37;
    border-radius: 50%;
    z-index: 15;
    animation: spin .8s infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;