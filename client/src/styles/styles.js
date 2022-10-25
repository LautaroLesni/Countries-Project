import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #E7F6F2;
    padding:8px 12px;
    border:1px solid #E7F6F2;
    border-radius: 20px;
    transition-duration: 0.5s;

    &:hover {
        font-size:17px;
        transition-duration: 0.5s;
        background-color:#E7F6F2; 
        color: #395B64;
    }
    `
