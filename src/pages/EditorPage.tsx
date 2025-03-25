import React, { useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Select, Button, Tabs, Grid, Row, Col, Splitter, Space } from 'antd';
import { CaretRightFilled, SettingFilled, ToolFilled } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;
const { TabPane } = Tabs;

const EditorPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [activeTab, setActiveTab] = useState('in');

    const sourceEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
    const transpilerEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

    const sourceEditor = <Editor
        width="100%"
        height="400px"
        theme="vs-dark"
        value={"# Write your code here"}
        options={{automaticLayout: false, fontFamily: 'Fira Code, Consolas, monospace'}}
        onMount={(editor, monaco) => {
            sourceEditorRef.current = editor
            editor.focus();
            editor.layout();
        }}
    />;
    const transpilerEditor = <Editor
        width="100%"
        height="400px"
        language='c'
        theme="vs-dark"
        value={"// Transpiled code will be displayed here"}
        options={{automaticLayout: false, fontFamily: 'Fira Code, Consolas, monospace'}}
        onMount={(editor, monaco) => {
            transpilerEditorRef.current = editor
            editor.layout();
        }}
    />;

    const onResizeSplitterPane = (sizes: number[]) => {
        if (sourceEditorRef.current) {
            sourceEditorRef.current.layout();
        }
        if (transpilerEditorRef.current) {
            transpilerEditorRef.current.layout();
        }
    }

    window.addEventListener('resize', () => {
        if (sourceEditorRef.current) {
            sourceEditorRef.current.layout();
        }
        if (transpilerEditorRef.current) {
            transpilerEditorRef.current.layout();
        }
    }
    );

    const handleBuild = () => {
        // Implement build and run logic here
        setOutput('Output will be displayed here...');
    };

    const handleRun = () => {
        // Implement build and run logic here
        setOutput('Output will be displayed here...');
        setActiveTab('out');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Space>
                        <p>Example:</p>
                        <Select showSearch allowClear defaultValue="" placeholder='none' style={{ width: 120 }}>
                            <Option value="hello">hello</Option>
                            <Option value="fib">fib</Option>
                            <Option value="union">union</Option>
                        </Select>
                    </Space>
                </div>
                <div>
                    <Button type="default" onClick={() => alert('Settings clicked')} icon={<SettingFilled />}>
                        Settings
                    </Button>
                </div>
            </Space>
            <div style={{ display: 'flex', marginTop: '20px', height: '100%', minHeight: '300px' }}>
                <Splitter style={{ width: '100%', height: '100%' }} onResize={onResizeSplitterPane}>
                    <Splitter.Panel defaultSize='60%'>
                        {sourceEditor}
                    </Splitter.Panel>
                    <Splitter.Panel>
                        {transpilerEditor}
                    </Splitter.Panel>
                </Splitter>
            </div>
            <Space style={{ marginTop: '20px' }}>
                <Button variant='solid' onClick={handleRun} color='green' icon={<CaretRightFilled />}>Run</Button>
                <Button type="primary" onClick={handleBuild} style={{margin: "0 10px"}} icon={<ToolFilled />}>Build</Button>
            </Space>
            <Tabs defaultActiveKey="in" activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
                <TabPane tab="Input" key="in">
                    <TextArea
                        style={{ width: '100%' }}
                        value={input}
                        allowClear
                        onChange={(e) => setInput(e.target.value)}
                    />
                </TabPane>
                <TabPane tab="Output" key="out">
                    <TextArea
                        style={{ width: '100%', caretColor: "transparent" }}
                        value={output}
                        readOnly
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default EditorPage;