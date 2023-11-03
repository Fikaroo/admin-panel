import Dropzone from "react-dropzone";
import "./image-upload.scss";
import { UseFormSetValue } from "react-hook-form";
import { AutoDetailForm } from "@/pages/Auto/Detail/AutoDetail";

type ImageUploadProps = {
  title?: string;
  details?: string;
  setValue?: UseFormSetValue<AutoDetailForm>;
  name?: keyof AutoDetailForm;
};

const ImageUpload = ({ title, details, setValue, name }: ImageUploadProps) => {
  return (
    <Dropzone
      accept={{ "image/*": [".svg", ".png", ".jpg", ".gif"] }}
      onDrop={(acceptedFiles) => {
        setValue &&
          name &&
          setValue(
            name,
            URL.createObjectURL(acceptedFiles[acceptedFiles.length - 1])
          );
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps({ className: "upload-image-container" })}>
          <input {...getInputProps()} />
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M6.6665 13.3333L9.99984 10M9.99984 10L13.3332 13.3333M9.99984 10V17.5M16.6665 13.9524C17.6844 13.1117 18.3332 11.8399 18.3332 10.4167C18.3332 7.88536 16.2811 5.83333 13.7498 5.83333C13.5677 5.83333 13.3974 5.73833 13.3049 5.58145C12.2182 3.73736 10.2119 2.5 7.9165 2.5C4.46472 2.5 1.6665 5.29822 1.6665 8.75C1.6665 10.4718 2.36271 12.0309 3.48896 13.1613"
                stroke="#737373"
                strokeWidth="1.78571"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>
            Добавить <span className="image-name">{title}</span>
          </p>
          <p className="details">{details}</p>
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
