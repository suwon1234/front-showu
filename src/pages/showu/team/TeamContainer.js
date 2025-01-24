import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronDown, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import S from './style';
import usePagination from '../../../hooks/usePagination';
import TeamComponent from './TeamComponent';

const PAGINATION = {
  pageRange: 6,
  btnRange: 3,
};

const TeamContainer = () => {
  const [ teams, setTeams ] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("전체");

  const { page, currentList, setPage, totalPost } = usePagination({
    pageRange: PAGINATION.pageRange,
    list: teams || [],
  });


  useEffect(() => {
    const getTeamList = async () => {
      try {
        const response = await fetch(`http://localhost:8000/showu/team/`, {
          method : "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const res = await response.json();
        if (!res.mainTeamSuccess) {
          console.log(res.message);
        } else {
          setTeams(res.teamList); 
        }
      } catch (error) {
        console.error("main getTeamList error", error);
      }
    }

    getTeamList();

  }, [])

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const filteredProducts = currentCategory === "전체"
  ? currentList
  : currentList.filter((team) => team.category === currentCategory);

  const navigate = useNavigate();
  

  // console.log("teams", teams)

  return (
    <S.Wrapper>
      <p>팀 매칭</p>
          <S.MoreLesson>
            <FontAwesomeIcon icon={faChevronDown} className="down" />
          </S.MoreLesson>

          {/* 팀 개설 버튼 */}
          <S.TeamCreateButton>
            <div onClick={() => navigate("/showu/team/create")}>팀 개설하기</div>
          </S.TeamCreateButton>

          <S.CategoryButtonWrapper>
            {["전체", "연기", "음악", "마술"].map((category) => (
              <S.CategoryButton
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={currentCategory === category ? 'active' : ''}
              >
                {category}
              </S.CategoryButton>
            ))}
          </S.CategoryButtonWrapper>
          
          <TeamComponent 
            navigate={navigate}
            handleCategoryChange={handleCategoryChange}
            filteredProducts={filteredProducts}
            currentCategory={currentCategory}
            page={page} setPage={setPage} 
            currentList={currentList} 
            totalPost={totalPost}
            PAGINATION={PAGINATION}
          />
    </S.Wrapper>
  );
};

export default TeamContainer;