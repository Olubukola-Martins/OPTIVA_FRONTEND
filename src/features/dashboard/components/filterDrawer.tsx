

import { Drawer, Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AppButton } from 'src/components/button/AppButton';
import { useGetCountry } from 'src/features/settings/features/program-types/hooks/useGetCountry';
import { useGetProgramType } from 'src/features/settings/features/program-types/hooks/useGetProgramType';
import { IFilterProps, useDashboardFilterValues } from '../hooks/useDashboardFilterValues';
import { useState } from 'react';


// setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
interface IProps { isDrawerOpen: boolean;  handleClose: () => void};

const FilterDrawer = ({ isDrawerOpen,  handleClose }:IProps) => {
      const { data: allProgramTypes, isLoading: loadingProgramTypes } =
    useGetProgramType();
  const { data: countries, isLoading: loadingCountries } = useGetCountry();
//   const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [filterForm] = useForm();
    const { setFilterValues } = useDashboardFilterValues();

    const handleFilter = (values: IFilterProps) => {
        if (values) {
            setFilterValues(values);
            handleClose()
      }
    };
    
  return (
    <Drawer
  open={ isDrawerOpen}
  onClose={handleClose}
  size={"default"}
  title="Filter Prospects"
>
  <Form
    name="modalFilter"
    form={filterForm}
    layout="vertical"
    className="pt-8 px-4"
    onFinish={handleFilter}
  >
    <Form.Item label="Filter by Country" name="countryFilter" className="w-56">
      <Select
        mode="multiple"
        loading={loadingCountries}
        options={
          countries?.map((country) => {
            return { value: country.id, label: country.country_name };
          }) || []
        }
      />
    </Form.Item>
    <Form.Item
      label="Filter by Program Type"
      name="filterProgram"
      className="w-56"
    >
      <Select
        mode="multiple"
        loading={loadingProgramTypes}
        options={
          allProgramTypes?.map((programType) => {
            return {
              value: programType.id,
              label: programType.program_name,
            };
          }) || []
        }
      />
    </Form.Item>
    <AppButton label="Apply Filter" type='submit'/>
  </Form>
</Drawer>

  )
}

export default FilterDrawer


