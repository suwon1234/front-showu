import React from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const TeamDetailModal = ({ showModal, selectedTeam, closeModal }) => {
  console.log("selectedTeam", selectedTeam)

  return (
    <div>
      {showModal && selectedTeam && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h2>등급업 신청 상세 정보</h2>
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalContent>
                <div className='ContentWarpper'>
                  <div className='ContentTitle'>팀 이름</div>
                  <div>{selectedTeam.team.teamName}</div>
                </div>
              </S.ModalContent>
              <S.ModalContent>
                <div className='ContentWarpper'>
                  <div className='ContentTitle'>한줄 소개</div>
                  <div>{selectedTeam.team.teamTitle}</div>
                </div>
              </S.ModalContent>
              <S.ModalContent>
                <div className='ContentWapperIntro'>
                  <div className='ContentTitle'>팀 소개</div>
                  <div>{selectedTeam.team.teamIntro}</div>
                </div>
              </S.ModalContent>
              <S.ModalContent>
                <div className='ContentWarpper'>
                  <div className='ContentTitle'>활동 시작일</div> 
                  <div>{selectedTeam.team.activityPeriodStart}</div>
                </div>
              </S.ModalContent>
              <S.ModalContent>
                <div className='ContentWarpper'>
                  <div className='ContentTitle'>등급 상태</div> 
                  <div>{selectedTeam.team.status}</div>
                </div>
              </S.ModalContent>

              {selectedTeam.file && (
                <S.ModalContent>
                  <div className='ContentWarpper'>
                    <div className='ContentTitle'>포트폴리오</div> 
                    <div>{selectedTeam.file.split("/").pop()}</div>
                  </div>{' '}
                  <a
                    href={`http://localhost:8000/admin/team/download-file/${selectedTeam.file.split('/').pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className='downloadeButton'>포트폴리오 다운로드</span>
                  </a>
                </S.ModalContent>
              )}

              
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </div>
  );
};

export default TeamDetailModal;