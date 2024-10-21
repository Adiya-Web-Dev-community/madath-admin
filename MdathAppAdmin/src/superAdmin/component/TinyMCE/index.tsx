import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({title,onChange,content}:{title:string,onChange:(content:string, editor:{})=>void,content:string}) {

  return (
    <>
    <label>{title}</label>
    <Editor
      apiKey='ojjln1sjzdzbbq0g8yl5uoigm5lf058j2sqpx4f40indzuof'
      value={content}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }
    }
      onEditorChange={onChange}
    />
      </>
  );
}