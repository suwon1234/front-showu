import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../style';
import Apply from './Apply';
import usePagination from '../../../../hooks/usePagination';

const PAGINATION = {
  pageRange: 4,
  btnRange: 3,
};

const MyApplyTeam = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [ managment, setManagment ] = useState([]);

  const { page, currentList, setPage, totalPost } = usePagination({
    pageRange: PAGINATION.pageRange,
    list: managment || [],
  });

  const getTeamManagment = async () => {

    try {
      await fetch(`http://localhost:8000/showu/team/apply/`, {
        method : "GET",
        headers : {
          Authorization: `Bearer ${jwtToken}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if(!res.teamManagmentSuccess){
            console.log(res.message)
          }
          console.log(res.message)
          setManagment(res.apply)
          console.log(res.apply)
        })
    } catch (error) {
      console.error("팀원 관리 내역 불러오는 중 오류 발생", error)
    }
  }

  useEffect(() => {
    
    if(jwtToken){
      getTeamManagment();
    }

  }, [jwtToken])

  console.log("managment", managment)


  return (
    <div>
      <S.Container className="container">
        <S.Wapper className="wapper">
          <S.Title className="title">
            <p>MY TEAM</p>
            <S.SubTitle className="subTitle">
              <ul>
                <li>지원한 팀 매칭 내역</li>
              </ul>
            </S.SubTitle>
          </S.Title>

          <Apply 
            PAGINATION={PAGINATION}
            currentList={currentList}
            page={page}
            setPage={setPage}
            totalPost={totalPost}
            jwtToken={jwtToken}
            getTeamManagment={getTeamManagment}
            navigate={navigate}
          />

        </S.Wapper>
      </S.Container>
    </div>
  );
};

export default MyApplyTeam;