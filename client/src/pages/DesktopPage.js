import React, { useContext, useState } from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";

import { Redirect, useHistory } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUserStorage } from "../helpers/getUserStorage";
import { SocketContext } from "../context/SocketContext";

import desktopImg from "../img/desktop.svg";

const { Title, Text } = Typography;

export const DesktopPage = () => {
  useHideMenu(false);

  const [user] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const history = useHistory();

  const salir = () => {
    localStorage.clear();
    history.replace("/login");
  };

  const siguienteTicket = () => {
    socket.emit("siguiente-ticket-trabajar", user, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!user.agente || !user.escritorio) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agente}</Title>
          <Text>Usted está trabajando en el puesto número: </Text>
          <Text type="success"> {user.escritorio} </Text>
        </Col>

        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Cerrar sesión
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Está atendiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={siguienteTicket} shape="round" type="primary">
            <RightOutlined />
            Atender nuevo usuario
          </Button>
        </Col>
      </Row>
      <Row align="center">
        <Col >
          <img src={desktopImg} alt="img-login" width={"400px"} />
        </Col>
      </Row>
    </>
  );
};
