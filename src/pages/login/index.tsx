import { Button, Input } from "antd";
import * as C from "./styles";
import { useState } from "react";

import { userStore } from "../../store/usersStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sessionService } from "../../services/sessionService";

const Login = () => {
  const navigate = useNavigate();
  const setUser = userStore((store) => store.setUser);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    let err = false;

    if (!login) {
      err = true;
      toast.error("Login não informado");
    }
    if (!password) {
      err = true;
      toast.error("senha não informado");
    }

    if (err) return;

    const result = await sessionService.login(login, password);
    if (result.status === 200) {
      setUser(result.data);

      toast.success('Login efetuado com sucesso');
      setTimeout(() => {
          navigate("/dashboard");
      }, 500)
    } else {
      toast.error(result.message);
    }
  };
  return (
    <C.Container>
      <C.FormLogin>
        <Input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
        />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <C.FormButtonSubmit>
          <Button onClick={submitForm} type="primary">
            Entrar
          </Button>
        </C.FormButtonSubmit>
      </C.FormLogin>
    </C.Container>
  );
};

export default Login;
