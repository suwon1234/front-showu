import React, { useEffect, useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const TeamDetailContainer = () => {
  const [ teams, setTeams ] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [ liked, setLiked ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken"); 


  useEffect(() => {
    const getLiked = async () => {
      try {
        const response = await fetch(`http://localhost:8000/showu/team/like/${id}`, {
          method : "GET",
          headers : {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`
          }
        })
        .then((res) => res.json())
        .then((res) => {
          if(!res.ok){
            console.log(res.message)
          }
          setLiked(res.liked)
          console.log(res.message)
        })
      } catch (error) {
        console.error("get team liked error", error)
      }
    }

    getLiked();

  }, [id])

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true)

    const newLiked = !liked;
    setLiked(newLiked);

    try {
      const response = await fetch(`http://localhost:8000/showu/team/add-like/${id}`, {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
        if(!res.ok){
          console.log(res.message)
        }
        setLiked(res.liked)
        console.log(res.message)
        alert(res.message)
        getTeamDetails();
      })
    } catch (error) {
      console.error("좋아요 버튼 오류", error)
    } finally {
      setLoading(false)
    }

  }

  const getTeamDetails = async () => {
    try {
      await fetch(`http://localhost:8000/showu/team/detail/${id}`, {
        method : "GET",
        headers : {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if(!res.teamDetailSuccess){
            console.log(res.message)
          }
          setTeams(res.teamList)
          console.log(res.message);
          console.log(res.teamList);
        })
    } catch (error) {
      console.log("team detail Error", error)
    }
  }

  useEffect(() => {
    getTeamDetails();
  }, [])

  // console.log("teams", teams.map(item => item.file))
  console.log("teams", teams)

  // 모집 인원 확인 함수
  const isRecruitmentClosed = (recruit, currentMemberCount) => {
    return currentMemberCount >= recruit;
  };

  return (
    <div>
      { teams && teams.map((item, i) => (
        <div key={i}>
          <S.Wrapper>
            {/* 배너 */}
            <S.Banner>
              <img
                src='/images/showu/team/teamBanner.png'
                className='banner'
              ></img>
              <img
                src={`http://localhost:8000${item.teamProfile}`}
                className='profilo'
              ></img>
            </S.Banner>
          </S.Wrapper>
          <S.SectoinWarpper>
            <S.RightSection>

            {/* 팀 매칭 제목, 찜, 지원 버튼 */}
              <S.Title>
                <p className='title'>{item.teamTitle}</p>
                <S.AllButton>
                  {item.file && (
                    <S.FileDown>
                      <a 
                        href={`http://localhost:8000/showu/team/down-file/${item.file.split('/').pop()}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <FontAwesomeIcon icon={faDownload} className='download'/>
                      </a>
                    </S.FileDown>
                    )}

                  <S.Heart onClick={toggleLike} liked={liked}>
                    <FontAwesomeIcon icon={faHeart} className='heart' />
                  </S.Heart>

                  {/* 모집 인원 다 차면 지원 버튼 마감으로 변경 */}
                  {isRecruitmentClosed(item.recruit, item.currentMemberCount) ? (
                    <S.Apply disabled>
                      <p>마감</p>
                    </S.Apply>
                  ) : (
                    <S.Apply
                      onClick={() => navigate(`/showu/team/apply/${item._id}`)}
                    >
                      <p>지원</p>
                    </S.Apply>
                  )}

                </S.AllButton>
              </S.Title>

              <S.hr />

              {/* 모집 유형 */}
              <S.JobContent>
                <p>모집 유형</p>
                <div>
                  <div>
                    <S.Row className='row'>
                      <span>분야</span>
                      <div className='col1'>
                        <span>{item.category}</span>
                      </div>
                    </S.Row>
                    <S.Row className='row'>
                      <span>경력</span>
                      <div className='col2'>
                        <span>{item.careerHistory}</span>
                      </div>
                    </S.Row>
                    <S.Row className='row'>
                      <span>모집인원</span>
                      <div className='col'>
                        <span>{item.recruit}</span>
                      </div>
                    </S.Row>
                  </div>
                </div>
              </S.JobContent>

              <S.hr />

              {/* 팀매칭 내용 */}
              <S.Content>
                <p className='content'>내용</p>
                <p className='intro'>{item.teamIntro}</p>
              </S.Content>
              <S.hr />
            </S.RightSection>

            {/* 팀 소개 */}
            <S.LeftSection>
              <p className='rightTitle'>팀 소개</p>
              <S.TeamIntro>
                <img
                  src={`http://localhost:8000${item.teamProfile}`}
                  className='profilo'
                >
                </img>
                <div>
                  <p className='rightSubTitle'>{item.teamName}</p>
                  <p className='rightSubTitle'>{item.categoty}</p>
                </div>
              </S.TeamIntro>

              <S.LeftContent>
                <div>
                  <p className='subTitle'>소개</p>
                  <p className='subContent'>{item.teamTitle}</p>
                </div>
                <div>
                  <p className='subTitle'>위치</p>
                  <p className='subContent'>{item.area}</p>
                </div>
                <div>
                  <p className='subTitle'>팀 활동 시작일</p>
                  <p className='subContent'>{item.activityPeriodStart}</p>
                </div>
                <div>
                  <p className='subTitle'>팀 공고 마감일</p>
                  <p className='subContent'>{item.deadLine}</p>
                </div>
              </S.LeftContent>
            </S.LeftSection>

          </S.SectoinWarpper>
        </div>
      ))
        }

    </div>
  );
};

export default TeamDetailContainer;