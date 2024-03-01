import { useEffect, useState } from "react";
import * as A from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Modal, Table } from "antd";
import journeyPointsService from "../../services/journeyPoints";
import { userStore } from "../../store/usersStore";
import { toast } from "react-toastify";
import {
  convertDate,
  formatarHoras,
} from "../../utils/formatDate";

import locale from "antd/es/date-picker/locale/pt_BR";

import "dayjs/locale/pt-br";

const ListJourneyPoints = () => {
  const user = userStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journeyPoints, setJourneyPoints] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [dtInicio, setDtInicio] = useState("");


  const loadData = async () => {
    setIsLoadingTable(true);
    const result = await journeyPointsService.findById(user!.id);

    if (result.status === 200) {
      setJourneyPoints(result.data);
      setIsLoadingTable(false);
    } else {
      console.error(result);
      setIsLoadingTable(false);
      toast.error(
        "Não foi possível obter os pontos de jornada, tente novamente!"
      );
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    dtInicio
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (_: unknown, dateString: any) => {
    // console.log(date, dateString);
    setDtInicio(dateString);
  };
  return (
    <A.Container>
      <A.BtnHeaderTable>
        <Button icon={<PlusOutlined />} onClick={showModal} type="primary">
          {" "}
          Novo{" "}
        </Button>
      </A.BtnHeaderTable>

      <Table
        dataSource={journeyPoints}
        loading={isLoadingTable}
        rowKey={"id"}
        key={Math.random()}
        columns={[
          {
            title: "H. inicio",
            dataIndex: "prohibited",
            key: "1",
            align: "center",
            render: (text: string) => <span>{convertDate(text)}</span>,
          },
          {
            title: "H. fim",
            dataIndex: "outputs",
            key: "2",
            align: "center",
            render: (text: string) => <span>{convertDate(text)}</span>,
          },
          // {
          //   title: "H. trabalhadas",
          //   dataIndex: "outputs",
          //   key: "2",
          //   align: "center",
          //   render: (_, recoder) => <span>{diffInHorus( recoder.prohibited, recoder.outputs)}</span>,
          // },
          {
            title: "Saldo",
            dataIndex: "outputs",
            key: "2",
            align: "center",
            render: (_, recoder: {prohibited: string,outputs: string }) => (
              <span>
                {formatarHoras(
                  recoder?.prohibited,
                  recoder?.outputs,
                  user!.work_regime
                )}
              </span>
            ),
          },
          {
            title: "Ações",
            align: "center",
            dataIndex: "actions",
            key: "3",
            render: (element: unknown) => (
              <Button onClick={() => console.log(element)} title="Add" />
            ),
          },
        ]}
      >
        {" "}
      </Table>
      <Modal
        width={"60vw"}
        title="Novo registro"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <DatePicker
          placeholder="Horário de início"
          locale={locale}
          onChange={onChange}
          showTime
          needConfirm={false}
        />

        <Flex justify="end">
        <Button  type="primary" onClick={handleOk}>Salvar</Button>
        </Flex>
      </Modal>
    </A.Container>
  );
};

export default ListJourneyPoints;
