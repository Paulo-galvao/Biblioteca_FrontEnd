import DashFrame from "../../components/dashboard/DashFrame";
import DashPath from "../../components/dashboard/DashPath";
import UpdateUserInformations from "../../components/user/UpdateUserInformations";
import UpdateUserPassword from "../../components/user/UpdateUserPassword";

function UpdateUser() {
  

  return (
    <DashFrame>
      <DashPath path="> Atualizar seus dados"></DashPath> 
      <UpdateUserInformations />
      <UpdateUserPassword />
    </DashFrame>
    
  );
}

export default UpdateUser;
