import styled from "styled-components";

const S = {};

  S.Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#000; 

    & p.newTeam{
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 50px;
      color: #ffd400;
    }
  `

  S.MoreLesson = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    & svg.down {
      margin-bottom: 30px;

      & path {
        color: #ffd400;
      }
    }
  `

  S.FormContainer = styled.div`
    width: 1000px;
    height: 160vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid #444444;
    border-radius: 5px;
  `

  S.Fieldset = styled.fieldset`
    width: 822px;
    height: auto;

    display: flex;
    flex-direction: column;

    & input {
      background-color: black;
      color: #fff;

      width: 648px;
      height: 40px;


      border: none;
    }

    & input#activityPeriodStart::-webkit-calendar-picker-indicator {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="%23FFFFFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 16px;
      cursor: pointer;
    }

    & input[type="date"]{
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-size: 17px;
      color: #fff;
    }

    & input#deadLine::-webkit-calendar-picker-indicator {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="%23FFFFFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 16px;
      cursor: pointer;
    }

    & input::placeholder{
      color: #fff;
      font-size: 17px;
    }

    & textarea {
      background-color: black;
      color: white;
      border: none;

      width: 680px;
      height: 460px;

      margin: 10px 0 0 0;
    }

    & textarea::placeholder{
      color: #fff;
      font-size: 17px;
    }
  `

  S.Form = styled.form`
    margin-top: 30px;
  `

  S.Label = styled.label`
    width: 820px;
    height: 47px;

    border: 0.5px solid #444444;

    display: flex;
    align-items: center;
    gap: 27px;

    margin-bottom: 20px;
    border-radius: 5px;

    & p {
      font-size: 17px;
      margin-left: 10px;
    }
    
    & input#teamName {
      margin-left: 47px;
    }

    & input#title {
      margin-left: 32px;
    }

    & input#area {
      margin-left: 60px;
    }

    & input#category{
      margin-left: 60px;
    }

    & input#recruit{
      margin-left: 30px;
    }

    & input#careerHistory{
      margin-left: 55px;
    }
  `

  S.LabelTextAarea = styled.label`
    width: 820px;
    height: 498px;

    border: 0.5px solid #444444;

    display: flex;
    gap: 46px;
    
    margin-bottom: 20px;
    border-radius: 5px;

    & p {
      font-size: 17px;
      margin: 10px 0 0 10px;
    }

    & textarea {
      font-size: 17px;
      margin-left: 10px;
    }
  `

  S.Portfolio = styled.div`
    & label::after {
      /* content: '+자료첨부'; */
      cursor: pointer;
      font-size: 17px;
      margin-left: 8px;
    }

    & input {
      display: none;
    }
  `
  S.Button = styled.button`
    width: 145px;
    height: 55px;

    border-radius: 50px;
    background-color: #ffd400;
    border: none;

    color: black;
    font-size: 17px;
    font-weight: 500;

    &.back{
      background-color: #797979;
      color: white;

      position: absolute;
      bottom: 68px;
      left: 680px;
    }

    &.submit {
      position: absolute;
      bottom: 68px;
      left: 850px;
    }
  `

export default S;