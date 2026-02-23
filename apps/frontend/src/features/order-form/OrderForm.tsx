import { Button, Form, message, Space } from "antd";
import React from "react";

import type { OrderFormValues } from "./types";
import { BasicInformationSection } from "./BasicInformationSection";
import { OrderItemsSection } from "./OrderItemsSection";

export const OrderForm: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();

  const onFinish = (_values: OrderFormValues) => {
    message.success("Order submitted!");
    form.resetFields();
  };

  return (
    <Form form={form} layout="horizontal" onFinish={onFinish} labelCol={{ span: 4 }}>
      <Space vertical style={{ width: "100%" }}>
        <BasicInformationSection />
        <OrderItemsSection />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit order
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
