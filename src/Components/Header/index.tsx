import { Button, Col, Input, Row } from "antd";
import styles from "./header.module.scss"; // Use CSS Modules
const HeaderComponent = () => {
  return (
    <Row align="middle" justify="space-between" className={styles.header}>
      
      <Col flex="1" className={styles.searchContainer}>
        <Input.Search
          placeholder="Search Event..."
          className={styles.search}
          style={{marginTop:"3vh"}}
        />
      </Col>
      <Col className={styles.buttonContainer}>
        <Button className={styles.button} type="primary">
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
