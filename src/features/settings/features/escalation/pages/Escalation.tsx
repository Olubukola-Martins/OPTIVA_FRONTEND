import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import { PageIntro } from 'src/components/PageIntro';
import { AppButton } from 'src/components/button/AppButton';
import { appRoute } from 'src/config/routeMgt/routePaths';

const Escalation = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageIntro
          title="Escalation "
          description="Define, Edit and delete escalation rules on the system"
          linkBack={appRoute.settings}
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton label="Add New" />
        </div>
      </div>

      {/* <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      /> */}
    </>
  );
}

export default Escalation