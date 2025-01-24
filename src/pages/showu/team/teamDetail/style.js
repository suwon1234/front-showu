import styled from "styled-components";

const S = {};

  S.Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#000; 
    /* min-height: 100vh; */
  `

  S.Banner = styled.div`
    position: relative;
    margin-bottom: 70px;

    & img.banner {
      width: 1190px;
      height: 300px;
      object-fit: cover;

      border: 1px solid #444444;
    }

    & img.profilo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #fff;
      padding: 1px;

      position: absolute;
      left: 60px;
      top: 240px;
    }
  `

  S.SectoinWarpper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    
  `

  S.RightSection = styled.div`
    
  `

  S.Title = styled.div`
    width: 800px;
    display: flex;
    align-items: center;
    position: relative;
    /* justify-content: space-between; */
    /* gap: 600px; */
  
    & p.title {
      width: 800px;
      font-size: 30px;
      font-weight: 700;
    }
  `

  S.JobContent = styled.div`
    & p{
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 13px;
    }
  `

  S.Row = styled.div`
    display: flex;
    gap: 60px;

    & div.col1 {
      margin-left: 26px;
    }

    & div.col2 {
      margin-left: 26px;
    }
  `

  S.Content = styled.div`
    & p.content {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 13px;
    }

    & p.intro {
      width: 800px;
      font-size: 22px;
    }
  `

  S.LeftSection = styled.div`
    border: 1px solid #444444;
    border-radius: 5px;
    width: 290px;
    padding: 35px 30px;

    & p.rightTitle{
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    & div{
      & p.rightSubTitle {
        font-size: 18px;
        font-weight: 600;
      }
    }
  `

  S.TeamIntro = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    & img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      /* background-color: #fff; */
      padding: 1px;
      margin-bottom: 10px;
    }
  `

  S.LeftContent = styled.div`
    display: flex;
    flex-direction: column;

    & div{
      & p.subTitle {
        font-size: 18px;
        color: #797979;
        margin: 5px 0;
      }
      & p.subContent {
        font-size: 17px;
        color: #fff;
      }
    }
  `


  S.Apply = styled.div`
    cursor: pointer;

    & p {
      width: 60px;
      height: 40px;
      background-color: #ffd400;
      border-radius: 20px;

      font-size: 17px;
      text-align: center;
      line-height: 2.2;
      font-weight: 600;

      /* position: absolute;
      right: 0; */
    }
  `

  S.FileDown = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #000;
    text-align: center;
    line-height: 2.3;

    & svg.download {
      width: 15px;
      height: 15px;
      & path{
        /* color: #ffd400; */
      }
    }
  `

  S.Heart = styled(({ liked, ...rest }) => <div {...rest} />)`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #000;
    text-align: center;
    line-height: 2.6;

    & svg.heart {
      width: 15px;
      height: 15px;
      & path{
        color: ${(props) => (props.liked ? "#ffd400" : "#fff")}
      }
    }
  `

  S.AllButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    right: 0;
  `

  S.hr = styled.hr`
    width: 800px;
    border: 1px solid #444444;
    margin: 35px 0;
  `

export default S;