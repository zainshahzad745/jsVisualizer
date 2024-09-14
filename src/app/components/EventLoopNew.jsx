"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Database, Code, Cpu } from 'lucide-react';

const codeExamples = [
    {
      name: 'Simple Timeout',
      code: [
        'console.log("Start")',
        'setTimeout(() => console.log("Timeout"), 0)',
        'console.log("End")'
      ],
      steps: [
        {
          title: 'Initial State',
          description: 'The event loop starts with an empty Call Stack and code in the Script.',
          callStack: [],
          webAPIs: [],
          callbackQueue: [],
          script: ['console.log("Start")', 'setTimeout(() => console.log("Timeout"), 0)', 'console.log("End")'],
          output: [],
        },
        {
          title: 'Execute First console.log',
          description: 'The first console.log is pushed to the Call Stack and executed immediately.',
          callStack: ['console.log("Start")'],
          webAPIs: [],
          callbackQueue: [],
          script: ['setTimeout(() => console.log("Timeout"), 0)', 'console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Encounter setTimeout',
          description: 'setTimeout is pushed to the Call Stack, then handed off to Web APIs.',
          callStack: ['setTimeout(...)'],
          webAPIs: ['Timer (0ms)'],
          callbackQueue: [],
          script: ['console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Execute Second console.log',
          description: 'The last console.log is pushed to the Call Stack and executed.',
          callStack: ['console.log("End")'],
          webAPIs: ['Timer (0ms)'],
          callbackQueue: [],
          script: [],
          output: ['Start', 'End'],
        },
        {
          title: 'Timer Completes',
          description: 'The timer completes, and its callback is moved to the Callback Queue.',
          callStack: [],
          webAPIs: [],
          callbackQueue: ['() => console.log("Timeout")'],
          script: [],
          output: ['Start', 'End'],
        },
        {
          title: 'Event Loop Checks',
          description: 'The Event Loop checks if the Call Stack is empty and the Callback Queue has items.',
          callStack: [],
          webAPIs: [],
          callbackQueue: ['() => console.log("Timeout")'],
          script: [],
          output: ['Start', 'End'],
          highlight: 'eventLoop',
        },
        {
          title: 'Execute Callback',
          description: 'The callback is moved from the Callback Queue to the Call Stack and executed.',
          callStack: ['() => console.log("Timeout")'],
          webAPIs: [],
          callbackQueue: [],
          script: [],
          output: ['Start', 'End', 'Timeout'],
        },
      ],
    },
    {
      name: 'Promise and setTimeout',
      code: [
        'console.log("Start")',
        'setTimeout(() => console.log("Timeout"), 0)',
        'Promise.resolve().then(() => console.log("Promise"))',
        'console.log("End")'
      ],
      steps: [
        {
          title: 'Initial State',
          description: 'The event loop starts with code in the Script.',
          callStack: [],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['console.log("Start")', 'setTimeout(() => console.log("Timeout"), 0)', 'Promise.resolve().then(() => console.log("Promise"))', 'console.log("End")'],
          output: [],
        },
        {
          title: 'Execute First console.log',
          description: 'The first console.log is executed.',
          callStack: ['console.log("Start")'],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['setTimeout(() => console.log("Timeout"), 0)', 'Promise.resolve().then(() => console.log("Promise"))', 'console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Encounter setTimeout',
          description: 'setTimeout is handled by Web APIs.',
          callStack: ['setTimeout(...)'],
          webAPIs: ['Timer (0ms)'],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['Promise.resolve().then(() => console.log("Promise"))', 'console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Handle Promise',
          description: 'Promise callback is added to the Microtask Queue.',
          callStack: ['Promise.resolve().then(...)'],
          webAPIs: ['Timer (0ms)'],
          callbackQueue: [],
          microtaskQueue: ['() => console.log("Promise")'],
          script: ['console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Execute Last console.log',
          description: 'The last console.log is executed.',
          callStack: ['console.log("End")'],
          webAPIs: ['Timer (0ms)'],
          callbackQueue: [],
          microtaskQueue: ['() => console.log("Promise")'],
          script: [],
          output: ['Start', 'End'],
        },
        {
          title: 'Process Microtask Queue',
          description: 'The Event Loop processes the Microtask Queue before the Callback Queue.',
          callStack: ['() => console.log("Promise")'],
          webAPIs: [],
          callbackQueue: ['() => console.log("Timeout")'],
          microtaskQueue: [],
          script: [],
          output: ['Start', 'End', 'Promise'],
          highlight: 'eventLoop',
        },
        {
          title: 'Execute setTimeout Callback',
          description: 'The setTimeout callback is finally executed.',
          callStack: ['() => console.log("Timeout")'],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: [],
          output: ['Start', 'End', 'Promise', 'Timeout'],
        },
      ],
    },
    {
      name: 'Async/Await',
      code: [
        'async function fetchData() {',
        '  console.log("Fetching data...")',
        '  await new Promise(resolve => setTimeout(resolve, 1000))',
        '  console.log("Data received")',
        '}',
        'console.log("Start")',
        'fetchData()',
        'console.log("End")'
      ],
      steps: [
        {
          title: 'Initial State',
          description: 'The event loop starts with code in the Script.',
          callStack: [],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['console.log("Start")', 'fetchData()', 'console.log("End")'],
          output: [],
        },
        {
          title: 'Execute First console.log',
          description: 'The first console.log is executed.',
          callStack: ['console.log("Start")'],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['fetchData()', 'console.log("End")'],
          output: ['Start'],
        },
        {
          title: 'Call fetchData',
          description: 'fetchData is called and its first console.log is executed.',
          callStack: ['fetchData()', 'console.log("Fetching data...")'],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['console.log("End")'],
          output: ['Start', 'Fetching data...'],
        },
        {
          title: 'Encounter await',
          description: 'The await statement is encountered, and the promise is handled by Web APIs.',
          callStack: [],
          webAPIs: ['Promise (1000ms)'],
          callbackQueue: [],
          microtaskQueue: [],
          script: ['console.log("End")'],
          output: ['Start', 'Fetching data...'],
        },
        {
          title: 'Execute Last console.log',
          description: 'The last console.log in the main script is executed.',
          callStack: ['console.log("End")'],
          webAPIs: ['Promise (1000ms)'],
          callbackQueue: [],
          microtaskQueue: [],
          script: [],
          output: ['Start', 'Fetching data...', 'End'],
        },
        {
          title: 'Promise Resolves',
          description: 'After 1 second, the promise resolves and its callback is added to the Microtask Queue.',
          callStack: [],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: ['async function continuation'],
          script: [],
          output: ['Start', 'Fetching data...', 'End'],
          highlight: 'eventLoop',
        },
        {
          title: 'Execute Async Function Continuation',
          description: 'The async function continues execution after the await.',
          callStack: ['console.log("Data received")'],
          webAPIs: [],
          callbackQueue: [],
          microtaskQueue: [],
          script: [],
          output: ['Start', 'Fetching data...', 'End', 'Data received'],
        },
      ],
    },
    {
      name: "Basic setTimeout",
      code: [
        "console.log('Start');",
        "setTimeout(() => {",
        "  console.log('Timeout 1');",
        "}, 1000);",
        "setTimeout(() => {",
        "  console.log('Timeout 2');",
        "}, 500);",
        "console.log('End');"
      ],
      steps: [
        {
          title: "Script Starts",
          description: "The script starts executing, and the `console.log('Start')` is added to the Call Stack.",
          callStack: ["console.log('Start')"],
          webAPIs: [],
          callbackQueue: [],
          script: ["setTimeout(...)", "setTimeout(...)", "console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Setting setTimeout",
          description: "The first `setTimeout` is called. It is sent to Web APIs with a delay of 1000ms.",
          callStack: ["setTimeout(...)"],
          webAPIs: ["setTimeout (1000ms)"],
          callbackQueue: [],
          script: ["setTimeout(...)", "console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Setting second setTimeout",
          description: "The second `setTimeout` is called. It is sent to Web APIs with a delay of 500ms.",
          callStack: ["setTimeout(...)"],
          webAPIs: ["setTimeout (1000ms)", "setTimeout (500ms)"],
          callbackQueue: [],
          script: ["console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Console End",
          description: "The last synchronous statement `console.log('End')` is executed.",
          callStack: ["console.log('End')"],
          webAPIs: ["setTimeout (1000ms)", "setTimeout (500ms)"],
          callbackQueue: [],
          script: [],
          output: ["Start", "End"]
        },
        {
          title: "Timeout 2 (500ms)",
          description: "The `setTimeout` with 500ms delay completes and its callback is added to the Callback Queue.",
          callStack: [],
          webAPIs: ["setTimeout (1000ms)"],
          callbackQueue: ["Timeout 2 callback"],
          script: [],
          output: ["Start", "End"]
        },
        {
          title: "Timeout 1 (1000ms)",
          description: "The `setTimeout` with 1000ms delay completes and its callback is added to the Callback Queue.",
          callStack: [],
          webAPIs: [],
          callbackQueue: ["Timeout 1 callback"],
          script: [],
          output: ["Start", "End", "Timeout 2"]
        },
      ],
    },
    {
      name: "Promise vs setTimeout",
      code: [
        "console.log('Start');",
        "setTimeout(() => {",
        "  console.log('Timeout');",
        "}, 0);",
        "Promise.resolve().then(() => {",
        "  console.log('Promise 1');",
        "}).then(() => {",
        "  console.log('Promise 2');",
        "});",
        "console.log('End');"
      ],
      steps: [
        {
          title: "Script Starts",
          description: "The script starts executing, and the `console.log('Start')` is added to the Call Stack.",
          callStack: ["console.log('Start')"],
          webAPIs: [],
          callbackQueue: [],
          script: ["setTimeout(...)", "Promise.resolve()", "console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Setting setTimeout",
          description: "The `setTimeout` is called and sent to Web APIs with a delay of 0ms.",
          callStack: ["setTimeout(...)"],
          webAPIs: ["setTimeout (0ms)"],
          callbackQueue: [],
          script: ["Promise.resolve()", "console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Promise Resolution",
          description: "The `Promise.resolve()` is executed. Its `then` callback is added to the Microtask Queue.",
          callStack: ["Promise.resolve()"],
          webAPIs: ["setTimeout (0ms)"],
          callbackQueue: [],
          microtaskQueue: ["Promise 1"],
          script: ["console.log('End')"],
          output: ["Start"]
        },
        {
          title: "Console End",
          description: "The last synchronous statement `console.log('End')` is executed.",
          callStack: ["console.log('End')"],
          webAPIs: ["setTimeout (0ms)"],
          callbackQueue: [],
          microtaskQueue: ["Promise 1"],
          script: [],
          output: ["Start", "End"]
        },
        {
          title: "Executing Promise 1",
          description: "The first promise callback is executed from the Microtask Queue.",
          callStack: ["Promise 1 callback"],
          webAPIs: ["setTimeout (0ms)"],
          callbackQueue: [],
          microtaskQueue: ["Promise 2"],
          script: [],
          output: ["Start", "End"]
        },
        {
          title: "Executing Promise 2",
          description: "The second promise callback is executed from the Microtask Queue.",
          callStack: ["Promise 2 callback"],
          webAPIs: ["setTimeout (0ms)"],
          callbackQueue: [],
          microtaskQueue: [],
          script: [],
          output: ["Start", "End", "Promise 1"]
        },
        {
          title: "Timeout Callback",
          description: "The `setTimeout` callback is now executed from the Callback Queue.",
          callStack: ["Timeout callback"],
          webAPIs: [],
          callbackQueue: [],
          script: [],
          output: ["Start", "End", "Promise 1", "Promise 2"]
        },
      ],
    }
    
    
  ];
  

const Sidebar = () => {
    const sectionDescriptions = {
        callStack: "The Call Stack holds the functions to be executed. Synchronous code is pushed onto the stack and executed immediately.",
        webAPIs: "Web APIs handle asynchronous operations like setTimeout, DOM events, HTTP requests, etc. They execute in the browser environment.",
        callbackQueue: "The Callback Queue holds asynchronous callbacks (like setTimeout, event listeners) which are ready to be executed after the call stack is empty.",
        script: "The Script is the initial code that is loaded and executed by the JavaScript engine.",
        eventLoop: "The Event Loop constantly checks whether the call stack is empty, and if it is, it pulls the first task from the callback queue or microtask queue.",
    };

    return (
        <aside className="p-6 bg-gray-100 mx-auto flex-1 bg-grey col-span-4 max-w-6xl">
            <div className="flex flex-col items-center justify-center mb-6 md:mb-80p md:mt-80p">
            <h2 className="text-xl font-semibold mb-4">Event Loop Descriptions</h2>
            <ul>
                <li className="mb-4 flex items-start">
                    <Code className="mr-2 mt-1" />
                    <div>
                        <strong>Call Stack:</strong> {sectionDescriptions.callStack}
                    </div>
                </li>
                <li className="mb-4 flex items-start">
                    <Database className="mr-2 mt-1" />
                    <div>
                        <strong>Web APIs:</strong> {sectionDescriptions.webAPIs}
                    </div>
                </li>
                <li className="mb-4 flex items-start">
                    <Clock className="mr-2 mt-1" />
                    <div>
                        <strong>Callback Queue:</strong> {sectionDescriptions.callbackQueue}
                    </div>
                </li>
                <li className="mb-4 flex items-start">
                    <Cpu className="mr-2 mt-1" />
                    <div>
                        <strong>Script:</strong> {sectionDescriptions.script}
                    </div>
                </li>
                <li className="mb-4 flex items-start">
                    <ArrowRight className="mr-2 mt-1" />
                    <div>
                        <strong>Event Loop:</strong> {sectionDescriptions.eventLoop}
                    </div>
                </li>
            </ul>
            </div>
        </aside>
    );
};

const EventLoopVisualizer = () => {
    const [selectedExample, setSelectedExample] = useState(0);
    const [step, setStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const currentExample = codeExamples[selectedExample];
    const steps = currentExample?.steps || [];

    useEffect(() => {
        let interval;
        if (isRunning && step < steps.length - 1) {
            interval = setInterval(() => {
                setStep((prevStep) => {
                    const nextStep = prevStep + 1;
                    if (nextStep >= steps.length) {
                        setIsRunning(false);
                        return prevStep;
                    }
                    return nextStep;
                });
            }, 2000);
        } else if (step >= steps.length - 1) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, step, steps.length]);

    const startVisualization = () => {
        setStep(0);
        setIsRunning(true);
    };

    const renderBox = (title, items, icon) => (
        <div className="border-2 border-gray-300 rounded-lg p-4 flex-1">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
            </h3>
            <ul className="list-disc list-inside">
                {items?.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                )) || <li className="text-sm">No items</li>}
            </ul>
        </div>
    );

    const currentStep = steps[step] || {};

    return (
        <div className="grid grid-col grid-cols-1 md:grid-cols-12">
            <Sidebar />
            <div className="p-6  mx-auto flex-1 col-span-8">
                <h1 className="text-3xl font-bold mb-6">Interactive JavaScript Event Loop Visualizer</h1>
                <div className="mb-6">
                    <label htmlFor="example-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Choose an example:
                    </label>
                    <select
                        id="example-select"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedExample}
                        onChange={(e) => {
                            setSelectedExample(Number(e.target.value));
                            setStep(0);
                            setIsRunning(false);
                        }}
                    >
                        {codeExamples.map((example, index) => (
                            <option key={index} value={index}>
                                {example.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">Code Example:</h2>
                    <pre className="bg-black text-green-500 p-4 rounded overflow-x-auto">
                        <code>{currentExample?.code.join('\n')}</code>
                    </pre>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <button
                        className={`px-4 py-2 rounded ${isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white`}
                        onClick={startVisualization}
                        disabled={isRunning}
                    >
                        {isRunning ? 'Visualizing...' : 'Start Visualization'}
                    </button>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">{currentStep.title || 'No title'}</h2>
                    <p className="mb-4">{currentStep.description || 'No description'}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {renderBox('Call Stack', currentStep.callStack, <Code size={20} />)}
                        {renderBox('Web APIs', currentStep.webAPIs, <Database size={20} />)}
                        {renderBox('Callback Queue', currentStep.callbackQueue, <Clock size={20} />)}
                        {renderBox('Script', currentStep.script, <Cpu size={20} />)}
                    </div>
                    {currentStep.microtaskQueue && (
                        <div className="mb-4">
                            {renderBox('Microtask Queue', currentStep.microtaskQueue, <Clock size={20} />)}
                        </div>
                    )}
                    <div className={`border-2 ${currentStep.highlight === 'eventLoop' ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-4 mb-4`}>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <ArrowRight size={20} />
                            <span className="ml-2">Event Loop</span>
                        </h3>
                        <p className="text-sm">Checks if Call Stack is empty and processes Microtask Queue, then Callback Queue</p>
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Output</h3>
                        <pre className="bg-black text-green-500 p-2 rounded">
                            {currentStep.output?.join('\n') || 'No output'}
                        </pre>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="h-2 bg-blue-200 rounded-full">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">Step {step + 1} of {steps.length}</span>
                        <span className="text-sm text-gray-600">{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventLoopVisualizer;