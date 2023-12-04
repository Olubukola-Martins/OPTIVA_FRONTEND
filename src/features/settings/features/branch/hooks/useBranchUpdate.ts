import { useState } from "react";


export const useBranchUpdate = () => {
    const [addBranch, setAddBranch] = useState(false);
    const [branchId, setBranchId] = useState<number>();
    
    const handleBranch = (id: number) => {
        setBranchId(id);
        setAddBranch(true);
      };
    
      const handleAddBranch = () => {
        setBranchId(undefined);
        setAddBranch(true);
      };
    
  return {handleBranch, handleAddBranch, branchId, addBranch, setAddBranch}
}
