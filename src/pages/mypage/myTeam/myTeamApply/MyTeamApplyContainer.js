import React from 'react';
import Layout from '../../_component/Layout';
import MypageContainer from '../../MypageContainer';
import MyApplyTeam from './MyApplyTeam';

const MyTeamApplyContainer = () => {
  return (
    <div>
      <Layout 
        leftContent={<MypageContainer />}
        rightContent={<MyApplyTeam />}
    />
    </div>
  );
};

export default MyTeamApplyContainer;