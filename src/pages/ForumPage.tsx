import React from 'react';
import { Avatar, Empty, Image, Layout, List, Space, Tag, Typography, DatePicker, Row, Col } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { useState } from 'react';

const { Title, Text, Paragraph, Link } = Typography;
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface ForumPost {
    href: string;
    title: string;
    date: string;
    author: string;
    avatarUrl?: string;
    tags: string[];
    thumbnailUrl?: string;
    content: string;
}

const example: ForumPost = {
    href: '/forum',
    title: "It's Coming Along...",
    date: '2025-03-28',
    author: 'David',
    tags: ['lu', 'programming', 'language', 'forum', 'community'],
    content:
        'Don\'t look! I\'m under construction!',
};

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function makeDescription(item: ForumPost) {
    if (item.tags.length === 0) {
        return `By ${item.author ? item.author : "Unknown"} | Published ${item.date}`;
    }
    return (
        <Space direction="vertical">
            <div>
                {item.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
            </div>
            {`By ${item.author ? item.author : "Unknown"} | Published ${item.date}`}
        </Space>
    );
}

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value);
    };

    const handleTagsChange = (value: string[]) => {
        // TODO
    }

    return (
        <div style={{ margin: '20px 0 20px 0', width: '100%' }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Search
                        placeholder="Search posts"
                        onSearch={handleSearch}
                        enterButton
                    />
                </Col>
                <Col span={4}>
                    <Select
                        placeholder="Category"
                        allowClear
                        style={{ width: '100%' }}
                    >
                        <Option value="help">Help</Option>
                        <Option value="ideas">Ideas</Option>
                        <Option value="blog">Blog</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        allowClear
                        placeholder="Tags"
                        mode="tags"
                        onChange={handleTagsChange}
                        tokenSeparators={[',']}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={5}>
                    <RangePicker allowClear />
                </Col>
                <Col span={3}>
                    <Select
                        placeholder="Sort"
                        defaultValue="top"
                        onChange={handleSortChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="top">Top</Option>
                        <Option value="new">Latest</Option>
                        <Option value="old">Oldest</Option>
                    </Select>
                </Col>
            </Row>
        </div>
    );
}

const ForumPage: React.FC = () => {
    return (
        <Layout style={{ width: "100%" }}>
            <Header style={{ backgroundColor: 'rgb(74, 90, 126)' }}>
                <div style={{ color: 'white', fontSize: '20px' }}>
                    Community Forum
                </div>
            </Header>
            <Content style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px', textAlign: 'center' }}>
                    <Title level={2} style={{ margin: 0 }}>Welcome to the Forum</Title>
                    <Text type="secondary">Join the discussion and share your thoughts with the community!</Text>
                </div>
                <SearchBar />
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
                            The Lu Programming Language | <b>Forum</b>
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
                            extra={item.thumbnailUrl ? <img width="20%" alt="thumbnail" src={item.thumbnailUrl} /> : null}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatarUrl ? item.avatarUrl : null} icon={<UserOutlined />} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={makeDescription(item)}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
}

export default ForumPage;