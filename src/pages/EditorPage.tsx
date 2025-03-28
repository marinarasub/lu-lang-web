import React, { useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Select, Button, Tabs, Grid, Row, Col, Splitter, Space } from 'antd';
import { CaretRightFilled, SettingFilled, ToolFilled } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import TextArea from 'antd/es/input/TextArea';
import { EDITOR_SERVICE_URL } from '../constants/apiAddresses';

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

    const handleBuild = async () => {
        if (sourceEditorRef.current) {
            const sourceCode = sourceEditorRef.current.getValue();
            await fetch(EDITOR_SERVICE_URL + '/api/v1/build', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ input: sourceCode }),
            }).then((response) => {
                const status = response.status;
                return response.json().then((body) => ({ status, body }));
            }).then(({ status, body }) => {
                if (status !== 201) {
                    throw new Error(body.errors?.map((e: any) => e.message).join('\n'));
                }
                const output = body.result?.output;
                const build = body.result?.build;
                transpilerEditorRef.current?.setValue(build);
                setOutput(output);
                //setActiveTab('out');
            }).catch((error) => {
                setOutput(error.message);
            });
        }
    };

    const handleRun = async () => {
        if (transpilerEditorRef.current) {
            setActiveTab('out');
            setOutput('');
            const transpiledCode = transpilerEditorRef.current.getValue();
            await fetch(EDITOR_SERVICE_URL + '/api/v1/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ input: transpiledCode }),
            }).then((response) => {
                const status = response.status;
                return response.json().then((body) => ({ status, body }));
            }).then(({ status, body }) => {
                if (status !== 201) {
                    throw new Error(body.errors?.map((e: any) => e.message).join('\n'));
                }
                const id = body.id;
                if (typeof id !== 'string') {
                    throw new Error('Invalid response from server');
                }
                const ws = new WebSocket(EDITOR_SERVICE_URL + '/api/v1/run/' + id);
                ws.onmessage = (data) => {
                    const message = data.toString();
                    setOutput(output + message);
                }
                ws.onclose = () => {} // TODO allow rerun
            }).catch((error) => {
                setOutput(error.message);
            });
        }
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
                        style={{ width: '100%', fontFamily: 'Fira Code, Consolas, monospace' }}
                        value={input}
                        allowClear
                        onChange={(e) => setInput(e.target.value)}
                    />
                </TabPane>
                <TabPane tab="Output" key="out">
                    <TextArea
                        style={{ width: '100%', fontFamily: 'Fira Code, Consolas, monospace', caretColor: "transparent" }}
                        value={output}
                        readOnly
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default EditorPage;