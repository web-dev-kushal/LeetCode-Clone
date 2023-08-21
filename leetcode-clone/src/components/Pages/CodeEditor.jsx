import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
// import Editor from "@monaco-editor/react";
import Codemirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubDark } from '@uiw/codemirror-theme-github';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { xcodeDark } from '@uiw/codemirror-theme-xcode';
import Navbar from "../Navbar";
import "./codeeditor.css";
import axios from 'axios';
import qs from 'qs';
import base64 from 'base-64';
import Split from "react-split";
import { useParams } from "react-router-dom";


function CodeEditor() {
  const { pid } = useParams();
  const cleanId = pid.substring(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [language, setLanguage] = useState(63);
  console.log(language);
  const [userCode, setUserCode] = useState(
    `console.log("Hello, World!");`
  );
  const [userTheme, setUserTheme] = useState(sublime);
  const [fontSize, setFontSize] = useState(17);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState(<img style={{ height: "50px", objectFit: "cover" }} src="https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif"></img>);
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState(null);

  const init = async () => {
    const res = await fetch('http://localhost:3000/api/problem/'+cleanId, {
      method: 'GET',
    });

    const json = await res.json();
    setProblem(json.problem);
  }

  const options = {
    fontSize: fontSize
  }

  async function compile() {
    setLoading(true);
    setUserOutput(<img style={{ height: "50px", objectFit: "cover" }} src="https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif"></img>);
    if (userCode === ``) {
      return
    }
    console.log(userCode);
    const res = await axios.post('http://localhost:3000/compile', {
      sourceCode: userCode,
      languageId: language,
      sampleInput: "",
      sampleOutput: ""
    })
    setUserOutput(base64.decode(res.data.stdout));
    console.log(userOutput);
  }

  function codeTheme(val) {
    console.log("Hi");
    if (val === '1')
      setUserTheme(sublime);
    else if (val === '2')
      setUserTheme(dracula);
    else if (val === '3')
      setUserTheme(githubDark);
    else if (val === '4')
      setUserTheme(xcodeDark);
  }

  useEffect(() => {
    init();
  }, [])
  console.log(problem);

  return (
    <div>
      <Navbar />
      <div className="editor-content">
        {
          problem ? (
            <div className="card problem-desc">
              <h4>Description</h4>
              <div className="card-body">
                <h5 className="card-title problem-name">{problem.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: "10px" }}><span className="problem-difficulty">{problem.difficulty}</span> <span className="problem-status">Acceptance: {problem.acceptance}</span></h6>
                <p className="card-text question">
                  {problem.description}
                </p>
                <div className="ex-test-cases" style={{ marginTop: "50px" }}>
                  <h6>Example 1 : </h6>
                  <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <div className="card-body">
                      <p><b>Input :</b> {problem.exampleIn} </p>
                      <p><b>Output :</b> {problem.exampleOut} </p>
                    </div>
                  </div>
                  <h6>Example 2 : </h6>
                  {/* <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <div className="card-body">
                      <p><b>Input :</b> nums = [2,7,11,15], target = 9 </p>
                      <p><b>Output :</b> [0,1] </p>
                    </div>
                  </div> */}
                </div>
                <div className="constraints" style={{ marginTop: "50px" }}>
                  <h6>Constraints : </h6>
                </div>
              </div>
            </div>
          ) : (
            <div>The searched Problem doesnt exist</div>
          )
        }
        <div className="code-editor">
          <Split className="split" direction="vertical" sizes={[60, 40]} minSize={60}>
            <div className="code">
              <div style={{ display: "flex" }}>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setLanguage(e.target.value)}>
                  <option selected value="63">JavaScript</option>
                  <option value="54">C++</option>
                  <option value="50">C</option>
                  <option value="91">Java</option>
                  <option value="71">Python</option>
                </select>
                <select className="form-select" aria-label="Default select example" onChange={(e) => codeTheme(e.target.value)}>
                  <option selected value="1">Sublime</option>
                  <option value="2">Dracula</option>
                  <option value="3">Github dark</option>
                  <option value="4">Xcode Dark</option>
                </select>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg></button>
              </div>
              <Codemirror
                value={userCode}
                spellCheck={true}
                autoCorrect={true}
                height="84vh"
                placeholder="Type here..."
                style={{ fontSize: "15px" }}
                theme={userTheme}
                extensions={[javascript(), cpp()]}
                onChange={(editor, data, value) => {
                  setUserCode(editor);
                }
                }
              />
            </div>
            <div className="compiler">
              <button className="run-btn" onClick={() => compile()}>
                Run
              </button>
              <div className={loading === false ? 'hide-output' : 'show-output'}>
                {userOutput}
              </div>
            </div>
          </Split>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor;