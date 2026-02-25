import DashHeader from "../../components/dashboard/DashHeader";
import DashPath from "../../components/dashboard/DashPath";

function Dashboard() {
  return (
    <div className="m-2 space-y-5">
      <DashPath />
      <DashHeader />
    </div>
  );
}

export default Dashboard;
