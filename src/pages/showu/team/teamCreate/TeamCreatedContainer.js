import React, { useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const TeamCreatedContainer = () => {
  const navigate = useNavigate();
  const [filesPath, setFilesPath] = useState(null);
  const [fileName, setFileName] = useState(''); // 포트폴리오 선택한 파일 이름
  const [filesPath2, setFilesPath2] = useState(null);
  const [fileName2, setFileName2] = useState(''); // 프로필 이미지 선택한 파일 이름
  const { currentUser } = useSelector((state) => state.user);
  const jwtToken = localStorage.getItem("jwtToken");

  // console.log("filesPath", filesPath)
  // console.log("fileName", fileName)
  // console.log("filesPath2", filesPath2)
  // console.log("fileName2", fileName2)

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

  const handleFileChange2 = (e) => {
    const selectedFile2 = e.target.files[0];
    console.log("selectedFile2", selectedFile2)
    if (selectedFile2) {
      setFileName2(selectedFile2.name); // 선택된 파일 이름을 상태에 저장
    } else {
      setFileName2(''); // 파일이 선택되지 않은 경우 상태 초기화
    }
  };

  return (
    <S.Wrapper>
      <p className='newTeam'>새 팀 개설</p>
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
            const fileInput = document.getElementById('file');
            const selectedFile = fileInput.files[0];
            if(selectedFile){
              formData.append("file", selectedFile)
            }

            // 프로필 이미지 파일 추가
            const fileInput2 = document.getElementById('teamProfile')
            const selectedFile2 = fileInput2.files[0];
            if(selectedFile2){
              formData.append("teamProfile", selectedFile2)
            }

            formData.append("teamName", data.teamName);
            formData.append("category", data.category);
            formData.append("teamTitle", data.teamTitle);
            formData.append("teamIntro", data.teamIntro);
            formData.append("area", data.area);
            formData.append("activityPeriodStart", data.activityPeriodStart);
            formData.append("deadLine", data.deadLine);
            formData.append("careerHistory", data.careerHistory);
            formData.append("recruit", data.recruit);

            await fetch(`http://localhost:8000/showu/team/create`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              },
              body: formData  
            })
              .then((res) => res.json())
              .then((res) => {
                if(!res.teamCreateSuccess){
                  console.log(res.message)
                }

                // console.log("filepath", res.filePath)
                // const newFilePath = `http://localhost:8000${res.filePath}`
                // setFilesPath(newFilePath);
                // console.log("newFilePath", newFilePath)

                // 포트폴리오 파일 경로 처리
                if (res.filePath) {
                  console.log('filepath', res.filePath);
                  const newFilePath = `http://localhost:8000${res.filePath}`;
                  setFilesPath(newFilePath);
                  console.log('newFilePath', newFilePath);
                }

                // 프로필 이미지 파일 경로 처리
                if (res.profileFilePath) {
                  console.log('profileFilePath', res.profileFilePath);
                  const newFilePath2 = `http://localhost:8000${res.profileFilePath}`;
                  setFilesPath2(newFilePath2);
                  console.log('newProfileFilePath', newFilePath2);
                }

                alert(res.message);
                console.log("팀 개설 완료");
                navigate("/showu/team")
              })
              .catch((error) => {
                console.error("팀 개설 중 오류 발생", error)
                alert("팀 개설 중 오류가 발생했습니다")
              })
          })} >

            <div>
              <S.Label htmlFor='teamName'>
                <p>팀 이름</p>
                <input 
                  type='text'
                  name='teamName'
                  id='teamName'
                  placeholder='팀 이름을 입력하세요'
                  {...register("teamName", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='activityPeriodStart'>
                <p>팀 활동 시작일</p>
                <input 
                  type='date'
                  name='activityPeriodStart'
                  id='activityPeriodStart'
                  {...register("activityPeriodStart", {required : true})}
                 />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='deadLine'>
                <p>팀 공고 마감일</p>
                <input 
                  type='date'
                  name='deadLine'  
                  id='deadLine'
                  {...register("deadLine", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='teamTitle'>
                <p>한줄 소개</p>
                <input 
                  type='text'
                  name='teamTitle'
                  id='teamTitle'
                  placeholder='한줄 소개를 입력해주세요'
                  {...register("teamTitle", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.LabelTextAarea htmlFor='teamIntro'>
                <p>상세 소개</p>
                <textarea  
                  name='teamIntro'
                  id='teamIntro'
                  placeholder='상세 소개를 입력해주세요'
                  {...register("teamIntro", {required : true})}
                />
              </S.LabelTextAarea>
            </div>

            <div>
              <S.Label htmlFor='area'>
                <p>지역</p>
                <input 
                  type='text'
                  name='area'
                  id='area'
                  placeholder='ex)서울시, 중랑구'
                  {...register("area", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='category'>
                <p>분야</p>
                <input 
                  type='text'
                  name='category'  
                  id='category'
                  placeholder='연기, 음악, 마술 중 선택하여 작성해주세요'
                  {...register("category", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='recruit'>
                <p>모집 인원</p>
                <input 
                  type='text'
                  name='recruit'
                  id='recruit'
                  placeholder='모집 인원수를 입력해주세요 ex)1'
                  {...register("recruit", {required : true})}
                />
              </S.Label>
            </div>

            <div>
              <S.Label htmlFor='careerHistory'>
                <p>경력</p>
                <input 
                  type='text'
                  name='careerHistory'  
                  id='careerHistory'
                  placeholder='경력무관, 신입, 경력 중 선택하여 작성해주세요'
                  {...register("careerHistory", {required : true})}
                />
              </S.Label>
            </div>

            <S.Portfolio>
              <S.Label htmlFor='file'>
                <p>포트폴리오</p>
                <input 
                  type='file'
                  name='file'
                  id='file'
                  {...register("file")}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <span>{fileName ? `${fileName}` : '+자료첨부'}</span>
              </S.Label>
            </S.Portfolio>

            <S.Portfolio>
              <S.Label htmlFor='teamProfile'>
                <p>팀 프로필 이미지</p>
                <input 
                  type='file'
                  name='teamProfile'
                  id='teamProfile'
                  {...register("teamProfile")}
                  onChange={(e) => {
                    handleFileChange2(e);
                  }}
                />
                <span>{fileName2 ? `${fileName2}` : '+자료첨부'}</span>
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

export default TeamCreatedContainer;