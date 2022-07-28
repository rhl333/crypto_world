import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Row, Col, Typography, Avatar, Card, Spin } from "antd";
import moment from "moment";

import { fetchNews } from "../services/NewsAPI";

let { Text, Title } = Typography;
let { option } = Select;

let defaultImage = "https://www.bankrate.com/2020/08/19164919/What-is-cryptocurrency-840x720.jpeg";

const News = (props) => {
  let { simplified } = props;
  let count = simplified ? 6 : 21;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews(count));
  }, []);
  let news = useSelector((state) => state.news.data.data);

  return (
    <Row gutter={[24, 24]}>
      {!news ? (
        <Spin size="large" style={{ margin: "0 auto" }} />
      ) : (
        news?.value?.map((data, idx) => {
          return (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <Card hoverable className="news-card">
                <a href={data.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {data.name}
                    </Title>
                    <img style={{ maxHeight: "100px", maxWidth: "200px" }} src={data?.image?.thumbnail?.contentUrl || defaultImage} alt="" />
                  </div>
                  <p>{data.description.length > 100 ? `${data.description.substring(0, 150)}...` : data.description}</p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={data.provider[0]?.image?.thumbnail?.contentUrl || defaultImage} />
                      <Text className="provider-name">{data.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(data.datePublished).startOf("ss").fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })
      )}
    </Row>
  );
};

export default News;
