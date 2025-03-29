import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const NewsPage: React.FC = () => {
    const newsData = [
        { title: 'News 1', description: "Okay, you got me. This place doesn't exist yet" },
        { title: 'News 2', description: 'Description for news 2' },
        { title: 'News 3', description: 'Description for news 3' },
    ];

    return (
        <Layout>
            <Header style={{ backgroundColor: 'rgb(74, 90, 126)' }}>
                <div style={{ color: 'white', fontSize: '20px' }}>
                    News
                </div>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Title level={2}>Latest News</Title>
                <Row gutter={[16, 16]}>
                    {newsData.map((news, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card title={news.title} bordered={false}>
                                {news.description}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            <Footer>
                <div>
                    The Lu Programming Language | <b>News</b>
                </div>
            </Footer>
        </Layout>
    );
};

export default NewsPage;