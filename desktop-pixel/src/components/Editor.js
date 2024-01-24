import React from "react";

const Editor = () => {
    return (
        <div>
            <h1>Editor</h1>
            <h2>Choose Panel Dimensions</h2>

            <div>
                <div>
                    <input type="number" defaultValue="16" />
                    <span>Height</span>
                </div>
                <div>
                    <input type="number" defaultValue="16" />
                    <span>Width</span>
                </div>
            </div>

            <button>Start Drawbox</button>
        </div>
    )}

export default Editor;