import React from 'react';
import S from './style';

const TeamList = ({ currentList, handleRowClick, handleUserRoleChange }) => {
  console.log("currentList", currentList)

  return (
    <div>
      <S.Container>
        <S.Table>
          <S.Thead>
            <S.Tr>
              <th scope="col">팀 이름</th>
              <th scope="col">활동 시작일</th>
              <th scope="col">경력사항</th>
              <th scope="col">한줄 소개</th>
              <th scope="col">분야</th>
              <th scope="col">관리</th> 
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {currentList.map((item) => (
              <S.RowTr 
                key={item._id} 
                onClick={(e) => handleRowClick(item._id, e)}  // 행 클릭 시 모달 열기
              >
                <th scope="row" className="num">{item.teamName}</th>
                <td>{item.activityPeriodStart}</td>
                <td>{item.teamLeader.role}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>
                  <S.RoleChangeButtonWrapper>
                    <button 
                      className='exportButton'
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전달되지 않도록 함
                        handleUserRoleChange(item._id, '승인');
                      }}
                    >
                      승인
                    </button>
                    <button 
                      className='rejectButton'
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleUserRoleChange(item._id, '거절');
                      }}
                    >
                      거절
                    </button>
                  </S.RoleChangeButtonWrapper>
                </td>
              </S.RowTr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.Container>
    </div>
  );
};

export default TeamList;