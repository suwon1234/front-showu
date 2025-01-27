import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateAndDeleteButton = ({ currentUser, data, S }) => {
  const navigate = useNavigate();

  return (
    <div>
      { currentUser._id === data.UserId && (
            <div>
              <S.Buttons>
                <S.Button onClick={() => navigate(`/community/write/update/${data._id}`)}>
                  수정
                </S.Button>
                <S.Button>
                  삭제
                </S.Button>
              </S.Buttons>
            </div>
          )
          }
    </div>
  );
};

export default UpdateAndDeleteButton;