import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/login", values);
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redicionando para página principal!");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Alguma coisa deu errado");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Faça o Login!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email:" name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password:" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            Login
          </Button>

          <Link to="/register" className="anchor mt-3">
            CLIQUE PARA REGISTRAR-SE
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
