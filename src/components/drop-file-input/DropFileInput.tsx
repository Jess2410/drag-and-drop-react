import React, { useRef, useState } from "react";
import "./drop-file-input.css";
import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud.svg";

type DropFileInputProps = {
  onFileChange: (files: File[]) => void;
};

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  const onDragEnter = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add("dragover");
    }
  };
  const onDragLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };
  const onDrop = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile: File | null = e.target.files?.[0] || null;
    if (newFile) {
      setFileList((prevFileList: File[]) => [...prevFileList, newFile]);
      onFileChange([...fileList, newFile]);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList: File[] = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to Upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[
                    // item.type.split("/")[1] as "default" | "css" | "pdf" | "png"
                    item.type.split("/")[1]
                  ] || ImageConfig["default"]
                }
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                X
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
