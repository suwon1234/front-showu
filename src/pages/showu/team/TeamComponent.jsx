import React from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import Paging from '../../mypage/_component/Paging';

const TeamComponent = ({ navigate, filteredProducts, page, setPage, totalPost, PAGINATION }) => {

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
  
  return (
      <div>
        <S.LessonWrapper>
          {filteredProducts.map((team, i) => (
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

                  <div>
                    <p>{calculateDDay(team.deadLine)}</p>
                  </div>

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
      </div>
  );
};

export default TeamComponent;