import {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import "ckeditor5/ckeditor5.css";
import { UploadAdapter } from "@/adapters/upload-adapter";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { Editor, EditorConfig } from "@ckeditor/ckeditor5-core";
import { GeneralHtmlSupportConfig, HeadingConfig, LinkConfig } from "ckeditor5";

const LICENSE_KEY = process.env.NEXT_PUBLIC_EDITOR_DEVELOPMENT_LISCENSE_KEY;
export interface RichTextEditorRef {
  setData: (data: string) => void;
}

interface CustomRichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
}

export default forwardRef<RichTextEditorRef, CustomRichTextEditorProps>(
  function CustomRichTextEditor({ value, onChange }, ref) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const ckEtidorRef = useRef<CKEditor<Editor> | null>(null);
    const cloud = useCKEditorCloud({ version: "44.1.0" });

    useImperativeHandle(ref, () => ({
      setData: (data: string) =>
        ckEtidorRef.current && ckEtidorRef.current.editor?.setData(data),
    }));

    useEffect(() => {
      setIsLayoutReady(true);

      return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig, ClassicEditor } = useMemo(() => {
      if (cloud.status !== "success" || !isLayoutReady) {
        return {};
      }

      const {
        ClassicEditor,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        Bookmark,
        Code,
        CodeBlock,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        Image,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Paragraph,
        PasteFromOffice,
        RemoveFormat,
        SimpleUploadAdapter,
        SourceEditing,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Editor,
      } = cloud.CKEditor;

      // sub-configs additionally created to better type=safety
      const headingConfig: HeadingConfig = {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h2",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h3",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h4",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      };

      const generalHtmlSupportConfig: GeneralHtmlSupportConfig = {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      };

      const linkConfig: LinkConfig = {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      };

      // main config object required by the editor
      const editorConfig: EditorConfig = {
        toolbar: {
          items: [
            "sourceEditing",
            "|",
            "heading",
            "style",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|",
            "horizontalLine",
            "link",
            "bookmark",
            "insertImage",
            // "mediaEmbed",
            "insertTable",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          Image,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Paragraph,
          PasteFromOffice,
          RemoveFormat,
          SimpleUploadAdapter,
          SourceEditing,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "insertImage",
          "|",
          "bulletedList",
          "numberedList",
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: headingConfig,
        htmlSupport: generalHtmlSupportConfig,
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        initialData: value,
        licenseKey: LICENSE_KEY,
        link: linkConfig,
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        placeholder: "Type or paste your content here!",
        style: {
          definitions: [
            {
              name: "Article category",
              element: "h3",
              classes: ["category"],
            },
            {
              name: "Title",
              element: "h2",
              classes: ["document-title"],
            },
            {
              name: "Subtitle",
              element: "h3",
              classes: ["document-subtitle"],
            },
            {
              name: "Info box",
              element: "p",
              classes: ["info-box"],
            },
            {
              name: "Side quote",
              element: "blockquote",
              classes: ["side-quote"],
            },
            {
              name: "Marker",
              element: "span",
              classes: ["marker"],
            },
            {
              name: "Spoiler",
              element: "span",
              classes: ["spoiler"],
            },
            {
              name: "Code (dark)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-dark"],
            },
            {
              name: "Code (bright)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-bright"],
            },
          ],
        },
        // simpleUpload: simpleUploadConfig,
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        extraPlugins: [
          function (editor: Editor) {
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader,
            ) => {
              return new UploadAdapter(loader);
            };
          },
        ],
      };
      return {
        editorConfig,
        ClassicEditor,
        Editor,
      };
    }, [cloud.status, isLayoutReady, value]);

    return (
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor editor-container_include-style"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {editorConfig && (
                <CKEditor
                  onReady={(editor) => {
                    editor.ui.getEditableElement()?.classList.add("!px-8");
                  }}
                  onBlur={(e, editor) => {
                    editor.ui.getEditableElement()?.classList.add("!px-8");
                  }}
                  onFocus={(e, editor) => {
                    editor.ui.getEditableElement()?.classList.add("!px-8");
                  }}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  editor={ClassicEditor}
                  config={editorConfig}
                  ref={ckEtidorRef}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
