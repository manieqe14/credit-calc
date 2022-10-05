import { useState } from "react";
import {
  Container,
  ListGroup,
  Button,
  Form,
  Col,
  Row,
  Badge,
} from "react-bootstrap";
import { zeroPad } from "../../Utils/Helpers";

export const OverPayments = ({ overpayments, overpaymentsHandler }) => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState(false);
  const [repeatPeriod, setRepeatPeriod] = useState("month");

  const setDateHandler = (event) => {
    let newDate = new Date();
    let results = event.target.value.match(
      /(?<year>\d{4})-(?<month>\d+)-(?<date>\d+)/
    );
    newDate.setDate(results.groups.date);
    newDate.setMonth(results.groups.month);
    newDate.setFullYear(results.groups.year);
    setDate(newDate);
  };

  const addItem = () => {
    let newValue = { date, value };
    if (repeat) {
      newValue = { ...newValue, repeatPeriod };
    }
    overpaymentsHandler([...overpayments, newValue]);
    setValue(0);
  };

  const repeatPeriodHandler = () => {
    setRepeat(!repeat);
  };

  return (
    <Container>
      <Row>
        <h4>Overpayments</h4>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="overpayment-date"
                type="date"
                value={`${date.getFullYear()}-${zeroPad(
                  date.getMonth() + 1
                )}-${zeroPad(date.getDate())}`}
                onChange={setDateHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                value={value}
                onChange={(event) => setValue(parseFloat(event.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check checked={repeat} onChange={repeatPeriodHandler} />
              <Form.Select
                aria-label="Repeating period"
                onChange={(event) => setRepeatPeriod(event.target.value)}
                disabled={!repeat}
              >
                <option value="month">month</option>
                <option value="quarter">quarter</option>
                <option value="year">year</option>
              </Form.Select>
            </Form.Group>
            <Button background="primary" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <ListGroup>
            {overpayments.map((item, index) => (
              <ListGroup.Item key={index}>
                <Badge bg="secondary">{`${item.date.getDate()}-${
                  item.date.getMonth() + 1
                }-${item.date.getFullYear()}`}</Badge>
                {item.value} PLN
                <span>{item.repeatPeriod}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
