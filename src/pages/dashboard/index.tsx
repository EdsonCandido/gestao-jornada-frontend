
import ListUsers from "../../components/listuser";
import Dashboard from "../../layouts/Dashboard";
import { userStore } from "../../store/usersStore";
import * as C from "./style";
const DashboardPage = () => {
    const user = userStore((state) => state.user);
  return (
    <C.Container>
      {/* <h1>Dashboard</h1> */}
      <Dashboard>
        {
            user!.is_admin === 1 ? <ListUsers /> : <></>
        }
      </Dashboard>
    </C.Container>
  );
};

export default DashboardPage;
