import React, { useEffect, useState } from 'react';
import S from './style';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const WriteUpdateContainer = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [filesPath, setFilesPath] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [updateUser, setUpdateUser] = useState([]);
  const { id } = useParams();

  const { register, handleSubmit, getValues, setValue,
    formState : { isSubmitting, errors }
  } = useForm({ mode : "onSubmit" });

  const handleBack = () => {
    const userCheck = window.confirm(
      "커뮤니티 홈 화면으로 이동합니다. 이동하시겠습니까?"
    );
    if (userCheck) {
      navigate("/community");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile)
    if (selectedFile) {
      setFileName(selectedFile.name); // 선택된 파일 이름을 상태에 저장
    } else {
      setFileName(''); // 파일이 선택되지 않은 경우 상태 초기화
    }
  };

  useEffect(() => {
    const getCommuPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/community/write/update/detail/${id}`, {
          method : "GET",
          headers : {
            'Authorization': `Bearer ${jwtToken}`
          }
        })
        .then((res) => res.json())
        .then((res) => {
          if(!res.ok){
            console.log(res.message)
          }
          setUpdateUser(res.commuPost)
          console.log(res.message)
        })
      } catch (error) {
        console.error("작성한 글 데이터 불러오는 중 에러 발생", error)
      }
    }

    getCommuPost();

  }, [jwtToken, id])

  // console.log("updateUser", updateUser)
  // console.log("updateUser", updateUser.map((item) => item.title))

  return (
    <div>
      <S.Wrapper>
      <S.TopTitle>커뮤니티</S.TopTitle>

      <S.IconWrapper>
        <FontAwesomeIcon icon={faChevronDown} className="icon" />
      </S.IconWrapper>

      <S.SubWrapper>
        {/* <S.Titles>
          <S.ButtonsAll>
            <button onClick={handleEdit}>수정/삭제하기</button>
          </S.ButtonsAll>
        </S.Titles> */}

        <S.box>글 수정하기</S.box>
        <form onSubmit={handleSubmit(async (data) => {
          console.log("form 제출");
          console.log("data", data);
          const formData = new FormData();


          // 파일 추가
          const fileInput = document.getElementById('file');
          const selectedFile = fileInput.files[0];
          if (selectedFile) {
            formData.append("file", selectedFile); 
          } else {
            alert("파일을 선택해주세요.");
            return;
          }

          formData.append("title", data.title);
          formData.append("content", data.content);
          formData.append("category", data.category);

          await fetch(`http://localhost:8000/community/write/update/${id}`, {
            method : "PUT",
            headers : {
              'Authorization': `Bearer ${jwtToken}`
            },
            body : formData
          })
          .then((res) => res.json())
          .then((res) => {
            if(!res.createSuccess){
              alert(res.message)
              navigate(`/community/communityInfo/${id}`)
              return;
            }
            const newFilesPath = `http://localhost:8000${res.filePath}`;
            setFilesPath(newFilesPath);
            alert(res.message);
            navigate(`/community/communityInfo/${id}`)
            console.log("커뮤니티 글 수정 완료");
          })
          .catch((error) => {
            console.error("글 수정 중 오류 발생", error);
            alert("글 수정 중 오류가 발생했습니다.");
          })

        })}>
          <S.border>
            { updateUser && updateUser.map((item, i) => (
              <S.Input key={i}>
              <div>
                <label>제목</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  placeholder={ item.title || "제목을 입력하세요"} 
                  {...register("title", { required : true })}
                />
              </div>

              <div>
                <label>카테고리</label>
                <S.ReasonSelect>
                  <select 
                    {...register("category", { 
                      required: true,
                      validate: (value) => value !== "choose" || "카테고리를 선택하세요",
                    })}>
                    <option value="choose">{item.category}</option>
                    <option value="전체">전체</option>
                    <option value="공연">공연</option>
                    <option value="뮤지컬">뮤지컬</option>
                    <option value="영화">영화</option>
                    <option value="연극">연극</option>
                    <option value="밴드">밴드</option>
                  </select>
                </S.ReasonSelect>
              </div>

              <div>
                <label>내용</label>
                <textarea
                  className="textArea"
                  id="content"
                  name="content"
                  placeholder={ item.content || "내용을 입력하세요"}
                  {...register("content", { required : true })}
                />
              </div>

              <div>
                <label>첨부 파일</label>
                <S.FileInput
                  id="file"
                  type="file"
                  name="file"
                  {...register("file")}
                  onChange={(e) => {
                    handleFileChange(e)
                  }}
                />
                <p>첨부 파일은 최대 5MB까지 등록할 수 있습니다.</p>
              </div>

              {/* 업로드된 이미지 미리보기 */}
              {imageUrl && (
                <div>
                  <p>업로드된 이미지 미리보기:</p>
                  <img
                    src={imageUrl}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }}
                  />
                </div>
              )}


            </S.Input>
            ))
            }

            <S.buttonWrapper>
              <button onClick={handleBack}>이전 화면으로</button>
              <button
                // disabled={!isButtonActive || isSubmitting}
                disabled={isSubmitting}
                className={isButtonActive ? "activeButton" : "inactiveButton"}
              >
                수정하기
              </button>
            </S.buttonWrapper>
          </S.border>
        </form>

      </S.SubWrapper>
    </S.Wrapper>
    </div>
  );
};

export default WriteUpdateContainer;