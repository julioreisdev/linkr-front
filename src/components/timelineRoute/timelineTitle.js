import styled from "styled-components"
export default function TimelineTitle(props){
return(
    <TimeLineTitleSection>
        <h2>{props.children}</h2>
    </TimeLineTitleSection>
)
}

const TimeLineTitleSection =styled.section`
    width:100%;
    max-width:936px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position: relative;
    h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    font-family: "Oswald", sans-serif !important;
  }
  @media (min-width: 0) and (max-width: 700px) {
    padding: 0 15px;
  }
` 