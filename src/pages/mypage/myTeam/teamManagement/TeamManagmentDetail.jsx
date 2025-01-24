import React from 'react';
import S from './styleTeamManagment';
import ManagmentModal from './_component/ManagmentModal';

const TeamManagmentDetail = ({ handleRowClick, handleTeamMatchingChange, currentList, showModal, selectedTeamManagment, closeModal }) => {
  return (
    <div>
      <S.Container>
          <S.Table>
            <S.Thead>
              <S.Tr>
                <th scope="col">전문가 성함</th>
                <th scope="col">전문분야</th>
                <th scope="col">경력사항</th>
                <th scope="col">회원 등급</th>
                <th scope="col">승인상태</th>
                <th scope="col">관리</th>
              </S.Tr>
            </S.Thead>
            <S.Tbody>
              { currentList && currentList.map((item) => (
                <S.RowTr
                  key={item._id}
                  onClick={(e) => handleRowClick(item._id, e)}  // 행 클릭 시 모달 열기
                >
                  <th scope="row" className="num">{item.applyId.name}</th>
                  <td>{item.upgradeId.field}</td>
                  <td>{item.upgradeId.total}</td>
                  <td>{item.applyId.role}</td>
                  <td>{item.applyStatus}</td>
                  <td>
                    <S.RoleChangeButtonWrapper>
                      <button
                        className='exportButton'
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전달되지 않도록 함
                          handleTeamMatchingChange(item.applyId, item.teamId._id, '승인');
                        }}
                      >
                        승인
                      </button>
                      <button
                        className='rejectButton'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTeamMatchingChange(item.applyId._id, item.teamId._id, '거절');
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

        {/* 모달창 */}
        <ManagmentModal 
          showModal={showModal}
          selectedTeamManagment={selectedTeamManagment}
          closeModal={closeModal}
        />
    </div>
  );
};

export default TeamManagmentDetail;