import { useGetSingleTemplate } from "src/features/settings/features/contractsEmailTemplates/hooks/useGetSingleTemplate"


export const OnboardingEmail = () => {
    const { data} = useGetSingleTemplate('onboarding')
    console.log('email', data)
    //id == 2
  return (
    <div>OnboardingEmail</div>
  )
}
