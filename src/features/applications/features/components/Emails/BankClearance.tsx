
import { useGetSingleTemplate } from 'src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate'

export const BankClearance = () => {
    const {data } = useGetSingleTemplate('clearance')
    console.log('email', data)
    //id === 4
  return (
    <div>BankClearance</div>
  )
}
