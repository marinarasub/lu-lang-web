import React, { use, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Select, Button, Tabs, Grid, Row, Col, Splitter, Space } from 'antd';
import { CaretRightFilled, SettingFilled, ToolFilled } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea';
import { EDITOR_SERVICE_URL } from '../constants/apiAddresses';
import { EXAMPLE_LIST, EXAMPLE_MAP } from '../constants/examples';

const { Option } = Select;
const { TabPane } = Tabs;

interface EditorOutputProps {
    build: string;
    terminal: string;
    activeTab: string;
    onChangeTab: (key: string) => void;
    onTerminalInput: (event: React.KeyboardEvent) => void;
}

const EditorOutput: React.FC<EditorOutputProps> = (
    { build, terminal, activeTab, onChangeTab, onTerminalInput }
) => {
    const terminalRef = useRef<TextAreaRef>(null);
    const buildRef = useRef<TextAreaRef>(null);

    useEffect(() => {
        if (terminalRef.current) {
            if (terminalRef.current.resizableTextArea) {
                terminalRef.current.resizableTextArea.textArea.scrollTop = terminalRef.current.resizableTextArea.textArea.scrollHeight
                terminalRef.current.resizableTextArea.textArea.selectionStart = terminal.length;
                terminalRef.current.resizableTextArea.textArea.selectionEnd = terminal.length;
            }
            terminalRef.current.focus();
        }
    }, [terminal]);

    useEffect(() => {
        if (buildRef.current) {
            if (buildRef.current.resizableTextArea) {
                buildRef.current.resizableTextArea.textArea.scrollTop = buildRef.current.resizableTextArea.textArea.scrollHeight
                buildRef.current.resizableTextArea.textArea.selectionStart = build.length;
                buildRef.current.resizableTextArea.textArea.selectionEnd = build.length;
            }
            buildRef.current.focus();
        }
    }, [build]);

    return (
        <Tabs defaultActiveKey="in" activeKey={activeTab} onChange={onChangeTab}>
            <TabPane tab="Build" key="build">
                <TextArea
                    ref={buildRef}
                    style={{ width: '100%', height: '100px', fontFamily: 'Consolas, monospace', caretColor: "transparent" }}
                    value={build}
                    readOnly
                />
            </TabPane>
            <TabPane tab="Terminal" key="terminal">
                <TextArea
                    ref={terminalRef}
                    style={{ width: '100%', height: '100px', fontFamily: 'Consolas, monospace' }}
                    value={terminal}
                    onKeyDown={onTerminalInput}
                />
            </TabPane>
        </Tabs>
    );
}

const EditorPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [build, setBuild] = useState('');
    const [terminal, setTerminal] = useState('');
    const [activeTab, setActiveTab] = useState('build');

    const sourceEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
    const transpilerEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
    
    const wsRef = useRef<WebSocket | null>(null);

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
        setActiveTab('build');
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
                setBuild(output);
            }).catch((error) => {
                setBuild(error.message);
            });
        }
    };

    const handleRun = async () => {
        if (transpilerEditorRef.current) {
            setActiveTab('terminal');
            setTerminal('');
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
                setInput('');
                const ws_id = new WebSocket(EDITOR_SERVICE_URL + '/run?id=' + id);
                ws_id.onopen = () => {
                    console.log('ws_id opened');
                    wsRef.current = ws_id;
                }
                ws_id.onmessage = (event) => {
                    const message = event.data.toString();
                    console.log('received output: ', message);
                    setTerminal((prevOutput) => prevOutput + message);
                }
                ws_id.onclose = () => {
                    wsRef.current = null;
                } // TODO allow rerun
            }).catch((error) => {
                setTerminal((prevOutput) => prevOutput + error.message);
            });
        }
    };

    const onSettings = () => {
        alert('Settings clicked');
    }

    const onExampleChange = (value: string) => {
        if (sourceEditorRef.current) {
            const example = EXAMPLE_MAP.get(value);
            if (example) {
                sourceEditorRef.current.setValue(example.code);
            }
        }
    }

    const onTerminalInput = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setInput((prevInput) => prevInput + '\n');
            setTerminal((prevOutput) => prevOutput + '\n');
            if (wsRef.current == null) {
                console.log('ws is null');
                setInput('');
                // TODO parse basic pseudo shell commands
            } else {
                console.log('sending input:', input + '\n');
                wsRef.current.send(input + '\n');
                setInput('');
            }
            event.preventDefault();
        } else if (event.key === 'Backspace') {
            // TODO delete makes things complicated, just ignore for now
        } else if (event.key.length === 1) {
            setInput((prevInput) => prevInput + event.key);
            setTerminal((prevOutput) => prevOutput + event.key);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <p>Example:</p>
                    <Select showSearch allowClear placeholder='none' onChange={onExampleChange}  style={{ width: 120 }}>
                        {EXAMPLE_LIST.map((example) => (
                            <Option key={example.key} value={example.key}>{example.title}</Option>
                        ))}
                    </Select>
                </Space>
                <Button type="default" onClick={onSettings} icon={<SettingFilled />}>
                    Settings
                </Button>
            </Space>
            <div style={{ display: 'flex', marginTop: '12px', height: '100%', minHeight: '300px' }}>
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
            <EditorOutput 
                build={build} 
                terminal={terminal} 
                activeTab={activeTab} 
                onChangeTab={setActiveTab} 
                onTerminalInput={onTerminalInput}
            />
        </div>
    );
};

export default EditorPage;