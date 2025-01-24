import React, { useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const TeamApplyContainer = () => {
  const navigate = useNavigate();
  const [filesPath, setFilesPath] = useState(null);
  const [fileName, setFileName] = useState(''); // 포트폴리오 선택한 파일 이름
  const { currentUser } = useSelector((state) => state.user)
  const jwtToken = localStorage.getItem("jwtToken");
  const { id } = useParams();

  // console.log("filesPath", filesPath)
  // console.log("fileName", fileName)

  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { isSubmitting }
  } = useForm({ mode: "onSubmit" });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile)
    if (selectedFile) {
      setFileName(selectedFile.name); // 선택된 파일 이름을 상태에 저장
    } else {
      setFileName(''); // 파일이 선택되지 않은 경우 상태 초기화
    }
  };


  return (
    <S.Wrapper>
      <p className='newTeam'>팀 지원하기</p>
      <S.MoreLesson>
          <FontAwesomeIcon icon={faChevronDown} className="down" />
      </S.MoreLesson>

      <S.FormContainer>
        <S.Fieldset>
          <S.Form onSubmit={handleSubmit(async (data) => {
            console.log("form 제출")
            console.log("data", data)
            const formData = new FormData();

            //포트폴리오 파일 추가
            const fileInput = document.getElementById('portfilo');
            const selectedFile = fileInput.files[0];
            if(selectedFile){
              formData.append("portfilo", selectedFile)
            }

            formData.append("intro", data.intro)

            await fetch(`http://localhost:8000/showu/team/apply/create/${id}`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              },
              body: formData  
            })
            .then((res) => res.json())
            .then((res) => {
              if(!res.createApplySuccess){
                console.log("팀 지원 중 오류가 발생했습니다")
              }
              const newFilesPath = `http://localhost:8000${res.filePath}`;
              setFilesPath(newFilesPath);
              alert(res.message);
              console.log("팀 지원 완료")
              navigate(`/showu/team/detail/${id}`)
            })
            .catch((error) => {
              console.error("팀 지원 신청 중 오류 발생", error)
              alert("팀 지원 신청 중 오류가 발생했습니다.")
            })
          })}>

            <div>
              <S.Label htmlFor='teamName'>
                <p>지원자 성함</p>
                <span
                  id='teamName'
                >
                  {currentUser.name}
                </span>
              </S.Label>
            </div>

            <div>
              <S.LabelTextAarea htmlFor='intro'>
                <p>자기 소개</p>
                <textarea  
                  name='intro'
                  id='intro'
                  placeholder='상세 소개를 입력해주세요'
                  {...register("intro", {required : true})}
                />
              </S.LabelTextAarea>
            </div>

            <S.Portfolio>
              <S.Label htmlFor='portfilo'>
                <p>포트폴리오</p>
                <input 
                  type='file'
                  name='portfilo'
                  id='portfilo'
                  {...register("portfilo", {required : true})}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <span>{fileName ? `${fileName}` : '+자료첨부'}</span>
              </S.Label>
            </S.Portfolio>

            <S.Button
              className='submit'
              disabled={isSubmitting}
            >
              작성 완료
            </S.Button>

          </S.Form>

          <S.Button 
            onClick={() => navigate(-1)}
            className='back'
          >이전으로</S.Button>

        </S.Fieldset>
      </S.FormContainer>
    </S.Wrapper>
  );
};

export default TeamApplyContainer;