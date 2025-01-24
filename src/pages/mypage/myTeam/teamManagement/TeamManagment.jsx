import React, { useEffect, useState } from 'react';
import S from './styleTeamManagment';
import { useNavigate } from 'react-router-dom';
import ManagmentModal from './_component/ManagmentModal';
import usePagination from '../../../../hooks/usePagination';
import TeamManagmentDetail from './TeamManagmentDetail';
import Paging from '../../_component/Paging';

const TeamManagment = ({ PAGINATION }) => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [ managment, setManagment ] = useState([]);
  const [selectedTeamManagment, setSelectedTeamManagment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { page, currentList, setPage, totalPost } = usePagination({
    pageRange: PAGINATION.pageRange,
    list: managment || [],
  });

  const getTeamManagment = async () => {

    try {
      await fetch(`http://localhost:8000/my/showu/managment`, {
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
          setManagment(res.managmentList)
          console.log(res.managmentList)
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeamManagment(null);
  }

  // 승인/거절 버튼 클릭 시 팀원 상태 변경
  const handleTeamMatchingChange = async (applyId, teamId, status) => {
    const data = {
      userId : applyId,
      teamId : teamId,
      isApplyStatus : status === '승인',
      applyStatus : status === '승인' ? '승인': '거절',
      status : status === '승인' ? "매칭 완료" : "매칭 대기"
    };

    console.log("data", data)

    try {
      const response = await fetch(`http://localhost:8000/my/showu/request-status/${status === '승인' ? 'approve' : 'reject'}`, {
        method : 'PUT',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((res) => {
        if(!res.ok){
          console.log(res.message)
        }
        alert(res.message)

        setManagment(prevManagment => prevManagment.map((item) => 
          item._id === applyId
            ? {...item, applyId: { ...item.applyId, staisApplyStatustus : status }}
            : item
        ))

        getTeamManagment();
        
      })
      
    } catch (error) {
      console.error("실패", error.message)
    }
  }


  const handleRowClick = async (applyId, e) => {
    if(e.target.tegName !== 'BUTTON'){
      try {
        const response = await fetch(`http://localhost:8000/my/showu/managment/${applyId}`, {
          method : 'GET',
          headers : {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json();
        setSelectedTeamManagment(data);
        setShowModal(true)
      } catch (error) {
        console.error("에러 발생: ", error)
      }
    }
  }

  console.log("managment", managment)

  console.log("selectedTeamManagment", selectedTeamManagment)

  return (
    <div>
      <TeamManagmentDetail 
        currentList={currentList}
        handleRowClick={handleRowClick}
        handleTeamMatchingChange={handleTeamMatchingChange}
        showModal={showModal}
        selectedTeamManagment={selectedTeamManagment}
        closeModal={closeModal}
      />
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

export default TeamManagment;