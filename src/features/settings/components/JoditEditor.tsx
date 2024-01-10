import JoditEditor, { Jodit } from "jodit-react";
import Form from "antd/es/form";
import {   useRef } from "react";

export const JoditEditorComponent: React.FC<{
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ showLabel = false, control }) => {
  const editor = useRef<Jodit>(null);
  // const [selectedFiles, setSelectedFiles] = useState(null);


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
    // prepareData: function (formData) {
    //   // Intercept the upload process and store uploaded files for later action
    //   const file = formData.get("files[]"); // Assuming input name is 'files[]'
    //   setSelectedFiles(formData)
    //   // uploadedFiles.push(file);

    //   // Clear the formData so that the file doesn't get uploaded immediately
    //   // formData.delete("files[]");
    //   return formData.delete();
    // },

    
    // process: function (files: any, formData: any) {
    //   // Store uploaded files in the 'uploadedFiles' array
    //   setSelectedFiles(files);
    //   // Array.from(files).forEach((file) => {
    //   //   // uploadedFiles.push(file);
    //   // });

    //   // Return empty array to prevent immediate upload
    //   return [];
    // }, // // URL where the files will be uploaded


    // url: "/your-upload-endpoint",
    // format: "json", // Response format, e.g., JSON
    // headers: {
    //   Authorization: "Bearer your_access_token",
    // },
    // //  handle the uploaded files' response
    // isSuccess: function (response) {
    //   return response.success; // Customize based on your server's response
    // },
    // getMessage: function (response) {
    //   return response.message; // Customize based on your server's response
    // },
  },
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
      <JoditEditor config={config} value={""} ref={editor} />
    </Form.Item>
  );
};
