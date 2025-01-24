import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../style';

const MyApplyTeam = () => {
  const navigate = useNavigate();

  return (
    <div>
      <S.Container className="container">
        <S.Wapper className="wapper">
          <S.Title className="title">
            <p>MY TEAM</p>
            <S.SubTitle className="subTitle">
              <ul>
                <li>지원한 팀 매칭 내역</li>
                <li onClick={() => navigate("/my-team/apply")}>팀원 관리</li>
              </ul>
            </S.SubTitle>
          </S.Title>
        </S.Wapper>
      </S.Container>
    </div>
  );
};

export default MyApplyTeam;