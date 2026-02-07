import DashFrame from "../../components/dashboard/DashFrame";
import DashHeader from "../../components/dashboard/DashHeader";
import DashPath from "../../components/dashboard/DashPath";

function Dashboard() {
  return (
    <DashFrame>
      <DashPath />
      <DashHeader />
    </DashFrame>
  );
}

export default Dashboard;
