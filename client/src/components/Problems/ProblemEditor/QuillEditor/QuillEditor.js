import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Container } from "@mui/material";
import useStyles from './styles';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const QuillEditor = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
//   props.parentCallback(value);
  console.log(value);

  return (
    <Container className={classes.container}>   
      <ReactQuill className={classes.editor} modules={modules} theme="snow" onChange={setValue} />
      {/* <div className="ql-snow">
      <div className="ql-editor">
        <h1>Content:</h1>
        <div dangerouslySetInnerHTML={{__html: value}}></div>
      </div>
      </div> */}
    </Container>
  );
};

export default QuillEditor;
