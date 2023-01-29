import React, { useContext, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const CreateTicket = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const nuevoTicket = () => {
    socket.emit("solicitar-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row align="center" style={{ marginTop: 100 }}>
        <Col align="center">
          <Title level={2}>
            Presione el botón para generar un nuevo ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={nuevoTicket}
            align="center"
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }} align="center">
          <Col align="center" >
            <Text level={1}>Tickets generados</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
