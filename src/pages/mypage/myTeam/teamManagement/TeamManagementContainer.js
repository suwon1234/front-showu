import React from 'react';
import Layout from '../../_component/Layout';
import TeamManagmentComponent from './TeamManagmentComponent';
import MypageContainer from '../../MypageContainer';

const TeamManagementContainer = () => {
  return (
    <Layout 
      leftContent={<MypageContainer />}
      rightContent={<TeamManagmentComponent />}
    />
  );
};

export default TeamManagementContainer;