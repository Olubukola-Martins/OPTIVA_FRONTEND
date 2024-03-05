
import { useGetSingleTemplate } from 'src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate'

export const BankSubmissionEmail = () => {
    const { data } = useGetSingleTemplate('submission')
    console.log('email', data)
    //id == 7
  return (
    <div>BankSubmissionEmail</div>
  )
}
