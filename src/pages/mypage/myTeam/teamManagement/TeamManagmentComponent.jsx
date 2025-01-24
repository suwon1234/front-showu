import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './styleTeamManagmentComponent';
import TeamManagment from './TeamManagment';

const PAGINATION = {
  pageRange: 10,
  btnRange: 3,
};

const TeamManagmentComponent = () => {
  const navigate = useNavigate();

  return (
    <S.Container className="container">
      <S.Wapper className="wapper">
        <S.Title className="title">
          <p>MY TEAM</p>
          <S.SubTitle className="subTitle">
            <ul>
              <li onClick={() => navigate("/my-team")}>팀 매칭 내역</li>
              <li onClick={() => navigate("/my-team/management")}>팀원 관리</li>
            </ul>
          </S.SubTitle>
        </S.Title>

        {/* 팀원 관리 */}
        <TeamManagment 
          PAGINATION={PAGINATION}
        />
        
      </S.Wapper>
    </S.Container>
  );
};

export default TeamManagmentComponent;