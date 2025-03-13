import React from 'react';
import { faCalendarDays, faHeart, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paging from '../../_component/Paging';
import S from './LikeTeamStyle';
import { Link } from 'react-router-dom';

const LikeTeamComponent = ({ page, currentList, setPage, totalPost, PAGINATION, navigate }) => {

  //마감 공고일 d-day 함수
  function calculateDDay(deadLine) {
    const today = new Date();
    const endDate = new Date(deadLine);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if(diffDays > 0){
      return `D-${diffDays}`
    } else if (diffDays === 0){
      return "D-Day"
    } else {
      return "마감된 공고"
    }
  }

  if (currentList.length === 0) {
    return (
      <S.NoneItem>
        <p>아직 찜한 아이템이 없네요!</p>
        <p>마음에 드는 아이템을 찜해보세요.</p>
        <Link to={"/showu/team"}>
          <S.LinkToPath>팀매칭 보러가기</S.LinkToPath>
        </Link>
      </S.NoneItem>
    );
  }

  return (
    <>
      <S.LessonWrapper>
          {currentList && currentList.map((team, i) => (
            <S.LessonBox key={i}>
              <ul>
                <S.UserInfo>  
                  <img src={`http://localhost:8000${team.teamProfile}`} alt="team profile"></img>
                  <div>
                    <li className='teamName'>{team.teamName}</li>
                    <li className='category'>{team.category}</li>
                  </div>
                </S.UserInfo>

                <S.Hr />

                <S.category>
                  {/* <li className='total'>{team.userName.role}</li> */}
                  <li className='category'>{team.category}</li>
                </S.category>

                <S.LessonExplantion>
                  <li className='lessonDetail'
                    onClick={() => navigate(`/showu/team/detail/${team._id}`)}
                  >{team.teamIntro}</li>

                  {/* <div>
                    <p>{calculateDDay(team.deadLine)}</p>
                  </div> */}

                  <S.Career>
                    <FontAwesomeIcon icon={faThumbtack} />
                    <li className='lessonName'>{team.careerHistory}</li>
                  </S.Career>

                </S.LessonExplantion>

                <S.Period>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <li>{team.deadLine}</li>
                </S.Period>
              </ul>
            </S.LessonBox>
          ))}
        </S.LessonWrapper>

        <br />
        <br />

      <Paging 
        page={page}
        setPage={setPage}
        totalPost={totalPost}
        btnRange={PAGINATION.btnRange}
        pageRange={PAGINATION.pageRange}
      />  
    </>
  );
};

export default LikeTeamComponent;