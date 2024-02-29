import { useEffect, useMemo, useState } from "react";
import userService from "../../services/userService";
import { Button, Divider, Flex, Input, Modal, Select, Table } from "antd";
import { toast } from "react-toastify";

import * as C from "./style";
import { PlusOutlined } from "@ant-design/icons";
const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setMame] = useState("");
  const [login, setLogin] = useState("");
  const [workRegime, setWorkRegime] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    const result = await userService.getUsers();
    if (result.status === 200) {
      setUsers(result.data);
    } else {
      console.error(result);
      toast.error("Não foi possível listar os usuários");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
      
      setIsLoading(true);

    const result = await userService.createUser(
        { name, login, password, is_admin: Number(isAdmin), work_regime: Number(workRegime) })
        ;
    if (result.status === 200) {
      toast.success("Usuário criado com sucesso");
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success('Usuário criado com sucesso');
        loadData();
        clearInputs();
    } else {
        console.log(result)
      toast.error('Não foi possível criar o usuário, tente novamente!');
    //   setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const clearInputs = () => {
    setMame("");
    setLogin("");
    setWorkRegime('');
    setIsAdmin('');
    setPassword("");
    setPasswordConfirm("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    clearInputs();
  };

  const passwordMatch = useMemo(() => {
    if (passwordConfirm.length > 3 && password.length > 1) {
      if (password !== passwordConfirm) {
        return false;
      }
      return true;
    }

    return true;
  }, [password, passwordConfirm]);

  return (
    <C.Container>
      <C.BtnHeaderTable>
        <Button icon={<PlusOutlined />} onClick={showModal} type="primary">
          Novo
        </Button>
      </C.BtnHeaderTable>
      <Table
        dataSource={users}
        rowKey={'id'}
        key={Math.random()}
        columns={[
          {
            title: "Nome",
            dataIndex: "name",
            key: "id",
            render: (text: string) => <a>{text}</a>,
          },
          {
            title: "Login",
            dataIndex: "login",
            key: "id",
            //   render: (text) => `${text}`,
          },
          {
            title: "Administrador",
            dataIndex: "is_admin",
            key: "id",
            align: "center",
            render: (text: number) => <span>{text === 1 ? "Sim" : "Não"}</span>,
          },
          {
            title: "Jornada",
            dataIndex: "work_regime",
            key: "work_regime",
            align: "end",
            render: (text: number) => (
              <span style={{ textAlign: "center" }}>{text}h</span>
            ),
          },
        ]}
      ></Table>
      <Modal
        width={"60vw"}
        title="Novo Usuário"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Flex gap={"1rem"} style={{ marginBottom: "10px" }}>
          <Input
            placeholder="Nome"
            value={name}
            disabled={isLoading}
            onChange={(e) => setMame(e.target.value)}
          />
          <Input
            placeholder="Login"
            disabled={isLoading}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Select
            placeholder="Jornada de trabalho"
            // value={workRegime}
            disabled={isLoading}
            onChange={(e) => setWorkRegime(e)}
          >
            <Select.Option value={6}>6h</Select.Option>
            <Select.Option value={8}>8h</Select.Option>
          </Select>
          <Select
            placeholder="Administrador"
            // value={workRegime}
            disabled={isLoading}
            onChange={(e) => setIsAdmin(e)}
          >
            <Select.Option value={0}>Não</Select.Option>
            <Select.Option value={1}>Sim</Select.Option>
          </Select>
        </Flex>
        <Flex gap={"1rem"} style={{width: "100%"}}>
          <Flex style={{width: "100%", flexDirection: "column"}}>
            <Input
            disabled={isLoading}
              placeholder="Senha"
              type="password"
              value={password}
              status={!passwordMatch ? "error" : ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordMatch && <small style={{color: "red"}}>As senhas devem ser iguais</small> }
          </Flex>
          <Flex style={{width: "100%", flexDirection: "column"}}>
            <Input
              placeholder="Confirmar senha"
              type="password"
              disabled={isLoading}
              status={!passwordMatch ? "error" : ""}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {!passwordMatch && <small style={{color: "red"}}>As senhas devem ser iguais</small> }
          </Flex>
        </Flex>
        <Divider />
        <Flex justify="end">
          <Button type="primary" loading={isLoading} disabled={isLoading} onClick={handleOk}>Cadastrar</Button>
        </Flex>
      </Modal>
    </C.Container>
  );
};

export default ListUsers;
