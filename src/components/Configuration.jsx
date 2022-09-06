import React from "react";
import {
  Input,
  Button,
  useToast,
  Grid,
  Alert,
  FormSystem,
  Drawer,
} from "@fowapps/fow-ui";

const { Row, Col } = Grid;
const { Form, Field } = FormSystem;

const Configuration = ({ ctx, storage, extensionId }) => {
  const { crmApi, hooks, extensionApi } = ctx;
  const { useMutation, useDisclosure } = hooks;

  const toast = useToast();
  const { isOpen, toggle } = useDisclosure();

  const saveConfigurationMutation = useMutation(
    (body) => {
      extensionApi.insertStorage(extensionId, body),
      {
        onSuccess: () => {
          toast.add("Configuration saved successfully.", {
            appearance: "success",
          });
        },
        onError: () => {
          toast.add("Something went wrong!", {
            appearance: "error",
          });
        },
      }
    }
  );
  const onFinish = (data) => {
    saveConfigurationMutation.mutate({ items: data });
  };

  return (
    <>
      <Button onClick={toggle} leftIcon="cog">
        Set Configuration
      </Button>
      <Drawer isOpen={isOpen} onClose={toggle} title="Extension Configuration">
        <Form onFinish={onFinish}>
          <Row>
            <Col>
              <Alert
                type="info"
                title="Awesome Configuration"
                description="Please fill your information."
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                label="Awesome API Key"
                name={`configuration-awesome-api-key`}
                rules={[{ required: true, message: "Required" }]}
                initialValue={storage[`configuration-awesome-api-key`]}
              >
                <Input placeholder="Awesome API Key" />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="submit"
                loading={saveConfigurationMutation.isLoading}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Configuration;
