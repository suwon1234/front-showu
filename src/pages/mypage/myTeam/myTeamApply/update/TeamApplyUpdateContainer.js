import React, { useEffect, useRef, useState } from 'react';
import S from './StyleApplyUpdate';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const TeamApplyUpdateContainer = () => {
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
    formState: { isSubmitting, errors }
  } = useForm({ mode: "onSubmit" });

  console.log("폼 에러 상태:", errors);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile.name)
    if (selectedFile) {
      setFileName(selectedFile.name); // 선택된 파일 이름을 상태에 저장
    } else {
      setFileName(''); // 파일이 선택되지 않은 경우 상태 초기화
    }
  };

  const [ applyDatas, setApplyDatas ] = useState([]);

  useEffect(() => {
    const getApplyDatas = async () => {
      try {
        const response = await fetch(`http://localhost:8000/showu/team/apply/${id}`, {
          method : "GET",
          headers : {
            "Authorization": `Bearer ${jwtToken}`,
          }
        })
        const data = await response.json();
        if(data) {
          setApplyDatas(data.detailApply)
        }
        // console.log("data", data.detailApply)

        setValue("intro", data.detailApply.intro || "");
        setValue("portfilo", data.detailApply.portfilo || "");

      } catch (error) {
        console.error("팀 지원 정보 가져오기 실패", error)
        console.log("팀 지원 정보를 불러오는데 실패했습니다")
      }
    }

    if(id){
      getApplyDatas();
    }

  }, [id, jwtToken, setValue])

  console.log("applyDatas", applyDatas)
  console.log("applyDatas.map", applyDatas.map(item => item.intro))
  // console.log("applyDatas.intro", applyDatas.intro)


  return (
    <S.Wrapper>
      <p className='newTeam'>팀 지원 수정하기</p>
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
            // const fileInput = document.getElementById('portfilo');
            // const selectedFile = fileInput.files[0];
            // if(selectedFile){
            //   formData.append("portfilo", selectedFile)
            // }
            
            // 파일 추가 코드
            const fileInput = document.getElementById("portfilo");
            const selectedFile = fileInput?.files[0];
            if (selectedFile) {
              formData.append("portfilo", selectedFile);
            } else {
              alert("포트폴리오 파일을 선택해주세요.");
              return;
            }
            
            formData.append("intro", data.intro)

            await fetch(`http://localhost:8000/showu/team/apply/modify/${id}`, {
              method: "PUT",
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              },
              body: formData  
            })
            .then((res) => res.json())
            .then((res) => {
              if(!res.modifySuccess){
                console.log("팀 지원 수정 중 오류가 발생했습니다")
              }
              const newFilesPath = `http://localhost:8000${res.filePath}`;
              setFilesPath(newFilesPath);
              console.log("newFilesPath", newFilesPath)
              alert(res.message);
              console.log("팀 지원 수정 완료")
              navigate(`/showu/team/apply/${id}`)
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

            { applyDatas && applyDatas.map((item, i) => (
              <div key={i}>
                <div>
                  <S.LabelTextAarea htmlFor='intro'>
                    <p>자기 소개</p>
                    <textarea
                      name='intro'
                      id='intro'
                      placeholder={item.intro || '상세 소개를 입력해주세요'}
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
                      // ref={fileInputRef}
                      {...register("portfilo")}
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                    <span>{fileName ? fileName : item.portfilo.split("/").pop() ? item.portfilo.split("/").pop() : '+자료첨부'}</span>
                  </S.Label>
                </S.Portfolio>
            </div>
            ))
            }

            <S.Button
              className='submit'
              type='submit'
              disabled={isSubmitting}
            >
              수정 완료
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

export default TeamApplyUpdateContainer;