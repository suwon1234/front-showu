import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import UpgradeDetailModal from '../upgrade/UpgradeDetailModal';
import UpgradeList from '../upgrade/UpgradeList';
import Paging from '../../mypage/_component/Paging';
import S from './style';
import TeamList from './TeamList';
import TeamDetailModal from './TeamDetailModal';

const PAGINATION = {
  pageRange: 10,
  btnRange: 3,
};

const TeamAdminComponent = () => {
  const [adminList, setAdminList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const jwtToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate();

  const { page, currentList, setPage, totalPost } = usePagination({
    pageRange: PAGINATION.pageRange,
    list: adminList || [],
  });

  useEffect(() => {
    // 관리자 권한이 아니거나 토큰이 없을 경우 로그인 페이지로 이동
    if (currentUser.role !== 'admin' && !jwtToken) {
      navigate('/login');
    }
  }, [currentUser, jwtToken, navigate]);

 // 등급업 신청 내역 불러오기
  const getAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:8000/admin/team/all-data`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error status: ${response.message}`);
      }
      const datas = await response.json();
      setAdminList(datas.Teams); 
    } catch (error) {
      console.error('GetAdminError', error);
    }
  };

  // getAdmin을 jwtToken이 있을 때만 호출
  useEffect(() => {
    if (jwtToken) {
      getAdmin();
    }
  }, [jwtToken]);

  const closeModal = () => {
    setShowModal(false); 
    setSelectedTeam(null); 
  };

  // 승인/거절 버튼 클릭 시 유저 상태 변경
  const handleUserRoleChange = async (teamId, status) => {
    const data = {
      teamId: teamId,
      status : "매칭 완료",
    };
  
    try {
      const response = await fetch(`http://localhost:8000/admin/team/request-status/${status === '승인' ? 'complete' : 'reject'}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
  
        // 상태 변경된 유저만 업데이트
        setAdminList(prevAdminList => prevAdminList.map((item) =>
        item._id === teamId
          ? { ...item, status : status }
          : item
      ));

      getAdmin();

      } else {
        console.error('실패:', result.message);
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };
  

  const handleRowClick = async (teamId, e) => {
    // 버튼 클릭이 아닌 경우에만 모달을 열도록 처리
    if (e.target.tagName !== 'BUTTON') {
      try {
        const response = await fetch(`http://localhost:8000/admin/team/${teamId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSelectedTeam(data); 
        setShowModal(true); 
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }
  };
  
  

  return (
    <div>
      <S.Title>team 관리</S.Title>
      <S.SubTitle>
        <ul>
          <li>team 개설 신청 내역</li>
        </ul>
      </S.SubTitle>
      <TeamList 
        currentList={currentList}
        handleRowClick={handleRowClick}
        handleUserRoleChange={handleUserRoleChange}
      />
      <Paging 
        page={page}
        setPage={setPage}
        totalPost={totalPost}
        btnRange={PAGINATION.btnRange}
        pageRange={PAGINATION.pageRange}
      />

      {/* 모달창 */}
      <TeamDetailModal 
        showModal={showModal}
        selectedTeam={selectedTeam}
        closeModal={closeModal}
      />
    </div>
  );
};

export default TeamAdminComponent;