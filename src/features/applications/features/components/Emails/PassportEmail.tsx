
import { useGetSingleTemplate } from 'src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate'

export const PassportEmail = () => {
    const { data} = useGetSingleTemplate('softcopy')
    console.log('email', data)
    //id == 5
  return (
    <div>PassportEmail</div>
  )
}
