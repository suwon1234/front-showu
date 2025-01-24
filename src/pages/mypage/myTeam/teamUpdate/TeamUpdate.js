import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import S from '../../../showu/team/teamCreate/style';

const TeamUpdate = ({ handleFileChange, handleFileChange2, fileName, fileName2, setFilesPath, setFilesPath2 }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const jwtToken = localStorage.getItem("jwtToken");
  const { id } = useParams();

  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { isSubmitting }
  } = useForm({ mode: "onSubmit" });

  const [teamDatas, setTeamDatas] = useState({
    teamName : '',
    category : '',
    teamTitle : '',
    teamIntro : '',
    area: '',
    activityPeriodStart : '',
    deadLine : '',
    careerHistory: '',
    recruit : '',
    file: '',
    teamProfile : ''
  });

  useEffect(() => {
    const getTeamDatas = async () => {
      try {
        const response = await fetch(`http://localhost:8000/showu/team/create/${id}`, {
          method : "GET",
          headers : {
            "Authorization": `Bearer ${jwtToken}`,
          }
        })
        const data = await response.json();
        if(data) {
          setTeamDatas(data)
        }

        setValue("teamName", data.teamName || "");
        setValue("category", data.category || "");
        setValue("teamTitle", data.teamTitle || "");
        setValue("teamIntro", data.teamIntro || "");
        setValue("area", data.area || "");
        setValue("activityPeriodStart", data.activityPeriodStart || "");
        setValue("deadLine", data.deadLine || "");
        setValue("careerHistory", data.careerHistory || "");
        setValue("recruit", data.recruit || "");
        setValue("file", data.file || "");
        setValue("teamProfile", data.teamProfile || "");

      } catch (error) {
        console.error("팀 매칭 정보 가져오기 실패", error)
        console.log("팀 매칭 정보를 불러오는데 실패했습니다")
      }
    }

    if(id){
      getTeamDatas();
    }

  }, [id, jwtToken, setValue])

  return (
    <S.Wrapper>
      <p className='newTeam'>팀 수정</p>
      <S.MoreLesson>
          <FontAwesomeIcon icon={faChevronDown} className="down" />
      </S.MoreLesson>

      <S.FormContainer>
        <S.Fieldset>
          <S.Form onSubmit={handleSubmit(async (data) => {
            console.log("form 제출")
            console.log("data", data)
            const formData = new FormData();


            // 포트폴리오 파일 추가
            const fileInput = document.getElementById("file");
            const selectedFile = fileInput.files[0];
            if (selectedFile) {
              formData.append("file", selectedFile);
            } else if (teamDatas.file) {
              // 파일이 선택되지 않았으면 기존 파일 유지
              formData.append("file", teamDatas.file);
            }

            // 프로필 이미지 파일 추가
            const fileInput2 = document.getElementById("teamProfile");
            const selectedFile2 = fileInput2.files[0];
            if (selectedFile2) {
              formData.append("teamProfile", selectedFile2);
            } else if (teamDatas.teamProfile) {
              formData.append("teamProfile", teamDatas.teamProfile);
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

            await fetch(`http://localhost:8000/showu/team/modify/${id}`, {
              method: "PUT",
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              },
              body: formData  
            })
              .then((res) => res.json())
              .then((res) => {
                if(!res.modifyTeamSuccess){
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
                console.log("팀 수정 완료");
                navigate(`/showu/team/detail/${id}`)
              })
              .catch((error) => {
                console.error("팀 수정 중 오류 발생", error)
                alert("팀 수정 중 오류가 발생했습니다")
              })
          })} >

            <div>
              <S.Label htmlFor='teamName'>
                <p>팀 이름</p>
                <input 
                  type='text'
                  name='teamName'
                  id='teamName'
                  placeholder={ teamDatas.teamName || '팀 이름을 입력하세요'}
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
                  placeholder={ teamDatas.teamTitle || '한줄 소개를 입력해주세요'}
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
                  placeholder={ teamDatas.teamIntro || '상세 소개를 입력해주세요'}
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
                  placeholder={ teamDatas.area || 'ex)서울시, 중랑구'}
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
                  placeholder={ teamDatas.category || '연기, 음악, 마술 중 선택하여 작성해주세요'}
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
                  placeholder={ teamDatas.recruit || '모집 인원수를 입력해주세요 ex) 1'}
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
                  placeholder={ teamDatas.careerHistory || '경력무관, 신입, 경력 중 선택하여 작성해주세요'}
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
                <span>{fileName ? fileName : teamDatas.file ? teamDatas.file : '+자료첨부'}</span>
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
                <span>{fileName2 ? fileName2 : teamDatas.teamProfile ? teamDatas.teamProfile : '+자료첨부'}</span>
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

export default TeamUpdate;