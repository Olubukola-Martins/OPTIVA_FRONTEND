
import { useGetSingleTemplate } from 'src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate'

export const AppointmentConfirmationEmail = () => {
    const { data } = useGetSingleTemplate('appointment')
    console.log('email', data)
    //id == 3
  return (
    <div>AppointmentConfirmationEmail</div>
  )
}
