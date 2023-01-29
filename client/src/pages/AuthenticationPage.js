import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  InputNumber,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUserStorage } from "../helpers/getUserStorage";

import imgLogin from "../img/login.svg";
import iconLogin from "../img/icon.png"

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const AuthenticationPage = () => {
  useHideMenu(true);

  const history = useHistory();
  const [user] = useState(getUserStorage());

  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);

    history.push("/home");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user.agente && user.escritorio) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Title level={2} align="center">
      <img src={iconLogin} alt="icon-turn" width={"40px"} />
        JV-TURNOS</Title>
      <Divider />

      <Row style={{alignItems: "center"}}>
        <Col span={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Nombre del trabajador"
              name="agente"
              rules={[
                { required: true, message: "Por favor ingrese su nombre" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Número de puesto de trabajo"
              name="escritorio"
              rules={[
                {
                  required: true,
                  message: "Ingrese el número de puesto de trabajo",
                },
              ]}
            >
              <InputNumber min={1} max={99} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" shape="round">
                <SaveOutlined />
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} align="center">
          <img src={imgLogin} alt="img-login" width={"400px"}/>
        </Col>
      </Row>
    </>
  );
};
