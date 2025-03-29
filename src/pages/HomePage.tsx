import React from "react";
import { Alert, Card, Col, Row, Space, Typography } from "antd";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";

import './HomePage.css';
import { EXAMPLE_LIST } from "../constants/examples";
import PILLARS, { Pillar } from "../constants/pillars";

const { Text, Title, Link, Paragraph } = Typography;

function makePillarCard(pillar: Pillar) {
    return (        
        <Card title={pillar.title} style={{height: "100%"}}>
            <Paragraph>
                {pillar.description}
            </Paragraph>
        </Card>
    );
}

function makeExampleCard(example: any) {
    const makeTitle = (title: string) => {
        return (
            <div style={{margin: "10px 0"}}>
                <Space direction="vertical" size="small">
                    <Space direction="horizontal" size="small" style={{alignItems: 'center'}}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F56" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "rgb(255, 206, 46)" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27C93F" }}></div>
                    </Space>
                    <div style={{color: '#F6F7F9', fontFamily: "Fira Code, Consolas, monospace"}}>
                        {title}
                    </div>
                </Space>
            </div>
        );
    }

    return (
        <Card
            title={makeTitle(example.title)}
            style={{
                width: "100%", 
                height: "100%", 
                textAlign: "left", 
                backgroundColor: "rgb(65, 65, 85)", 
                color: "#F6F7F9"}}
        >
            <div style={{overflowY: "scroll", height: "150px"}}>
                <pre 
                    style={{
                        margin: "0",
                        wordWrap: "break-word", 
                        whiteSpace: "pre-wrap", 
                        overflowX: "auto", 
                        fontFamily: "Fira Code, Consolas, monospace"}}
                >{example.code}</pre>
            </div>
        </Card>
    );
}

function About() {
    // idk how to set same height in carousel so just ensure these are all same height (pad to max lines?)

    return (
        <div style={{padding: "20px", textAlign: "center", fontFamily: "Bitter, serif"}}>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <Title level={1} style={{fontSize: '40pt', margin: '0.6em 0 0 0'}}>
                    Welcome to <span style={{color: 'rgb(36, 52, 119)'}} >Lu</span>
                </Title>
                <Paragraph style={{fontSize: "14pt"}}>
                    Rapid prototyping meets the safety and performance of static typing. <br></br>
                    Simple and elegant. No keywords, just pure code.
                </Paragraph>
                <Alert
                    message="Lu is currently in pre-alpha development. It is only available as a demo and may change significantly. We welcome your feedback!"
                    type="warning"
                    showIcon
                    style={{ fontSize: "16px", margin: "0 auto", textAlign: "left" }}
                    className="half-width"
                />
                <Carousel autoplay={{dotDuration: true}} arrows style={{margin: "0 auto"}} className="half-width">
                    {EXAMPLE_LIST.map((example) => {
                        return (
                            <div key={example.key} style={{width: "100%", height: "100%"}}>
                                {makeExampleCard(example)}
                            </div>
                        );
                    })}
                </Carousel>
                <Button type="primary" href="/editor" size="large" icon={<RightOutlined />} iconPosition="end" style={{margin: '10px 0', padding: "20px 20px"}}>
                    Try it out
                </Button>
                <div style={{width: "100%"}}>
                    <Row justify="center" gutter={[12, 12]}>
                        {PILLARS.map((pillar) => {
                            return (
                                <Col md={8} sm={24}>
                                    {makePillarCard(pillar)}
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </Space>
        </div>
    );
}

export default About;