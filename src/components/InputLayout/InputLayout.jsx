import React from "react";

const InputLayout = (props) => {
    return (
        <div>
            <div style={{position: "relative", display: "block"}}>
                {props.children}
            </div>
            {props.errors && <p>{props.errors}</p>}
        </div>
    );
};

export default InputLayout;
