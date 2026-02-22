import { Button, Card, Form, Input, InputNumber, message } from "antd";
import React from "react";

interface NewOrderFormValues {
  customerName: string;
  item: string;
  quantity: number;
  notes?: string;
}

export const NewOrder: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (_values: NewOrderFormValues) => {
    message.success("Order submitted!");
    form.resetFields();
  };

  return (
    <Card style={{ width: "100%" }}>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item
          label="Customer name"
          name="customerName"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input placeholder="Enter customer name" />
        </Form.Item>

        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: "Please enter item" }]}
        >
          <Input placeholder="Enter item or description" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
          initialValue={1}
        >
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Quantity" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} placeholder="Optional notes" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit order
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
