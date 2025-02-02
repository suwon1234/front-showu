import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAndDeleteButton = ({ currentUser, data, S }) => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  const handleTeamDelete = async (id) => {
    const confirmDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/community/write/remove/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          alert("커뮤니티 글이 성공적으로 삭제되었습니다.");
          navigate(`/community`); 
        } else {
          alert(data.message || "글 삭제에 실패했습니다.");
          navigate(`/community`); 
        }
      } catch (error) {
        console.error("글 삭제 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <div>
      { currentUser._id === data.UserId && (
            <div>
              <S.Buttons>
                <S.Button onClick={() => navigate(`/community/write/update/${data._id}`)}>
                  수정
                </S.Button>
                <S.Button onClick={() => handleTeamDelete(data._id)}>
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