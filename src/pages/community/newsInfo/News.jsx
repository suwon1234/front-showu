// 뉴스 세부 화면

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import S from "./newsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import NewEditDeleteButton from "../reportEdit/NewEditDeleteButton";
import { useSelector } from "react-redux";

const News = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const response = await fetch(`http://localhost:8000/community/newsMain/${id}`, {
          method : "GET",
          headers : {
            "Authorization": `Bearer ${jwtToken}`
          }
        });
        
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        console.error("뉴스 상세 데이터 오류 발생:", error);
      }
    };

    fetchNewsById();
  }, [id]);

  console.log("news", news)

  if (!news) {
    return <S.Error>로딩 중입니다...</S.Error>;
  }


  return (
      <S.Wrapper>
      <S.TopTitle>News</S.TopTitle>
      <S.IconWrapper>
        <FontAwesomeIcon icon={faChevronDown} className='icon' />
      </S.IconWrapper>

      <S.SubWrapper>  

      <S.Titles>
          <S.MainTitle>News</S.MainTitle>
          <S.SubTitle>가장 먼저 접하는 showU 소식</S.SubTitle>
      </S.Titles>   

      <S.section>   

      <S.Title>{news.title}</S.Title>

      <NewEditDeleteButton 
        currentUser={currentUser}
        S={S}
        news={news}
      />

      <S.Line2></S.Line2>  
      <S.Images>
      <img src={`http://localhost:8000/${news.imageUrl}`} alt={news.title} />
      </S.Images>

      <S.content>{news.content}</S.content> 

      {/* <S.ButtonGroup>
                    <button onClick={handleLikeButton}>좋아요 {likeCount} </button>
                  </S.ButtonGroup> */}
      
      </S.section>

    </S.SubWrapper>
    </S.Wrapper>
  );
};

export default News;



    
