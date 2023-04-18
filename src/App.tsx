import { useState } from "react";
import DropFileInput from "./components/drop-file-input/DropFileInput";
import "./App.css";

const App: React.FC = () => {
  const onFileChange = (files: File[]) => {
    console.log(files);
  };

  return (
    <div className="box">
      <h2 className="header">React drop files input</h2>
      <DropFileInput onFileChange={onFileChange} />
    </div>
  );
};

export default App;
