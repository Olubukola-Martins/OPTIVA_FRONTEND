import { useGetSingleTemplate } from "src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate"


export const ApplicationApprovalEmail = () => {
    const { data } = useGetSingleTemplate('approval')
    console.log('email', data)
    //id == 6
  return (
    <div>ApplicationApprovalEmail</div>
  )
}
