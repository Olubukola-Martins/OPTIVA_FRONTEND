import { PageIntro } from 'src/components/PageIntro';
import { appRoute } from 'src/config/routeMgt/routePaths';
import { EditFeesTab } from '../components/EditFeesTab';

const EditFees = () => {
    return (
        <>
            <PageIntro
                title="Edit Fees"
                linkBack={appRoute.defineFeesAndAuthorizedPersons}
            />
    
            <EditFeesTab />
         
        </>
    );
}

export default EditFees