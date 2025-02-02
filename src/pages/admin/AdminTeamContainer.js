import React from 'react';
import Layout from '../mypage/_component/Layout';
import AdminLeftContainer from './AdminLeftContainer';
import TeamAdminComponent from './team/TeamAdminComponent';

const AdminTeamContainer = () => {
  return (
    <div>
      <Layout 
        leftContent={<AdminLeftContainer />}
        rightContent={<TeamAdminComponent />}
      />
    </div>
  );
};

export default AdminTeamContainer;