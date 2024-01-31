import React, { useRef } from "react";
import { Form } from "antd";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor, { Jodit } from "jodit-react";

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
  //  const selectedFiles: File[] = [];


  // const handleFileUpload = async (file: File) => {
  //   const uploadFile = async () => {
  //     const url = `${END_POINT.BASE_URL}/admin/upload-file`;
  //     const config = {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const data = {
  //       "file": file,
  //     };

  //     const response = await axios.postForm(url, data, config);

  //     return response;
  //   };
  // //  return useMutation(() => uploadFile())
  //   return useMutation(() => uploadFile(), {onError:(err)=>{console.log("err",err)}, onSuccess:(res)=>{console.log("response",res)}})

  // };

  // const handleFileUpload = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   console.log("file", file);
  //   console.log("formData", formData);

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
    // filebrowser: {
    //   permissionsPresets: {
    //     allowFiles: false,
    //     allowFileMove: false,
    //     allowFileUpload: false,
    //     allowFileUploadRemote: false,
    //     allowFileRemove: false,
    //     allowFileRename: false,
    //     allowFolders: false,
    //     allowFolderCreate: false,
    //     allowFolderMove: false,
    //     allowFolderRemove: false,
    //     allowFolderRename: false,
    //     allowImageResize: false,
    //     allowImageCrop: false,
    //   },
    //   ajax: {
    //     url: `${END_POINT.BASE_URL}/admin/upload-file`, // Replace with your server-side file browser URL
    //     data: {
    //       // You can include additional parameters or headers here
    //       Authorization: `Bearer ${token}`,
    //     },
    //     contentType: "application/json",
    //   },
    // },
    uploader: {
      insertImageAsBase64URI: true,
      // url: `${END_POINT.BASE_URL}/admin/upload-file`,
      // format: "json",
      // method: "POST",
      // // filesVariableName:'files[0]',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      // withCredentials: true,
      // prepareData: (formData: FormData) => {
      //   // Wrap formData inside an object with key 'file'
      //   const wrappedFormData = new FormData();
      //   wrappedFormData.append("file", formData);
      //   // const wrappedFormData = { file: formData.files[0] };
      //   return wrappedFormData;
      // },
      // filesVariableName: "file",
      // prepareData: function (formData: any) {
      //   // formData.append("file",formData);
      //   // Intercept the upload process and store uploaded files for later action
      //   // const file = formData.get("files[]"); // Assuming input name is 'files[]'
      //   // const file = formData.get("fileList"); // Assuming input name is 'files[]'
      //   // setSelectedFiles(file);
      //   setSelectedFiles(formData);
      //   // uploadedFiles.push(file);

      //   // Clear the formData so that the file doesn't get uploaded immediately
      //   // formData.delete("files[]");
      //   return formData.delete();
      // },
      // process: handleFileUpload,
      // process: function (files: any) {
      //   console.log("files", files);
      //   // // Store uploaded files in the state
      //   // setSelectedFiles([...files]);
      //   // handleFileUpload(files);
      //   // // handleFileUpload(files[0]);
      //   // // handleFileUpload(files.file[0]);

      //   // // Upload each selected file to the server
      //   // // files.forEach((file: File) => {
      //   // //   handleFileUpload(file);
      //   // // })
      //   // return false;
      //   return files;
      // },
      // process: function (files: any) {
      //   // Store uploaded files in the state
      //   console.log("files")
      //   setSelectedFiles([...files]);

      //   // Upload the first selected file to the server
      //   if (files.length > 0) {
      //     const file = files[0];
      //     // handleFileUpload(file);
      //   }
      //   // Return false to prevent Jodit from further processing
      //   return false;
      // },

      // fileUpload: handleFileUpload,
      // isSuccess: function (response: any) {
      //   console.log("Response from upload:", response);
      //   // Handle success response if needed
      // },
      // getMessage: function (response: any) {
      //   console.error("Error message from upload:", response);
      //   // Handle error message if needed
      // },
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
      <JoditEditor
        config={config}
        onChange={(value) => {
          console.log("valueOnChange", value);
        }}
        value={""}
        ref={editor}
      />
    </Form.Item>
  );
};
