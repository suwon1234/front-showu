import styled from 'styled-components';

const S = {};

  S.Hr = styled.hr`
    border: 1px solid #444444;
  `

  S.Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#000; 
    min-height: 100vh;

    position: relative;

    & p{
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 50px;
      color: #ffd400;
    }
  `

  S.LessonWrapper = styled.div`
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
   
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

  S.LessonBox = styled.div`
    width: 313px;
    height: 400px;
    border: 1px solid #444444;
    border-radius: 10px;
    padding: 33px 27px;

    position: relative;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 20px;
    }
  `

  S.category = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;

    & .category {
      width: 50px;
      background-color: #ffd400;
      color: #000;
      padding: 5px;
      border-radius: 20px;
      text-align: center;
    }

    & .total {
      width: 70px;
      background-color: #797979;
      color: #fff;
      padding: 5px;
      border-radius: 20px;
      text-align: center;
    }
  `

  S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 20px;

    & .teamName {
      font-weight: 500;
      font-size: 18px;
    }

    & .category {
      font-size: 16px;
    }
  `

  S.Address = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
  `

  S.LessonExplantion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    position: relative;

    & .lessonName {
      color: #797979;
    }

    & .lessonDetail {
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: #ffd400;
      }
    }
  `

  S.Period = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;

    position: absolute;
    bottom: 27px;
  `

  S.Career = styled.div`
    display : flex;
    align-items: center;
    gap: 5px;

    position: absolute;
    top: 125px;
  `

  S.TeamCreateButton = styled.div`
    position: absolute;
    top: 210px;
    right: 350px;

    & div{
      cursor: pointer;
      background-color: #ffd400;
      width: 110px;
      border-radius: 20px;
      height: 38px;
      text-align: center;
      color: #000;
      font-size: 17px;
      font-weight: 600;
      line-height: 2;
    }
  `

  S.CategoryButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 1000px;
    margin: 60px auto 0;
    padding: 10px 20px;
  `

  S.CategoryButton = styled.button`
    border-radius: 30px;
    padding: 10px 15px;
    background-color: #000;
    color: #fff;
    border: 1.5px solid #ffd400;
    cursor: pointer;

    &.active {
      background-color: #ffd400;
      color: #000;
    }

    &:hover {
      background-color: #ffd400;
      color: #000;
    }
  `

export default S;