import React, { useState } from 'react';
import TeamUpdate from './TeamUpdate';

const TeamUpdateContainer = () => {
  const [filesPath, setFilesPath] = useState(null);
  const [fileName, setFileName] = useState(''); // 포트폴리오 선택한 파일 이름
  const [filesPath2, setFilesPath2] = useState(null);
  const [fileName2, setFileName2] = useState(''); // 프로필 이미지 선택한 파일 이름

  // console.log("filesPath", filesPath)
  // console.log("fileName", fileName)
  // console.log("filesPath2", filesPath2)
  // console.log("fileName2", fileName2)

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
    <div>
      <TeamUpdate 
        handleFileChange={handleFileChange}
        handleFileChange2={handleFileChange2}
        fileName={fileName}
        fileName2={fileName2}
        setFilesPath={setFilesPath}
        setFilesPath2={setFilesPath2}
      />
    </div>
  );
};

export default TeamUpdateContainer;