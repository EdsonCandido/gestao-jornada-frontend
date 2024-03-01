
import ListUsers from "../../../components/ListUsers";
import Dashboard from "../../../layouts/Dashboard";

const AdminDashboardPage = () => {
    // const user = userStore((state) => state.user);
  return (
  
      <Dashboard>
        {
            <ListUsers/>
            
        }
      </Dashboard>
  );
};

export default AdminDashboardPage;
