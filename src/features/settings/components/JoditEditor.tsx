

import React, { useRef,  useEffect } from "react";
import { Form } from "antd";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor, { Jodit } from "jodit-react";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

interface JoditEditorComponentProps {
  showLabel?: boolean;
  control?: { label: string; name: string };
}

export const JoditEditorComponent: React.FC<JoditEditorComponentProps> = ({
  showLabel = false,
  control,
}) => {
  const editor = useRef<Jodit>(null);
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
 const selectedFiles: File[] = [];
  const token = useGetToken(); 

const handleFileUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${END_POINT.BASE_URL}/admin/upload-file`, {
      method: "POST",
      body: formData,
      headers: headers,
    });

    if (response.ok) {
      // File uploaded successfully
      const responseData = await response.json();
      // Perform any necessary actions with the response data
      console.log("File uploaded:", responseData);
    } else {
      // Handle error when upload fails
      console.error("Upload failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred during upload:", error);
  }
};

  // const handleFileUpload = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await fetch(`${END_POINT.BASE_URL}/admin/upload-file`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Upload successful:", data);
  //       // Perform actions after successful upload if needed
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Upload failed:", errorData);
  //       // Handle error response
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during upload:", error);
  //     // Handle other types of errors (e.g., network errors)
  //   }
  // };

  const config = {
    height: 400,
    iframe: true,
    spellcheck: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
    buttonsMD:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
    buttonsSM:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
    buttonsXS:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
    minHeight: 0,
    minWidth: 0,
    allowResizeY: false,
    uploader: {
      insertImageAsBase64URI: true, 
      fileUpload: handleFileUpload,
    },
    // uploader: {
    //   insertImageAsBase64URI: true,
    //   filesVariableName: "file",
    //   process: handleFileUpload,
    // },

    // uploader: {
    //   insertImageAsBase64URI: true,

    //   prepareData: function (formData: any) {
    //     // Intercept the upload process and store uploaded files for later action
    //     const file = formData.get("files[]"); // Assuming input name is 'files[]'
    //     setSelectedFiles(file);
    //     // uploadedFiles.push(file);

    //     // Clear the formData so that the file doesn't get uploaded immediately
    //     // formData.delete("files[]");
    //     return formData.delete();
    //   },

    //   // process: function (files: any, formData: any) {
    //   //   // Store uploaded files in the 'uploadedFiles' array
    //   //   setSelectedFiles(files);
    //   //   console.log("files", files);
    //   //   // Array.from(files).forEach((file) => {
    //   //   //   // uploadedFiles.push(file);
    //   //   // });

    //   //   // Return empty array to prevent immediate upload
    //   //   return [];
    //   // }, // // URL where the files will be uploaded

    //   url: `${END_POINT.BASE_URL}/admin/upload-file`,
    //   format: "json",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   isSuccess: function (response: any) {
    //     console.log("Response from upload:", response);
    //     // Handle success response if needed
    //   },
    //   getMessage: function (response: any) {
    //     console.error("Error message from upload:", response);
    //     // Handle error message if needed
    //   },

    //   process: function (files: any) {
    //     // Store uploaded files in the state
    //     setSelectedFiles([...files]);

    //     // Upload the first selected file to the server
    //     if (files.length > 0) {
    //       const file = files[0];
    //       // handleFileUpload(file);
    //     }
    //     // Return false to prevent Jodit from further processing
    //     return false;
    //   },

    //   // process: function (files) {
    //   //   // Handle the file(s) when uploaded
    //   //   if (files.length > 0) {
    //   //     const file = files[0]; // Assuming only one file is uploaded
    //   //     handleFileUpload(file); // Call function to upload the file to your endpoint
    //   //   }
    //   //   return false; // Prevent Jodit from processing the file(s) further
    //   // },
    // },
    toolbarAdaptive: false,
  };

  useEffect(() => {
    console.log("selectedFilesE", selectedFiles);
  }, [selectedFiles]);

  // useEffect(() => {
  // console.log("files",selectedFiles)
  // const updateSelectedFiles = () => {
  //   if (editor.current) {
  //     const files = editor.current.editorDocument;
  //     setSelectedFiles(files);
  //   }
  // };
  // editor.current?.events?.on("change", updateSelectedFiles);
  // return () => {
  //   editor.current?.events?.off("change", updateSelectedFiles);
  // };
  // }, [selectedFiles]);
  // console.log("seleced file", selectedFiles);

  return (
    <Form.Item
      name={control?.name ?? "templateDescription"}
      label={showLabel ? control?.label ?? "Template" : null}
      className=""
    >
      <JoditEditor config={config}
        value={""} 
        ref={editor} />
    </Form.Item>
  );
};

