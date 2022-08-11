import styled from "styled-components"

export const ContentMain= styled.main`
  width:100%;
  max-width:936px;
  display: flex;
  justify-content:space-between;
  align-items:flex-start;

`

export const TotalContainer = styled.section`
    width: 100vw;
    min-height:100vh;
    height: 100%;
    padding: 72px 1rem 1rem 1rem;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    
&&>div{
    padding-top:90px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
}
 @media (min-width: 0) and (max-width: 700px) {
    padding: 72px 0 0 0;
  }`