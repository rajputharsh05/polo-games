import { Badge, Row, Col, message, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../tabs.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SoccerSection = () => {

  const [datasource, setDataSource] = useState<any>([]);
const [loading, setLoading] = useState<boolean>(false);
 const navigate = useNavigate();

const ModifyData = (data: []) => {
  const ModifiedData = data?.map((ele: any) => {
    const obj = {
      match: ele?.ename,
      status: ele?.iplay? "live" : "upcoming",
      league: ele?.cname,
      time: ele?.stime,
      gameId:ele?.gmid,
      odds: [
        { key: "1", value: ele?.section[0]?.odds[0]?.odds, extra: ele?.section[0]?.odds[1]?.odds, color: "#add8e6" },
        { key: "2", value: ele?.section[1]?.odds[0]?.odds, extra: ele?.section[1]?.odds[1]?.odds, color: "#ffc0cb" },
        { key: "3", value: ele?.section[2]?.odds[0]?.odds, extra: ele?.section[2]?.odds[1]?.odds, color: "#add8e6" },
      ],
    };
    console.log(obj);
    return obj;
  });

  setDataSource(ModifiedData);
};

const getApiData = async () => {
  setLoading(true);

  try {
    const response = await axios.get(
      "https://marketsarket.qnsports.live/getsoccermatches"
    );
    const data = response.data;
    ModifyData(data);
  } catch (err) {
    console.error(err);
    message.error(
      "Something went wrong in fetching the data.. Please wait while we fix the issue"
    );
  } finally {
    setLoading(false);
  }
};

const handleRowClick = (id: any) => {
  navigate(`/games/${id}`)
}

useEffect(() => {
  getApiData();
}, []);

  return (
    <Spin spinning={loading}>
      <div style={{ margin: "16px" }}>
        <div className={styles.tableWrapper}>
          <PlayCircleOutlined
            style={{ fontSize: "24px", marginRight: "16px" }}
          />
          <h3 style={{ margin: 0 }}>Soccer</h3>
        </div>

        <div className={styles.table}>
          {datasource.map((item : any) => (
            <div onClick={() => handleRowClick(item?.gameId)} key={item.key} className={styles.tableHeader}>
              <div
                style={{
                  flex: 2,
                  marginRight: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                <div style={{ fontWeight: "bold" }}>{item?.match?.length > 25 ? `${item?.match?.substr(0,25)}...` :item?.match}</div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    {item?.league?.length > 25 ? `${item?.league?.substr(0,25)}...` :item?.league}
                  </div>
                </div>
                <div>
                  {item.status === "live" && (
                    <Badge status="success" style={{ marginRight: 8 , whiteSpace: "nowrap" }} />
                  )}
                  {item.time}
                </div>
              </div>


              <Row gutter={8} style={{ flex: 3 }}>
                {item.odds.map((odd : any) => (
                  <>
                    <Col
                      span={4}
                      key={odd.key}
                      style={{
                        background: odd.color,
                        padding: "8px",
                        border: "1px solid white",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{odd.value}</div>
                      <div style={{ fontSize: "10px", color: "#666" }}>
                        {odd.extra}
                      </div>
                    </Col>
                    <Col
                      span={4}
                      key={odd.key}
                      style={{
                        background: odd.color,
                        padding: "8px",
                        border: "1px solid white",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{odd.value}</div>
                      <div style={{ fontSize: "10px", color: "#666" }}>
                        {odd.extra}
                      </div>
                    </Col>
                  </>
                ))}
              </Row>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default SoccerSection;
