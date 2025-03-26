import React from "react";
import { Alert, Card, Col, Row, Space, Typography } from "antd";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";

import './AboutPage.css';

const { Text, Title, Link, Paragraph } = Typography;

function About() {
    // idk how to set same height in carousel so just ensure these are all same height (pad to max lines?)
    const codeExamples = [
        {
            title: "add.lu",
            code: `const add = (a: number, b: number): number => a + b;`
        },
        {
            title: "interface.lu",
            code: `interface User {
        name: string;
        age: number;
    }`
        },
        {
            title: "struct.lu",
            code: `type Point = {
        x: number;
        y: number;
    };`
        }
    ];

    const makeTitle = (title: string) => {
        return (
            <Col>
                <Space direction="horizontal" size="small" style={{margin: '10px auto auto auto', alignItems: 'center'}}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "rgb(255, 206, 46)" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27C93F" }}></div>
                </Space>
                <Title level={5} style={{color: '#F6F7F9', fontFamily: "Fira Code, Consolas, monospace", margin: '10px auto 20px auto'}}>{title}</Title>
            </Col>
        );
    }

    return (
        <div style={{padding: "20px", textAlign: "center", fontFamily: "Bitter, serif"}}>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <Title level={1} style={{fontSize: '48pt', margin: '0.75em 0 0 0'}}>
                    Welcome to <span style={{color: 'rgb(36, 52, 119)'}} >Lu</span>
                </Title>
                <Paragraph style={{fontSize: "18px"}}>
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
                    {codeExamples.map((example, index) => (
                        <div key={index} style={{width: "100%", height: "100%"}}>
                            <Card 
                                title={makeTitle(example.title)}
                                style={{flex: 1, width: "100%", height: "100%", textAlign: "left", backgroundColor: "rgb(65, 65, 85)", color: "#F6F7F9"}}>
                                <pre style={{wordWrap: "break-word", whiteSpace: "pre-wrap", overflowX: "auto", fontFamily: "Fira Code, Consolas, monospace"}}>
                                    {example.code}
                                </pre>
                            </Card>
                        </div>
                    ))}
                </Carousel>
                <Button type="primary" href="/editor" size="large" icon={<RightOutlined />} iconPosition="end" style={{margin: '10px 0', padding: "20px 20px"}}>
                    Try it out
                </Button>
                <div style={{width: "100%"}}>
                    <Row justify="center" gutter={[12, 12]}>
                        <Col md={8} sm={24}>
                            <Card title="Easy" style={{height: "100%"}}>
                                <Paragraph>
                                    Lu is designed to be simple and intuitive with a keyword free syntax, and is fully type inferenced, allowing you to quickly write and understand code without unnecessary complexity.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col md={8} sm={24}>
                            <Card title="Powerful" style={{height: "100%"}}>
                                <Paragraph>
                                    Lu provides the flexibility to express complex ideas and patterns, through advanced typing, first-class functions as values. All the while giving full control, including memory management, to the user.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col md={8} sm={24}>
                            <Card title="Safe" style={{height: "100%"}}>
                                <Paragraph>
                                    Lu emphasizes safety with strong static typing and planned reference checking, helping to catch errors early and ensuring reliable and maintainable code.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Space>
        </div>
    );
}

export default About;