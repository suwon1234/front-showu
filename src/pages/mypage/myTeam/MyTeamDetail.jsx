import React from 'react';
import S from './MyTeamDetailStyle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paging from '../_component/Paging';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCalendarDays, faPen, faThumbtack, faXmark } from '@fortawesome/free-solid-svg-icons';


const MyTeamDetail = ({ page, currentList, setPage, totalPost, PAGINATION, jwtToken, getTeams }) => {

  const navigate = useNavigate();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleTeamDelete = async (teamId) => {
    const confirmDelete = window.confirm("정말로 팀 매칭을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/showu/team/remove/${teamId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          alert("팀 매칭이 성공적으로 삭제되었습니다.");
          await getTeams();
          navigate("/my-team"); 
        } else {
          alert(data.message || "팀 매칭 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("팀 매칭 삭제 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }


  if (currentList.length === 0) {
    return (
      <S.NoneItem>
        <p>아직 팀 매칭을 하지 않았네요!</p>
        <p>새로운 팀을 만나 성장할 기회를 얻으세요.</p>
        <Link to={"/showu/team"}>
          <S.LinkToPath>팀 매칭 보러가기</S.LinkToPath>
        </Link>
      </S.NoneItem>
    );
  }


  return (
    <>
      <S.Container>
        <S.Wrapper>
      
          { currentList && currentList.map((team, i) => (
            <S.LessonBox key={i}>

              <S.UpdateAndDeleteButton >
                <div 
                  className='deleteButton'
                  onClick={() => navigate(`/showu/team/up-date/${team._id}`)}
                >
                  <FontAwesomeIcon icon={faPen} className='pen' />
                </div>
                <div 
                  className='updateButton'
                  onClick={() => handleTeamDelete(team._id)}
                >
                  <FontAwesomeIcon icon={faXmark} className='xmark' />
                </div>
              </S.UpdateAndDeleteButton>

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
                    {/* <span>{team.deadLine}</span> */}
                    <p>{calculateDDay(team.deadLine)}</p>
                  </div>

                  <div>
                    <p>{team.status}</p>
                  </div>

                  {/* <S.Career>
                    <FontAwesomeIcon icon={faThumbtack} />
                    <li className='lessonName'>{team.careerHistory}</li>
                  </S.Career> */}

                </S.LessonExplantion>

                <S.Period>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <li>{team.deadLine}</li>
                </S.Period>
              </ul>
          </S.LessonBox>
          ))}

          <Paging
            page={page}
            setPage={setPage}
            totalPost={totalPost}
            btnRange={PAGINATION.btnRange}
            pageRange={PAGINATION.pageRange}
          />

        </S.Wrapper>
      </S.Container>
      <S.ScrollTop onClick={handleScrollTop}>
        <FontAwesomeIcon icon={faArrowUp} className="upicon" />
      </S.ScrollTop>
    </>
  );
};

export default MyTeamDetail;