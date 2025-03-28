import React from 'react';
import { Avatar, Empty, Image, List, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const example = {
    href: '/blog',
    title: "It's Coming Along...",
    avatar: '',
    thumbnail: '',
    description:
        'Short description for this post',
    content:
        'Don\'t look! I\'m under construction!',
};

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const BlogPage: React.FC = () => (
    <div style={{ padding: "20px 40px", }}>
        <Space direction='vertical' style={{ width: "100%" }}>
            <Title level={1} style={{ fontSize: '32pt', margin: '0.75em 0 0.2em 0' }}>
                Posts
            </Title>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: undefined,
                }}
                dataSource={[example]}
                footer={
                    <div>
                        The Lu Programming Language | <b>Blog</b>
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                        ]}
                        extra={item.thumbnail ? <img width="20%" alt="thumbnail" src={item.thumbnail} /> : null}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar ? item.avatar : null} icon={<UserOutlined />} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </Space>
    </div>
);

export default BlogPage;